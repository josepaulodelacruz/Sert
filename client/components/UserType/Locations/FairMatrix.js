import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import geolib from 'geolib'

class FairMatrix extends Component {
	constructor(props) {
        super(props);
        this.state = {
          time: new Date().toLocaleString(),
          latitude: null,
          longitude: null,
          desLongitude: null,
          desLatitude: null,
          distance: 0
        };
      }

      // Within 2 kilometers doesn't add to payment
      componentDidMount(){
      	if(this.props.distance > 2){
      		let value = this.props.distance - 2;
      		this.setState({ distance: value});
      	}else{
      		return false;
      	}
      }

	render(){
		return(
			<View>
				<View style={styles.sideContainer}>
					<Text style={styles.font}>Time :</Text>
					<Text style={styles.font}>{this.state.time}</Text>
				</View>
				<View style={styles.sideContainer}>
					<Text style={styles.font}>Base Fare:</Text>
					<Text style={styles.font}>₱40.00</Text>
				</View>
				<View style={styles.sideContainer}>
					<Text style={styles.font}>Per Km:</Text>
					<Text style={styles.font}>₱7.00 x {this.state.distance} Km = ₱{this.state.distance * 7.00}</Text>
				</View>
				<View style={styles.sideContainer}>
					<Text style={styles.font}>Total Amount:</Text>
					<Text style={styles.font}>₱{this.state.distance * 7.00 + 40.00}</Text>
				</View>

			</View>
			
		)
	}
}

const styles = StyleSheet.create({
	sideContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 10
	},
	font: {
		fontFamily: 'sans-serif-condensed',
		fontSize: 18,

	}
})

export default FairMatrix;