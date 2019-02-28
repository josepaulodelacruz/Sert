import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Icon, Left, Right, Label } from "native-base";
import firebase from 'react-native-firebase';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';



export default class JoinTricycleRide extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			textRequest: 'No Available Requ',
			driver: []
		}
	}

	handleSend = () => {
		alert('This is free, No Hidden Charges when sending a SMS');
	}

	componentWillMount(){
		/*Displaying the sent driver info to the CLient*/
		let uid = firebase.auth().currentUser.uid;
		firebase.database().ref('Clients/' + uid + '/DriverInfo').on('value', (snapshot) => {
			this.setState({driver: snapshot.val()})
		})
	}


	renderDriver(){
		/*Validation Checking*/
		if(this.state.driver){
			return(
				<Content padder>
			          <Card>
			            <CardItem header bordered>
			            <Left>
			            	<Icon name="navigate" style={styles.icon}/>
			            	<Text>Dispatch Driver Information</Text>
			            </Left>
			            </CardItem>
			            <CardItem  header bordered>
			            	<Text>{this.state.driver.dName}</Text>
			            </CardItem>
			            <CardItem  header bordered>
			            	<Text>Contact: {this.state.driver.contact}</Text>
			            </CardItem>
			            <CardItem  header bordered>
			            	<Text>
			            		Plate: {this.state.driver.plate}
			            	</Text>
			            </CardItem>
			            <CardItem  header bordered>
			            	<Text>
			            		Conduction: {this.state.driver.conduction}
			            	</Text>
			            </CardItem >
			            <CardItem  header bordered>
			            	<Text>
			            		Operator's Contact: {this.state.driver.operatorContactNumber}
			            	</Text>
			            </CardItem>
			            <CardItem  header bordered>
			            	<Text>
			            		rating: {this.state.driver.dRating}
			            	</Text>
			            </CardItem>
			            <CardItem footer bordered>
			              <Left/>
			              <Body/>
			              <Right/>
			            </CardItem>
			          </Card>
			        </Content>
			)
		}else{
			return(
				<Content padder>
	          <Card>
	            <CardItem header bordered>
	            <Left>
	            	<Icon name="navigate" style={styles.icon}/>
	            	<Text>Dispatch Driver Information</Text>
	            </Left>
	            </CardItem>
	          </Card>
	        </Content>
			)
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Request</Text>
					</Body>
					<Right/>
				</Header>
				 <Container>
			        {this.renderDriver()}
			      </Container>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	icon: {
		color: 'green'
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

