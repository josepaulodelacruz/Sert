import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Icon, Item, Input } from 'native-base';
import ListOngoing from './Ongoing/ListOngoing';
import firebase from 'react-native-firebase';
import Modal from "react-native-modal";
import DialogInput from 'react-native-dialog-input';


class Ongoing extends Component {
	constructor(){
		super();
		this.state = {
			ongoing: [],
			isDialogVisible: false,
			list: []
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
		/*Retrieving data from the database*/
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
		this.setState({
			isDialogVisible: !this.state.isDialogVisible,
			list: list,
			id: id
		})
		/*Deletion of the display Data*/
		// let del = this.state.ongoing;
		// let index = del.findIndex(x => x.id === id)
		// del.splice(index, 1)
		// this.setState({ongoing: del})
		/*Client Reports*/
		// firebase.database().ref('Clients/' +  list.idClient + '/Reports').push({
		// 	time: list.time,
		// 	location: list.location,
		// 	destination: list.destination,
		// 	price: list.price,
		// 	driverName: list.driver,
		// 	contact: list.contact,
		// 	OperatorName: list.operatorName,
		// 	conduction: list.conduction,
		// 	plate: list.plate,
		// 	operatorContactNumber: list.operatorContactNumber,
		// 	id: list.idDriver,
		// 	rating: list.dRating
		// })
		/*Dispatcher Reports*/
		// firebase.database().ref('Clients/Reports').push({
		// 	time: list.time,
		// 	fName: list.fName,
		// 	lName: list.lName,
		// 	location: list.location,
		// 	destination: list.destination,
		// 	contact: list.contact,
		// 	driver: list.driver,
		// 	price: list.price,
		// 	operatorName: list.operatorName,
		// 	rating: list.rating,
		// 	dRating: list.dRating,
		// 	operatorContactNumber: list.operatorContactNumber, 
		// })
		/*Adding again the dispatch drive in the Database*/
		// firebase.database().ref('Clients/Drivers/').push({
		// 	name: list.driver,
		// 	contact: list.contact,
		// 	address: list.address,
		// 	plate: list.plate,
		// 	conduction: list.conduction,
		// 	operatorName: list.operatorName,
		// 	operatorContactNumber: list.operatorContactNumber,
		// 	rating: list.dRating
		// })
		/*Deletion of Driver in the Client*/
		// firebase.database().ref('Clients/' +  list.idClient + '/DriverInfo'  ).remove()
		/*Deletion of Ongoing in the Dispather*/
		// firebase.database().ref('Clients/Ongoing/' + id).remove()

	}

	// Send to database
	// sendInput(inputText, list, id){
	// 	let del = this.state.ongoing;
	// 	let index = del.findIndex(x => x.id === id)
	// 	del.splice(index, 1)
	// 	this.setState({ongoing: del})
	// 	this.setState({isDialogVisible: false})
	// }

	handleConfirm = (list, id) => {
		if(!this.state.text){
			alert(`Please give rating to ${list.fName}`)
		}else{
			if(this.state.text < 6 && this.state.text < 9){
				let del = this.state.ongoing;
				let index = del.findIndex(x => x.id === id)
				del.splice(index, 1)
				this.setState({ongoing: del})
				let giveRating = parseInt(this.state.text)
				let a;
				/*Star Rating*/
				let userBase = firebase.database().ref('Clients/' + list.idClient )
				userBase.once('value', (snapshot) => {
					a = parseInt(snapshot.val().rating);
					userBase.update({
						rating: a + giveRating
					})
				})

				/*Client Reports*/
				// firebase.database().ref('Clients/' +  list.idClient + '/Reports').push({
				// 	time: list.time,
				// 	location: list.location,
				// 	destination: list.destination,
				// 	price: list.price,
				// 	driverName: list.driver,
				// 	contact: list.contact,
				// 	OperatorName: list.operatorName,
				// 	conduction: list.conduction,
				// 	plate: list.plate,
				// 	operatorContactNumber: list.operatorContactNumber,
				// 	id: list.idDriver,
				// 	rating: list.dRating
				// })

				/*Dispatcher Reports*/
				// firebase.database().ref('Clients/Reports').push({
				// 	time: list.time,
				// 	fName: list.fName,
				// 	lName: list.lName,
				// 	location: list.location,
				// 	destination: list.destination,
				// 	contact: list.contact,
				// 	driver: list.driver,
				// 	price: list.price,
				// 	operatorName: list.operatorName,
				// 	rating: list.rating,
				// 	dRating: list.dRating,
				// 	operatorContactNumber: list.operatorContactNumber, 
				// })

				/*Adding again the dispatch drive in the Database*/
				// firebase.database().ref('Clients/Drivers/').push({
				// 	name: list.driver,
				// 	contact: list.contact,
				// 	address: list.address,
				// 	plate: list.plate,
				// 	conduction: list.conduction,
				// 	operatorName: list.operatorName,
				// 	operatorContactNumber: list.operatorContactNumber,
				// 	rating: list.dRating
				// })
				/*Deletion of Driver in the Client*/
				// firebase.database().ref('Clients/' +  list.idClient + '/DriverInfo'  ).remove()
				/*Deletion of Ongoing in the Dispather*/
				// firebase.database().ref('Clients/Ongoing/' + id).remove()

			}else{
				return null
			}
			
			this.setState({isDialogVisible: false})	
		}
		
	}

	showDialog(){
		this.setState({isDialogVisible: false})
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
				{/*<DialogInput isDialogVisible={this.state.isDialogVisible}
				            title={"Rate"}
				            message={"Please the Client"}
				            hintInput ={"Rate 1-5"}
				            submitInput={ (inputText) => {this.sendInput(inputText, this.state.list, this.state.id)} }
				            closeDialog={ () => {this.showDialog(false)}}>
				</DialogInput>*/}
				<Modal isVisible={this.state.isDialogVisible} >
		          <View style={styles.modal}>
		            <Text style={{fontSize: 22}}>Rate</Text>
		            <Text style={{fontSize: 18}}>Please Rate {this.state.list.fName} {this.state.list.lName}</Text>
		            <Text>1 - 5</Text>
		          	 <Item style={{marginBottom: 10}}>
			            <Input placeholder="Please rate from 1 to 5" style={{textAlign: 'center'}} keyboardType='numeric' maxLength={1} onChangeText={(text) => {this.setState({text})}}/>
		          	</Item>
					<TouchableOpacity style={{position: 'absolute', top: 5, right: 10}} onPress={this.handleDone}>
  		              <Text style={{fontSize: 24}}>X</Text>
  		            </TouchableOpacity>
  		            <TouchableOpacity style={styles.button} onPress={this.handleConfirm.bind(this, this.state.list, this.state.id)}>
		              			<Text style={{color: 'white'}}>Confirm</Text>
	              	</TouchableOpacity>
		          </View>
		        </Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modal: {
  	backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  button: {
	    flexDirection: 'row',
	    padding: 8,
	    justifyContent: 'center',
	    marginRight: 12,
	    alignItems: 'center',
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
	  },
})

export default Ongoing;