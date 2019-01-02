import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, StatusBar, PermissionsAndroid, Alert  } from 'react-native';
import { createDrawerNavigator, DrawerItems, createBottomTabNavigator } from 'react-navigation';
import { Header, Left, Body, Right, Icon, Fab, Button, Container, Content, CardItem, Card } from 'native-base';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import Geolocation from 'react-native-geolocation-service';
import uuid from 'react-native-uuid';
import ExampleLogo from '../Assets/logo.jpg';
Mapbox.setAccessToken('pk.eyJ1IjoiamV5cGkiLCJhIjoiY2psOWIzMzhhMW1rcTNycWttcDIwYzU3aCJ9.mRXngxERf-Zth8ABFhNgag');


// https://www.youtube.com/watch?v=7uhJN4kVS6g

export default class ClientScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: true,
			latitude: 0,
	     	longitude: 0,
	     	desLongitude: 0,
	     	desLatitude: 0,
	      	timestamp: null,
	      	location: null,
	    	error: null,
	    	featureCollection: Mapbox.geoUtils.makeFeatureCollection(),
	    	desiredDestination: false,
		};
	}

	static navigationOptions = {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="home" style={{fontSize: 24, color: "blue"}}/>
            );
        }
    } 


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


	bookRide = () => {
		alert(this.state.longitude, this.state.latitude);
	}

	

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
  	// if(this.state.desiredDestination === false){
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
  	// }else{
  	// 	alert(`Remove that you've click`);
  	// } 
  }

 //   onSourceLayerPress(e) {
	// const feature = e.nativeEvent.payload;
	// console.log('You pressed a layer here is your feature', feature); // eslint-disable-line 
 //  }

  bookRide = () => {
  	alert('Book');
  }	

	render(){
			let pointerDestination =  <Mapbox.PointAnnotation
			        key='pointDestinationAnnotation'
			        id='pointDestinationAnnotation'
			        coordinate={[this.state.desLongitude, this.state.desLatitude]}>

			        <View style={styles.annotationDestinationContainer}>
			          <View style={styles.annotationDestinationFill} />
			        </View>
			        <Mapbox.Callout title='Your Destination' />
			      </Mapbox.PointAnnotation>
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
					<Card>
		            <CardItem>
		              <Body>
		              	<Text style={{fontWeight: 'bold', fontSize: 15}}>
		              		Current Location
		              	</Text>
		                <Text> 
		                   {this.state.longitude}
		                </Text>
		              </Body>
		              <Body style={{flex: 1, flexDirection: 'column'}}>
		              	<Text style={{fontWeight: 'bold', fontSize: 15}}>
		              		Destination
		              	</Text>
	              		<Text> 
                   			None
                		</Text>
		              </Body>
		            </CardItem>
		          </Card>
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
			        </Mapbox.MapView>
			      </View>
			      <Fab
		            active={this.state.active}
		            direction="up"
		            containerStyle={{ }}
		            style={{ backgroundColor: '#5067FF' }}
		            position="bottomRight"
		            onPress={this.bookRide.bind(this)}>
		             <Text>+</Text>
		          </Fab>
			</View>	
		)
	}
}

// centerCoordinate={[14.2871, 121.1167]}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});


const stylesMap = Mapbox.StyleSheet.create({
  icon: {
    iconImage: ExampleLogo,
    iconAllowOverlap: true,
    iconSize: 0.5,
  },
});