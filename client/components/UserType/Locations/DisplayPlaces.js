import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card,
		 CardItem,
		 Body } from 'native-base';

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding/');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1Ijoid2hvc2VlcG93bHUiLCJhIjoiY2pxdWI3dWxjMGlyOTQzb2M1bjBmMjhrdSJ9._zfJuW0TJRGYl_JNFG37aw' })


class DisplayPlaces extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: 'Not Found',
			destination: '7-Eleven Dita'
		}
	}


	componentDidUpdate(prevProps){
		if(this.props.destinationLongitude !== prevProps.destinationLongitude){
			 geocodingClient.reverseGeocode({
			  query: [this.props.destinationLongitude, this.props.destinationLatitude],
			  limit: 2
			})
			  .send()
			  .then(response => {
			    // GeoJSON document with geocoding matches
			    const match = response.body;
			    this.setState({destination: match.features[0].text})
			    console.log(this.state.destination)
			  })
			  .catch(function(error) {
			  	console.log("Problem" + error.message);
			  	throw error;
			  })
		}
		if(this.props.currentLongitude !== prevProps.currentLongitude){
		geocodingClient.reverseGeocode({
		  query: [this.props.currentLongitude, this.props.currentLatitude],
		  limit: 2
		})
		  .send()
		  .then(response => {
		    // GeoJSON document with geocoding matches
		    const match = response.body;
		    this.setState({location: match.features[0].text})
		    console.log(this.state.location)

	  	})
		  .catch(function(error) {
		  	console.log("Problem" + error.message);
		  	throw error;
		  })
		}
	}

	render(){

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