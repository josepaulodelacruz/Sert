import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Icon, Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';
import firebase from 'react-native-firebase';
import DriverComplaint from './Feedback/DriverComplaint';
import ClientComplaint from './Feedback/ClientComplaint';

class Feedback extends Component {
	constructor(){
		super();
		this.state = {
			feedback: [],
			clientFeedback: []
		}
	}
	static navigationOptions = {
      drawerIcon: ({ tintColor }) =>{
        return(
          		<Icon name="bookmarks" style={{fontSize: 24, color: "blue"}}/>
        	);
	    }   
	}

	componentWillMount(){
		let feedback = []
		firebase.database().ref('Clients/Feedback').once('value', (snapshot) => {
			snapshot.forEach((child) => {
				feedback.push({
					id: child.key,
					fName: child.val().fName,
					lName: child.val().lName,
					time: child.val().time,
					feedback: child.val().feedback,
					driver: child.val().driver,
					location: child.val().location,
					destination: child.val().destination
				})
			})
			this.setState({feedback: feedback})
		})

		let clientFeedback = []
		firebase.database().ref('Clients/ClientFeedback').once('value', (snapshot) => {
			snapshot.forEach((child) => {
				clientFeedback.push({
					id: child.key,
					driver: child.val().driver,
					time: child.val().time,
					location: child.val().location,
					destination: child.val().destination,
					feedback: child.val().feedback
				})
			})
			this.setState({clientFeedback: clientFeedback})
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
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Feedback</Text>
					</Body>
					<Right/>
				</Header>
				<Swiper>
					<Container>
			        <Content>
			        	<Text>Driver Complaints</Text>
			         	<DriverComplaint driverComplaint={this.state.feedback}/>
			        </Content>
  				 </Container>
  				 <Container>
			        <Content>
			        <Text>Customer Complaints</Text>
		         		<ClientComplaint clientFeed={this.state.clientFeedback}/>
			        </Content>
  				 </Container>
				</Swiper>
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


export default Feedback;