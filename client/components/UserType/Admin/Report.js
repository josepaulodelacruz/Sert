import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
import Reports from './Reports/Reports';
import firebase from 'react-native-firebase';

class Report extends Component {
	constructor(){
		super();
		this.state = {
			reports: []
		}
	}
	static navigationOptions = {
      drawerIcon: ({ tintColor }) =>{
        	return(
              <Icon name="paper" style={{fontSize: 24, color: "blue"}}/>
        	);
        }   
    }

    componentWillMount(){
    	let reports = []
    	firebase.database().ref('Clients/Reports').once('value', (snapshot) => {
    		snapshot.forEach((child) => {
    			reports.push({
    				id: child.key,
    				contact: child.val().contact,
    				dRating: child.val().dRating,
    				destination: child.val().destination,
    				driver: child.val().driver,
    				fName: child.val().fName,
    				lName: child.val().lName,
    				location: child.val().location,
    				operatorContactNumber: child.val().operatorContactNumber,
    				operatorName: child.val().operatorName,
    				price: child.val().price,
    				time: child.val().time,
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
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Reports</Text>
					</Body>
					<Right/>
				</Header>
				<Reports reports={this.state.reports}/>
			</View>	
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Report;