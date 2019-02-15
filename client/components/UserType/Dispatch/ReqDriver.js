import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
import ListDrivers from './AddDriver/ListDrivers';
import firebase from 'react-native-firebase';

class ReqDriver extends Component {
	constructor(){
		super();
		this.state = {
			drivers: []
		}
	}

		static navigationOptions = {
      drawerIcon: ({ tintColor }) =>{
        return(
          <Icon name="person" style={{fontSize: 24, color: "blue"}}/>
        );
    }   
}


	componentWillMount(){
		let drivers = []
		firebase.database().ref('Clients/Drivers/').once('value', (snapshot) => {
			snapshot.forEach((child) => {
			    drivers.push({
			    	id: child.key,
			    	name: child.val().name,
			    	contact: child.val().contact,
			    	address: child.val().address,
			    	plate: child.val().plate,
			    	conduction: child.val().conduction,
			    	operatorName: child.val().operatorName,
			    	operatorContactNumber: child.val().operatorContactNumber,
			    	rating: child.val().rating
			    })
			  });
			this.setState({drivers: drivers})
		})

	}



	handleDelete = (id) => {
		 Alert.alert(
                'Delete?',
                'Delete this User?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    let del = this.state.drivers;
					let index = del.findIndex(x => x.id === id);
					del.splice(index, 1);
					this.setState({drivers: del});
					
			    	firebase.database().ref('Clients/Drivers/').child('' + id).remove()
			                  }},
                ],
                { cancelable: false }
              )  
	}

	handleUpdate = (id) => {
		this.props.navigation.navigate('UpdateDriver', {id: id});
	}


	render(){
		
		return(
				<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Drivers List</Text>
					</Body>
					<Right>
						<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddDriver')} >
							<Text style={{color: 'white'}}>Add Driver</Text>
						</TouchableOpacity>
					</Right>
				</Header>
				<ListDrivers drivers={this.state.drivers} onDelete={this.handleDelete.bind(this)} onUpdate={this.handleUpdate.bind(this)}/>
			</View>	
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	button: {
	    flexDirection: 'row',
	    padding: 8,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
	  },
})


export default ReqDriver;