import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, Animated, Easing} from 'react-native';

export default class Login extends Component {
	constructor(){
		super();
		this.spinValue  = new Animated.Value(0);
		this.state = {
			firstInput: '',
			passInput: '',
		}
	}

	componentDidMount(){
		this.spin()
	};

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
  		const { firstInput } = this.state;
  		const { passInput } = this.state;
  		console.log(firstInput, passInput);
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
 					<Button title="Login" onPress={this.handleSubmit}/>
 					<Text style={{textAlign: 'center', fontSize: 22, fontStyle: 'italic', marginTop: 10}}>Forgot Password?</Text>
 					<Text style={styles.textStyle}>Don't have an Account? </Text>
 					<Text style={styles.textStyle} onPress={() => this.props.navigation.navigate('SignUp')}>Sign Up Here</Text>
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
