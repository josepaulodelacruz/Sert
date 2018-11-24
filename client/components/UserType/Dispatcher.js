import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Dispatcher extends Component {
	static navigationOptions = {
		title: 'Service Provider Registration'
	}
	render(){
		return(
			<View style={styles.container}>
				<Text>
					Dispatcher
				</Text>
			</View>
		)
	}
 } 


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})