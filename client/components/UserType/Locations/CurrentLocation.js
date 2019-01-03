import React, { Component } from 'react';
import { View, Text} from 'react-native';
import DataCoords from './local.json';
import Geolocation from 'react-native-geolocation-service';

let currentLocation;
class CurrentLocation extends Component {
	constructor(props){
		super(props);
		this.state = {
			location: 'Location not Available',
			latitude: null,
			longitude: null,
		}
	}

	// Tracking your coordinates
	componentWillMount() {
	    Geolocation.getCurrentPosition(
	      (position) => {
	        this.setState({
	          latitude: position.coords.latitude,
	          longitude: position.coords.longitude,
	          error: null,
	        });
	      },
	      (error) => this.setState({ error: error.message }),
	      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
	    );
	  }	

	componentDidMount(){
		// this.setState({SaintJoseph: DataCoords.features[0].geometry.coordinates})
		console.log(DataCoords.features[0].geometry.coordinates)
		currentLocation = DataCoords.features[0].geometry.coordinates.map(coordinate => {
			coordinate.forEach(place => {
				if(this.state.longitude <= 121.14486694335936 && this.state.longitude <= 121.12718582153319 && this.state.latitude <= 14.285760476751552 && this.state.latitude <= 14.276777229686052) {
					this.setState({ location: 'Saint Joseph 6'})
				}else{
					this.setState({ location: `You're not in SJV`});
				}
			})
		})
	}


	render(){
		return(
			<View>
				<Text>{this.state.location}</Text>
			</View>
		)
	}
}

export default CurrentLocation;