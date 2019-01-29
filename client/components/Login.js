import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, Animated, Easing, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends Component {
	constructor(){	
		super();
		this.ref = firebase.database().ref("clients/");
		this.user = null;
		this.unsubscribe = null;
		this.spinValue  = new Animated.Value(0);
		this.state = {
			firstInput: null,
			passInput: null,
			users: [],
			isLoading: true,
			username: null,
		}
	}

	spin () {
	  this.spinValue.setValue(0)
	  Animated.timing(
	    this.spinValue,
	    {
	      toValue: 1,
	      duration: 4000,
	      easing: Easing.linear
	    }
	  ).start(() => this.spin())
	}

	static navigationOptions = {
    title: 'Login',
  	};

  	handleSubmit = () => {
  		if(!this.state.firstInput){
  			alert('Enter Username or Email!')
  		}else if(!this.state.passInput){
  			alert('Enter Password!')
  		}else{
  			firebase.auth().signInWithEmailAndPassword(this.state.firstInput, this.state.passInput)
  				.then(() => this.props.navigation.navigate('ClientScreen'))
  				.catch(function(error) {
				    errorCode = error.code;
				    errorMessage = error.message;
				  if (errorCode === 'auth/wrong-password') {
				    console.log("Wrong password");
				    alert('Wrong password.');
				  }else if( errorCode === "auth/user-disabled" ){
				  	alert('User Disable')
				  }else if(  errorCode === "auth/user-not-found" ){
				  	alert("User doesn't exist")
				  }else if(errorCode === "auth/invalid-email"){
				  	alert('Email Address Invalid')
				  }
				});
  		}
	}


	render(){

		
		const { navigate } = this.props.navigation;
		const spin = this.spinValue.interpolate({
		    inputRange: [0, 1],
		    outputRange: ['0deg', '360deg']
		  })
		return (
			<View style={styles.container}>
				{/*<Image style={{height: 100, width: 100}} source={require('./Assets/logo.jpg')}/>*/}
				<Animated.Image
		        style={{
		          width: 100,
		          height: 100,
		          transform: [{rotate: spin}] }}
		          source={require('./Assets/logo.jpg')}/>
				<Text style={styles.textStyle}>Username/E-mail</Text>
				<TextInput 
				placeholder="Username or E-mail"
				onChangeText={(firstInput) => this.setState({firstInput})}
 				style={{height: 40, width: 300, backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
 				<Text style={styles.textStyle}>Password</Text>
				<TextInput 
				placeholder="Password"
				onChangeText={(passInput) => this.setState({passInput})}
				type='password'
 				style={{height: 40, width: 300, backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
 				<View style={{flex: 1, margin: 30}}>
 					<Button title="Login" onPress={this.handleSubmit.bind(this)}/>
 					<Text style={{textAlign: 'center', fontSize: 22, fontStyle: 'italic', marginTop: 10}}>Forgot Password?</Text>
 					<Text style={styles.textStyle}>Don't have an Account? </Text>
 					<TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
 						<Text style={styles.textStyle}>Sign Up Here</Text>
 					</TouchableOpacity>
 				</View>
 				<Text style={{textAlign: 'center'}}>Sert Application Developed by the students of CITI Global College &copy; 2019</Text>
			</View>		

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textStyle: {
		fontSize: 24,
		fontWeight: "bold",
		margin: 10,
		textAlign: 'center'
	}
})
