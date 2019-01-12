import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Destination extends Component {
	render(){
		let desLat = this.props.destinationLat;
		let desLong = this.props.destinationLong;
		let currentLat = this.props.currentLat;
		let currentLong = this.props.currentLong;
		

		return(
			<View>
				<Text>None</Text>
			</View>
		)
	}
}
	
	
	

export default Destination;

