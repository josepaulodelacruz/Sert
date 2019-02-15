import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DispatcherList from './DispatcherList';
import firebase from 'react-native-firebase';
import { Container, Header, Left, Right, Content, Card, CardItem, Text, Body, Form, Item, Input, Label } from "native-base";

class DispatchDriver extends Component {
	constructor(){
		super();
		this.state = {
			request: [],
			drivers: []
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
			    	// firebase.database().ref('Clients/' + this.props.navigation.state.params.transaction.id + '/Transactions')
			    	console.log(this.props.navigation.state.params.transaction)
			    	console.log(driver);
			    	console.log(this.props.navigation.state.params.request)
			    	
			    	this.props.navigation.navigate('Dashboard');
			    	
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