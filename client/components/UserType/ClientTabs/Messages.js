import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';
import ClientReport from './Reports/ClientReport';
import { Header, Left, Body, Right, Icon } from 'native-base';

class Messages extends Component {
	constructor(){
		super();
		this.state = {
			reports: []
		}
	}
	static navigationOptions = {
		drawerIcon: ({tintColor}) => {
			return(
				<Icon name="chatboxes" style={{fontSize: 24, color: "blue"}}/>
			)
			
		}
	}

	componentWillMount(){
		let reports = [];
		let uid = firebase.auth().currentUser.uid;
		firebase.database().ref('Clients/' + uid + '/Reports').once('value', (snapshot) => {
			snapshot.forEach((child) => {
		    	reports.push({
		    		id: child.key,
		    		time: child.val().time,
		    		driver: child.val().driverName,
		    		contact: child.val().contact,
		    		location: child.val().location,
		    		destination: child.val().destination,
		    		price: child.val().price,
		    		operatorName: child.val().OperatorName,
		    		operatorContactNumber: child.val().operatorContactNumber,
		    		plate: child.val().plate,
		    		conduction: child.val().conduction
		    	})	
	    	})
	    	this.setState({reports: reports})
		})
	}

	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Records</Text>
					</Body>
					<Right/>
				</Header>
				<ClientReport reports={this.state.reports}/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Messages;