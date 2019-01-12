import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card,
		 CardItem,
		 Body } from 'native-base';

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding/');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiamV5cGkiLCJhIjoiY2psOWIzMzhhMW1rcTNycWttcDIwYzU3aCJ9.mRXngxERf-Zth8ABFhNgag' })


class DisplayPlaces extends Component {
	constructor(props){
		super(props);
		this.state = {
			latitude: this.props.currentLatitude,
			longitude: this.props.currentLongitude,
			location: "Not Found",
			destination: 'Dita'
		}
	}

	componentDidMount(){
		geocodingClient.reverseGeocode({
		  query: [this.state.longitude, this.state.latitude],
		  limit: 9
		})
		  .send()
		  .then(response => {
		    // GeoJSON document with geocoding matches
		    const match = response.body;
		    console.log(match.features[0]);
		    this.setState({location: match.features[0].place_name})
		  })
		  .catch(function(error) {
		  	console.log("Problem" + error.message);
		  	throw error;
		  })
	}

	render(){
		let long = this.props.destinationLongitude;
		let lat = this.props.destinationLatitude
		let destinationName = geocodingClient.reverseGeocode({
		  query: [long, lat],
		  limit: 9
		})
		  .send()
		  .then(response => {
		    // GeoJSON document with geocoding matches
		    const match = response.body;
		    console.log(match.features[0]);
		    this.setState({destination: match.features[0].place_name})
		  })
		  .catch(function(error) {
		  	console.log("Problem" + error.message);
		  	throw error;
		  })
		return (
			<Card>
	            <CardItem>
	              <Body>
	              	<Text style={{fontWeight: 'bold', fontSize: 15}}>
	              		Current Location
	              	</Text>
             		<Text>{this.state.location}</Text>
	              </Body>
	              <Body style={{flex: 1, flexDirection: 'column'}}>
	              	<Text style={{fontWeight: 'bold', fontSize: 15}}>
	              		Destination
	              	</Text>
	              	<Text>{this.state.destination}</Text>
	              </Body>
	            </CardItem>
         	</Card>
		);
	}
}

export default DisplayPlaces;