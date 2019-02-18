import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right } from "native-base";
import firebase from 'react-native-firebase';
import Reports from './Reports/Reports';


class DispatchReports extends Component {
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
			    		fName: child.val().fName,
			    		lName: child.val().lName,
			    		driver: child.val().driver,
			    		contact: child.val().contact,
			    		location: child.val().location,
			    		destination: child.val().destination,
			    		price: child.val().price,
			    		time: child.val().time,
			    		rating: child.val().rating,
			    		dRating: child.val().dRating,
			    		time: child.val().time,
			    		operatorName: child.val().operatorName,
			    		operatorContactNumber: child.val().operatorContactNumber,
			    	})	
		    	})
				this.setState({reports: reports})
		    })				
	}

	handleDetail = (report, id) => {
		this.props.navigation.navigate('ListReport', {
			report: report
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
				<Reports reports={this.state.reports} details={this.handleDetail.bind(this)}/>
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


export default DispatchReports;