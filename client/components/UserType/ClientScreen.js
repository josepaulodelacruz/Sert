import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, ScrollView, Image, StatusBar, PermissionsAndroid, Alert  } from 'react-native';
import { createDrawerNavigator, DrawerItems, createBottomTabNavigator } from 'react-navigation';
import { Header, Left, Body, Right, Icon, Fab, Button, Container, Content, CardItem, Card } from 'native-base';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Geolocation from 'react-native-geolocation-service';
import uuid from 'react-native-uuid';
import ExampleLogo from '../Assets/logo.jpg';
import DisplayPlaces from './Locations/DisplayPlaces';
import Modal from "react-native-modal";
import FairMatrix from './Locations/FairMatrix';
import PropTypes from 'prop-types';
Mapbox.setAccessToken('pk.eyJ1Ijoid2hvc2VlcG93bHUiLCJhIjoiY2pxdWI3dWxjMGlyOTQzb2M1bjBmMjhrdSJ9._zfJuW0TJRGYl_JNFG37aw');

const mbxDirections = require('@mapbox/mapbox-sdk/services/directions/');
const directionsClient = mbxDirections({ accessToken: 'pk.eyJ1Ijoid2hvc2VlcG93bHUiLCJhIjoiY2pxdWI3dWxjMGlyOTQzb2M1bjBmMjhrdSJ9._zfJuW0TJRGYl_JNFG37aw' })


export default class ClientScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: true,
			latitude: 0,
	     	longitude: 0,
	     	desLongitude: 121.11175658485149,
	     	desLatitude: 14.281682671778967,
	      	timestamp: null,
	      	distance: null,
	      	kilometer: null,
	    	error: null,
	    	featureCollection: Mapbox.geoUtils.makeFeatureCollection(),
	    	directions: {},
	    	isModalVisible: false
		};
	}

	
	

	// Icon
	static navigationOptions = {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="home" style={{fontSize: 24, color: "blue"}}/>
            );
        }
    } 

    // Track users location
	 componentWillMount() {
    Geolocation.getCurrentPosition(
      (position) => {
      	console.log(position.coords);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


 


  // Display current location marker
    renderAnnotations () {
    return (
      <Mapbox.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={[this.state.longitude, this.state.latitude]}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title='Your Current Location!' />
      </Mapbox.PointAnnotation>
    )
  }

  // Click events

  async onPress(e) {
	let feature = Mapbox.geoUtils.makeFeature(e.geometry);
    feature.id = uuid.v4()
    this.setState({
      featureCollection: 
      	Mapbox.geoUtils.addToFeatureCollection(
        this.state.featureCollection,
        feature,
      ),
      desiredDestination: true,
      desLongitude: feature.geometry.coordinates[0],
      desLatitude: feature.geometry.coordinates[1]

    });
    console.log(this.state.desLongitude, this.state.desLatitude);
    // API fetch Route
	directionsClient.getDirections({
	    waypoints: [
	      {
	        coordinates: [this.state.longitude, this.state.latitude],
	        approach: 'unrestricted'
	      },
	      {
	        coordinates: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
	        bearing: [100, 60]
	      }
	    ]
	  })
	  .send()
	  .then(response => {
    		const geometry = response.body.routes[0].geometry;
    		const path = response.body.routes[0].legs;
    		this.setState({directions: {
    			"type": "Feature",
		      	"properties": {},
		      	geometry
    		}})
    		this.setState({ distance: path[0].distance })
	  });
  }

  // Modal on/off event
  _toggleModal = () => {
  	 let total = parseInt(this.state.distance/1000)
  	this.setState({ kilometer: total})
  	this.setState({ isModalVisible: !this.state.isModalVisible })
  }



	render(){
			// Display desired location by press event on the map
			let pointerDestination = <Mapbox.PointAnnotation
	        key='pointDestinationAnnotation'
	        id='pointDestinationAnnotation'
	        coordinate={[this.state.desLongitude, this.state.desLatitude]}>

	        <View style={styles.annotationDestinationContainer}>
	          <View style={styles.annotationDestinationFill} />
	        </View>
	        <Mapbox.Callout title='Your Destination' />
	      </Mapbox.PointAnnotation>;	      
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Single Ride</Text>
					</Body>		
					<Right/>
				</Header>
				<DisplayPlaces currentLongitude={this.state.longitude}
								currentLatitude={this.state.latitude}
								destinationLongitude={this.state.desLongitude}
								destinationLatitude={this.state.desLatitude}/>

		          <View style={styles.container}>
			        <Mapbox.MapView
			        	ref={(c) => (this._map = c)}
			        	onPress={this.onPress.bind(this)}
			            styleURL={Mapbox.StyleURL.Street}
			            zoomLevel={12}
			            centerCoordinate={[121.1167,14.2871]}
			            style={styles.container}>
			            {this.renderAnnotations()}
			            {pointerDestination}
	              		<Mapbox.ShapeSource id='mapbox-directions-source' shape={this.state.directions}>
				        <Mapbox.LineLayer
				          id='mapbox-directions-line'
				          style={stylesMap.directionsLine} />
				      </Mapbox.ShapeSource>
			        </Mapbox.MapView>

			      </View>
		      		<Fab
		            active={this.state.active}
		            direction="up"
		            containerStyle={{ }}
		            style={{ backgroundColor: '#5067FF' }}
		            position="bottomRight"
		            onPress={this._toggleModal}>		            
	             <Text>+</Text>
	          	</Fab>
          	<Modal isVisible={this.state.isModalVisible}
          			 	onBackdropPress={() => this.setState({visibleModal: false})}>
  					<View style={styles.modal}>
			            <Text>Payment Matrix</Text>
			            <FairMatrix distance={this.state.kilometer}/>
			            <TouchableOpacity style={{position: 'absolute', top: 5, right: 10}} onPress={this._toggleModal}>
			              <Text style={{fontSize: 24}}>X</Text>
			            </TouchableOpacity>
			            <TouchableOpacity style={styles.button} onPress={this._toggleModal}>
			              <Text style={{fontSize: 14, color: 'white'}}>Book a Ride</Text>
			            </TouchableOpacity>
		          	</View>	 	
	        </Modal>
			</View>	
		)
	}
}

const CustomDrawerComponent = (props) => {
	return(
		<SafeAreaView style={{flex: 1}}>
			<View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
				<Image source={require('../Assets/defaultPic.jpg')} style={{height: 120, width: 120, borderRadius: 120}}/>
			</View>
	      <ScrollView>
	        <DrawerItems {...props} />
	      </ScrollView>
		</SafeAreaView>
	)
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
  	backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
  annotationDestinationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationDestinationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    transform: [{ scale: 0.6 }],
  },
  button: {
    backgroundColor: '#3073FA',
    padding: 12,
    margin: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
});


const stylesMap = Mapbox.StyleSheet.create({
   directionsLine: {
    lineWidth: 3,
    lineCap: Mapbox.LineCap.Round,
    lineJoin: Mapbox.LineJoin.Round,
    lineColor: 'blue'
  },
});