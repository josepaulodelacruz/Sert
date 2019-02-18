import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, RefreshControl  } from 'react-native';
import DispatcherList from './DispatcherList';
import firebase from 'react-native-firebase';
import { Container, Header, Left, Right, Content, Card, CardItem, Text, Body, Form, Item, Input, Label } from "native-base";

class DispatchDriver extends Component {
	constructor(){
		super();
		this.state = {
			request: [],
			drivers: [],
			reload: 0,
			refreshing: 1,
		}
	}

	componentWillMount(){
		this.setState({ request: this.props.navigation.state.params.transaction})

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
			    	contact: child.val().contact,
			    	operatorName: child.val().operatorName,
			    	operatorContactNumber: child.val().operatorContactNumber,
			    	rating: child.val().rating
			    })
			  });
			this.setState({drivers: drivers})
		})
	}


	handleDispatch = (driver) => {
		 Alert.alert(
                'Dispatch?',
                'Dispatch this Driver?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {

			    	firebase.database().ref('Clients/Ongoing').push({
			    		idDriver: driver.id,
			    		idClient: this.props.navigation.state.params.request.id,
			    		first: this.props.navigation.state.params.request.first,
			    		last: this.props.navigation.state.params.request.last,
			    		dName: driver.name,
			    		contact: driver.contact,
			    		address: driver.address,
			    		conduction: driver.conduction,
			    		plate: driver.plate,
			    		operatorName: driver.operatorName,
			    		operatorContactNumber: driver.operatorContactNumber,
			    		dRating: driver.rating,
			    		rating: this.props.navigation.state.params.request.rating,
			    		time: this.props.navigation.state.params.transaction.time,
			    		price: this.props.navigation.state.params.transaction.price,
			    		destination: this.props.navigation.state.params.transaction.destination,
			    		location: this.props.navigation.state.params.transaction.location
			    	})
                  	
			    	
			    	firebase.database().ref('Clients/Drivers/' + driver.id).remove()
			    	firebase.database().ref('Clients/' + this.props.navigation.state.params.transaction.id + '/Transactions').remove()
			    	firebase.database().ref('Clients/' + this.props.navigation.state.params.request.id + '/DriverInfo').set({
			    			dName: driver.name,
			    			conduction: driver.conduction,
			    			contact: driver.contact,
			    			plate: driver.plate,	
			    			contact: driver.contact,
			    			operatorName: driver.operatorName,
			    			operatorContactNumber: driver.operatorContactNumber,
			    			dRating: driver.rating,
			    			address: driver.address,
			    			dRating: driver.rating
			    		})
			    	this.props.navigation.navigate('Ongoing');
					}},
                ],
                { cancelable: false }
              ) 
	}




	render(){
		
		return(
			<Container>
		          <DispatcherList dispatcherList={this.state.drivers} dispatchDriver={this.handleDispatch.bind(this)}/>
		      </Container>
		)
	}
}

export default DispatchDriver;