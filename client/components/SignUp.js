import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';


export default class SignUp extends Component {
	static navigationOptions = {
    title: 'Sign Up',
  	};
	render(){
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.container}>
				<Text style={styles.fontStyle}>Select which type of User are you?</Text>
				<View style={styles.userType}>
					<Image style={{height: 120, width: 150}} source={require('./Assets/defaultPic.jpg')}/>
					<View style={{margin: 20}}>
						<Button title="Client" onPress={() => this.props.navigation.navigate('Client')}/>
					</View>
				</View>
				<View style={styles.userType}>
					<Image style={{height: 120, width: 150}} source={require('./Assets/tricycle.png')}/>
					<View style={{marginBottom: 20}}>
						<Button title="Service Provider"  onPress={() => this.props.navigation.navigate('Dispatcher')}/>
					</View>
				</View>
				
			</View>
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
		marginTop: 18,
		fontSize: 22,
		fontWeight: 'bold'
	}
})