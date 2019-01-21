import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class UserInformation extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Text>Personal Information</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	}
})

export default UserInformation;