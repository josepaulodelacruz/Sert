import React from 'react';
import io from 'socket.io-client/dist/socket.io';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { BackHandler, DeviceEventEmitter, StyleSheet, Text, View,Button, SafeAreaView, ScrollView, Dimensions, Image, PermissionsAndroid, Platform  } from 'react-native';
import Front from './components/Front';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Client from './components/UserType/Client';
import Dispatcher from './components/UserType/Dispatcher';
import ClientScreen from './components/UserType/ClientScreen';
import DispatcherScreen from './components/UserType/DispatcherScreen';
import Profile from './components/UserType/ClientTabs/Profile';
import Messages from './components/UserType/ClientTabs/Messages';
import JoinTricycleRide from './components/UserType/ClientTabs/JoinTricycleRide';
import { Icon } from 'native-base';
import { createStackNavigator, createDrawerNavigator, DrawerItems, createBottomTabNavigator } from 'react-navigation';

  

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      response: [],
      endpoint: 'http://192.168.0.15:5000',
      con: '',
      msg: 'sent',
      socket: io('http://192.168.0.15:5000', {jsonp: false}),
      permission: false
    };
  }




  componentDidMount(){
    async function requestCameraPermission() {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Sert App',
            'message': 'The App wants to access your ' +
                       'Current Location?.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission Granted")
        } else {
          console.log("Permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }


  componentDidMount(){
    this.callApi()
      .then(res => this.setState({ response: res.express}))
      .catch(err => console.log(err));
  }
  // retrieving data from the back-end server from port 5000
  callApi = async () => {
    const response = await fetch('http://192.168.0.15:5000/products/test');
    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  componentDidMount(){
     LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
    ok: "YES",
    cancel: "NO",
    enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
    showDialog: true, // false => Opens the Location access page directly
    openLocationServices: true, // false => Directly catch method is called if location services are turned off
    preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
    preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
    providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then(function(success) {
        console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
        this.setState({permission: true})
    }).catch((error) => {
        console.log(error.message); // error.message => "disabled"
    });
  }

  render() {
     

    return(
      <Screens/>
    )
  }
}


const CustomDrawerComponent = (props) => {
  return(
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('./components/Assets/defaultPic.jpg')} style={{height: 120, width: 120, borderRadius: 120}}/>
      </View>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
  )
}


const Screens = createStackNavigator({
  Home: { screen: Front},
  Login: { screen: Login},
  SignUp: { screen: SignUp},
  Client: { screen: Client},
  Dispatcher: { screen: Dispatcher },
  ClientScreen: { screen: ClientScreen,
   // Client screen drawer navigation
    screen: createDrawerNavigator({
      Home: { screen: ClientScreen, 
        // client screen bottom tab navigator
        screen: createBottomTabNavigator({
          Single: { screen: ClientScreen},
          Join: { screen: JoinTricycleRide}
        })
        ,navigationOptions: {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="home" style={{fontSize: 24, color: "blue"}}/>
            );
          }
        } 
      },
      Profile: { screen: Profile },
      Messages: { screen: Messages },
    }, {
      // effects of drawer
      contentComponent: CustomDrawerComponent,
      contentOptions: {
        activeTintColor: 'blue'
      }
    })
    // removing the stack navigator at client screen
    ,navigationOptions: {
      header: null
    }
  },
  DispatcherScreen: { screen: DispatcherScreen}
},
  {
    initialRouteName: 'ClientScreen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3073FA',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

