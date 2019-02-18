import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
import ListOngoing from './Ongoing/ListOngoing';
import firebase from 'react-native-firebase';

class Ongoing extends Component {
	constructor(){
		super();
		this.state = {
			ongoing: []
		}
	}
	static navigationOptions = {
	      drawerIcon: ({ tintColor }) =>{
	        return(
	          <Icon name="navigate" style={{fontSize: 24, color: "blue"}}/>
	        );
	    }   
	}

	componentWillMount(){
		let ongoing = []
		firebase.database().ref('Clients/Ongoing').once('value', (snapshot) => {
			snapshot.forEach((child) => {
			    	ongoing.push({
			    		id: child.key,
			    		idClient: child.val().idClient,
			    		idDriver: child.val().idDriver,
			    		fName: child.val().first,
			    		lName: child.val().last,
			    		location: child.val().location,
			    		destination: child.val().destination,
			    		price: child.val().price,
			    		time: child.val().time,
			    		driver: child.val().dName,
			    		plate: child.val().plate,
			    		address: child.val().address,
			    		conduction: child.val().conduction,
			    		contact: child.val().contact,
			    		operatorName: child.val().operatorName,
			    		operatorContactNumber: child.val().operatorContactNumber,
			    		dRating: child.val().dRating,
			    		rating: child.val().rating
			    	})
			    })
				this.setState({ongoing: ongoing})
			  });

	}
	/*View Details*/
	handleDetails = (list, id) => {
		this.props.navigation.navigate('Details', {
			infoList: list
		});
	}

	/*Done Service*/
	handleDone = (list, id) => {
		console.log(list);
		let del = this.state.ongoing;
		let index = del.findIndex(x => x.id === id)
		del.splice(index, 1)
		this.setState({ongoing: del})
		/*Client Reports*/
		firebase.database().ref('Clients/' +  list.idClient + '/Reports').push({
			time: list.time,
			location: list.location,
			destination: list.destination,
			price: list.price,
			driverName: list.driver,
			contact: list.contact,
			OperatorName: list.operatorName,
			conduction: list.conduction,
			plate: list.plate,
			operatorContactNumber: list.operatorContactNumber,
			id: list.idDriver,
			rating: list.dRating
		})
		/*Dispatcher Reports*/
		firebase.database().ref('Clients/Reports').push({
			time: list.time,
			fName: list.fName,
			lName: list.lName,
			location: list.location,
			destination: list.destination,
			contact: list.contact,
			driver: list.driver,
			price: list.price,
			operatorName: list.operatorName,
			rating: list.rating,
			dRating: list.dRating,
			operatorContactNumber: list.operatorContactNumber, 
		})

		firebase.database().ref('Clients/Drivers/').push({
			name: list.driver,
			contact: list.contact,
			address: list.address,
			plate: list.plate,
			conduction: list.conduction,
			operatorName: list.operatorName,
			operatorContactNumber: list.operatorContactNumber,
			rating: list.dRating
		})
		/*Deletion of Driver in the Client*/
		firebase.database().ref('Clients/' +  list.idClient + '/DriverInfo'  ).remove()
		/*Deletion of Ongoing in the Dispather*/
		firebase.database().ref('Clients/Ongoing/' + id).remove()

	}

	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Ongoing</Text>
					</Body>
					<Right/>
				</Header>
				<ListOngoing ongoing={this.state.ongoing} details={this.handleDetails.bind(this)} detailsId={this.handleDone.bind(this)}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})

export default Ongoing;