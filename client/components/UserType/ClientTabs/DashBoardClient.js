import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class DashBoardClient extends Component {
	render(){
		return(
			<View style={styles.container}>
			  <Ionicons name="md-menu" size={32} color="green" />
				<Text>dashboard</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default DashBoardClient;