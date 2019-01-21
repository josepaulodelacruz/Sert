import React, { Component } from 'react';
import { View, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left,Body } from 'native-base';
import { createStackNavigator } from 'react-navigation';


export default class SignUp extends Component {
	constructor(){
		super();
		this.state = {
			dispatcher: false,
			client: false
		}
	}

	static navigationOptions = {
    title: 'Sign Up',
  	};

  	handleClientRegistration = () => {
  		this.setState({
  			client: true,
  			dispatcher: false
  		})
  	}

  	handleDispatcherRegistration = () => {
  		this.setState({
  			dispatcher: true,
  			client: false
  		})
  	}

  	/*Conditional page routing if selected designate to the selected page*/
  	handleNextPage = () => {
  		const { navigate } = this.props.navigation;
  		if(this.state.client === false && this.state.dispatcher === false){
  			alert('Please Select')
  		}else if(this.state.client === true){
  			this.props.navigation.navigate('Client')
  		}else {
  			this.props.navigation.navigate('Dispatcher')
  		}
  	}

	render(){
		const { navigate } = this.props.navigation;
		return(
				 <Container>
			        <Content>
			        <View style={styles.container}>
			        	<Text style={styles.fontStyle}>Select which type of User are you?</Text>
			        </View>
			          <ListItem onPress={this.handleClientRegistration.bind(this)}>
			            <Left>
			              <Text>Client Registration</Text>
			            </Left>
			            <Right>
			              <Radio onPress={this.handleClientRegistration.bind(this)} selected={this.state.client} />
			            </Right>
			          </ListItem>
			          <ListItem onPress={this.handleDispatcherRegistration.bind(this)}>
			            <Left>
			              <Text>Dispatcher Registration</Text>
			            </Left>
			            <Right>
			              <Radio onPress={this.handleDispatcherRegistration.bind(this)} selected={this.state.dispatcher} />
			            </Right>
			          </ListItem>
			          	<TouchableOpacity
			          	 style={styles.button} 
			          	onPress={this.handleNextPage.bind(this)}>
			          	<Text style={{color: 'white'}}>Next</Text>
			          	</TouchableOpacity>
			        </Content>
			      </Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	userType: {
		margin: 50,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	fontStyle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 10
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		margin: 15,
		padding: 15,
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
	  }
})