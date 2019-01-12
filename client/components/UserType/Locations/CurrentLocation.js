import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DataCoords from './local.json';
import Geolocation from 'react-native-geolocation-service';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import geolib from 'geolib';


class CurrentLocation extends Component {

	constructor(props){
		super(props);
		this.state = {
			location: ''
		}
	}





	render(){
		let lat = this.props.desLatitude;
		let long = this.props.desLongitude;


			// Working with W3C Geolocation API
			Geolocation.getCurrentPosition(
			    function(position) {
			    	console.log(position.coords.latitude)
			        console.log('You are ' + geolib.getDistance(position.coords, {
			            latitude: lat,
			            longitude: long
			        }) + ' meters ');
			    },
			    function() {
			        console.log('Position could not be determined.')
			    },
			);


		return(
			<View>
				<Text>{this.state.location}</Text>
			</View>
		)
	}
}

export default CurrentLocation;
	