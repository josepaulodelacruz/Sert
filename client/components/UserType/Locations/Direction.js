




























// import React, { Component } from 'react';
// import Mapbox from '@mapbox/react-native-mapbox-gl';


// Mapbox.setAccessToken('pk.eyJ1IjoiamV5cGkiLCJhIjoiY2psOWIzMzhhMW1rcTNycWttcDIwYzU3aCJ9.mRXngxERf-Zth8ABFhNgag');
// const mbxDirections = require('@mapbox/mapbox-sdk/services/directions/');
// const directionsClient = mbxDirections({ accessToken: 'pk.eyJ1IjoiamV5cGkiLCJhIjoiY2psOWIzMzhhMW1rcTNycWttcDIwYzU3aCJ9.mRXngxERf-Zth8ABFhNgag' });

// const stylesMap = Mapbox.StyleSheet.create({
//    directionsLine: {
//     lineWidth: 3,
//     lineCap: Mapbox.LineCap.Round,
//     lineJoin: Mapbox.LineJoin.Round,
//   },
// });

// class Direction extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			destinationLong: this.props.destinationLong,
// 			destinationLat:	this.props.destinationLat,
// 			currentLat: this.props.currentLat,
// 			currentLong: this.props.currentLong,
// 			directions: null
// 		}
// 	}

// 	componentDidMount(){
// 		directionsClient.getDirections({
// 		    waypoints: [
// 		      {
// 		        coordinates: [this.state.currentLong, this.state.currentLat],
// 		        approach: 'unrestricted'
// 		      },
// 		      {
// 		        coordinates: [this.state.destinationLong, this.state.destinationLat]
// 		      },
// 		      {
// 		        coordinates: [this.state.destinationLong, this.state.destinationLat],
// 		        bearing: [100, 60]
// 		      }
// 		    ]
// 		  })
// 		  .send()
// 		  .then(response => {
// 		    // directions = response.body;
// 	    		const Directions = response.body.routes[0];
// 	    		this.setState({directions: Directions.geometry})
// 	    		console.log(Directions.geometry);
// 		  });
// 		  if(!this.state.directions){
// 		  	return null;
// 		  }	
// 	}


// 	render(){

		

// 		return(
			 
// 		)
// 	}
// }



// export default Direction;