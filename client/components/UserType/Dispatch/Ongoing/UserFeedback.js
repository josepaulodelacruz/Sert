import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Header, Left, Icon, Body, Right,  Container, Content, Textarea, Form, Card, CardItem } from 'native-base';
import firebase from 'react-native-firebase';


class UserFeedback extends Component {
	constructor(){
		super();
		this.state = {
			feedback: null,
		}
	}

	handleSubmit = () => {
		if(this.state.feedback === null){
			alert("No Complaint Written")
		}else if(this.state.feedback === ''){
			alert("No Complaint Written")
		}else {
			firebase.database().ref('Clients/' + this.props.navigation.state.params.feed.idClient + '/Feedback').push({
				complainant: this.props.navigation.state.params.feed.driver,
				time: this.props.navigation.state.params.feed.time,
				location: this.props.navigation.state.params.feed.location,
				destination: this.props.navigation.state.params.feed.destination,
				feedback: this.state.feedback
			})

			firebase.database().ref('Clients/Drivers/').push({
					name: this.props.navigation.state.params.feed.driver,
					contact: this.props.navigation.state.params.feed.contact,
					address: this.props.navigation.state.params.feed.address,
					plate: this.props.navigation.state.params.feed.plate,
					conduction: this.props.navigation.state.params.feed.conduction,
					operatorName: this.props.navigation.state.params.feed.operatorName,
					operatorContactNumber: this.props.navigation.state.params.feed.operatorContactNumber,
					rating: this.props.navigation.state.params.feed.rating
				})

			firebase.database().ref('Clients/Feedback').push({
				driver: this.props.navigation.state.params.feed.driver,
				fName: this.props.navigation.state.params.feed.fName,
				lName: this.props.navigation.state.params.feed.lName,
				time: this.props.navigation.state.params.feed.time,
				location: this.props.navigation.state.params.feed.location,
				destination: this.props.navigation.state.params.feed.destination,
				feedback: this.state.feedback
			})

			firebase.database().ref('Clients/Ongoing/' + this.props.navigation.state.params.feed.id).remove()
			firebase.database().ref('Clients/' +  this.props.navigation.state.params.feed.idClient + '/DriverInfo'  ).remove()
			this.props.navigation.navigate('Feedback')
		}
	}

	render(){
		console.log(this.props.navigation.state.params.feed);
		return(
			<View style={styles.container}>
				<Container>
		        <Content padder>
		          <Card>
		            <CardItem header bordered>
		              <Text>{this.props.navigation.state.params.feed.fName} {this.props.navigation.state.params.feed.lName} </Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>Driver: {this.props.navigation.state.params.feed.driver} </Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>From: {this.props.navigation.state.params.feed.location} - {this.props.navigation.state.params.feed.destination} </Text>
		            </CardItem>
		             <CardItem header bordered>
		              <Text>Time & date: {this.props.navigation.state.params.feed.time} </Text>
		            </CardItem>
		            <CardItem bordered>
		            	<Content padder>
				          <Form>
				            <Textarea rowSpan={5} bordered placeholder="Enter what happened?"  onChangeText={(feedback) => this.setState({feedback: feedback})}/>
				          </Form>
				        </Content>
		            </CardItem>
		            <CardItem footer bordered>
		            	<Left/>
		            	<Body/>
		            	<Right>
		            		<TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
		            			<Text style={{color: 'white'}}>Sent</Text>	
		            		</TouchableOpacity>
		            	</Right>
		            </CardItem>
		          </Card>
		        </Content>
		      </Container>
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

export default UserFeedback;