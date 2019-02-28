import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Left, Icon, Body, Right,  Container, Content, Textarea, Form, Card, CardItem } from 'native-base';
import firebase from 'react-native-firebase';

class FeedbackClient extends Component {
	constructor(){
		super();
		this.state = {
			feedback: null
		}
	}

	handleSubmit = () => {
		if(this.state.feedback === null){
			alert("No Complaint Written")
		}else if(this.state.feedback === ''){
			alert("No Complaint Written")
		}else{
			firebase.database().ref('Clients/ClientFeedback').push({
				driver: this.props.navigation.state.params.report.driver,
				fName: this.props.navigation.state.params.report.fName,
				lName: this.props.navigation.state.params.report.lName,
				time: this.props.navigation.state.params.report.time,
				location: this.props.navigation.state.params.report.location,
				destination: this.props.navigation.state.params.report.destination,
				feedback: this.state.feedback
			})

			// Client id addition
			firebase.database().ref('Clients/' + this.props.navigation.state.params.report.uid +'/Reports/' + this.props.navigation.state.params.report.id ).update({
				report: true
			})
			
			this.props.navigation.navigate('Home')
		}
	}

	render(){
		console.log(this.props.navigation.state.params.report.report);
		return(
			<View style={styles.container}>
				<Container>
		        <Content padder>
		          <Card>
		            <CardItem header bordered>
		              <Text>Complainee: {this.props.navigation.state.params.report.driver}</Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>Location: {this.props.navigation.state.params.report.location} </Text>
		            </CardItem>
		             <CardItem header bordered>
		              <Text>Destination {this.props.navigation.state.params.report.destination} </Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>Time & date: {this.props.navigation.state.params.report.time} </Text>
		            </CardItem>
		            <CardItem bordered>
		            	<Content padder>
				          <Form>
				            <Textarea rowSpan={5} bordered placeholder="Enter what happened?" onChangeText={(text) => this.setState({feedback: text})}/>
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

export default FeedbackClient;