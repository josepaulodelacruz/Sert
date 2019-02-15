import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, Alert } from 'react-native';
import { Header, Left, Body, Right, Icon, H3 } from 'native-base';
import DisplayRequest from './DispatcherMap/DisplayRequest';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import firebase from 'react-native-firebase';



class DispatchDashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
			request: [],
			coords: [],
			transaction: [],
		}
	}
	static navigationOptions = {
      drawerIcon: ({ tintColor }) =>{
        return(
          <Icon name="home" style={{fontSize: 24, color: "blue"}}/>
        );
    }   
}

	    onButtonPress = () => {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // then navigate
  navigate('Dashboard');
	}

	handleBackButton = () => {
	 Alert.alert(
	     'Exit App',
	     'Exiting the application?', [{
	         text: 'Cancel',
	         onPress: () => console.log('Cancel Pressed'),
	         style: 'cancel'
	     }, {
	         text: 'OK',
	         onPress: () => BackHandler.exitApp()
	     }, ], {
	         cancelable: false
	     }
	  )
	  return true;
	} 

	componentDidMount(){
	  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentWillUnmount(){
	  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	componentDidMount(){
		let userInfo = []
		let request = []
		let transaction = []	
		firebase.database().ref('Clients/').on('value', (snapshot) => {
			snapshot.forEach((child) => {
			    request.push({
			    	id: child.key,
			    	sent: child.val().sent,
			    	transactions: child.val().Transactions,
			    	first: child.val().fName,
			    	last: child.val().lName,
			    	approved: child.val().approved,
			    	contact: child.val().contactNumber,
			    	role: child.val().role
			    })
			  });
			this.setState({request: request})
		})
	}

	handleCoords = (id) => {
		this.setState({coords: id})
	}

	handleDispatch = (transaction, request) => {
		this.props.navigation.navigate('DispatchDriver', {
			transaction: transaction,
			request: request
		});
	}

	render(){
		let currentPosition = <Mapbox.PointAnnotation
						        key='pointAnnotation'
						        id='pointAnnotation'
						        coordinate={[!this.state.coords.longitude ? 0 : this.state.coords.longitude, !this.state.coords.latitude ? 0 : this.state.coords.latitude]}>
						        <View style={styles.annotationContainer}>
						          <View style={styles.annotationFill} />
						        </View>
						        <Mapbox.Callout title='Your Current Location!' />
						      </Mapbox.PointAnnotation>;
		let pointerDestination = <Mapbox.PointAnnotation
						        key='pointDestinationAnnotation'
						        id='pointDestinationAnnotation'
						        coordinate={[!this.state.coords.desLongitude ? 0 : this.state.coords.desLongitude, !this.state.coords.desLatitude ? 0 : this.state.coords.desLatitude]}>

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
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Dashboard</Text>
					</Body>
					<Right/>
				</Header>
				<View style={styles.mapContainer}>
			        <Mapbox.MapView
			        	ref={(c) => (this._map = c)}
			            styleURL={Mapbox.StyleURL.Street}
			            zoomLevel={12}
			            centerCoordinate={[121.1167,14.2871]}
			            style={styles.container}>
			            {currentPosition}
			            {pointerDestination}
			        </Mapbox.MapView>
			      </View>
			      <DisplayRequest  dispatch={this.handleDispatch.bind(this)} request={this.state.request} style={{flex: 1}} coords={this.handleCoords}/>
			</View>		
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	mapContainer: {
		flex: 0.6
	},
	button: {
	    flexDirection: 'row',
	    padding: 8,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
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
})

export default DispatchDashboard