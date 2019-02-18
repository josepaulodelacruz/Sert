import React from 'react';
// import io from 'socket.io-client/dist/socket.io';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { TouchableOpacity, Alert, BackHandler, DeviceEventEmitter, StyleSheet, Text, View,Button, SafeAreaView, ScrollView, Dimensions, Image, PermissionsAndroid, Platform  } from 'react-native';
import Front from './components/Front';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Loading from './components/Loading';
import Client from './components/UserType/Client';
import Dispatcher from './components/UserType/Dispatcher';
import Dashboard from './components/UserType/Dispatch/DispatchDashboard';
import ReqDriver from './components/UserType/Dispatch/ReqDriver';
import AddDriver from './components/UserType/Dispatch/AddDriver/AddDriver';
import Ongoing from './components/UserType/Dispatch/Ongoing';
import UpdateDriver from './components/UserType/Dispatch/AddDriver/UpdateDriver';
import DispatchDriver from './components/UserType/Dispatch/DispatcherMap/DispatchDriver';
import DispatcherReports from './components/UserType/Dispatch/DispatcherReports';
import DriverFeedback from './components/UserType/Dispatch/Feedback';
import ListReport from './components/UserType/Dispatch/Reports/DetailReport';
import ClientScreen from './components/UserType/ClientScreen';
import Admin from './components/UserType/Admin';
import User from './components/UserType/Admin/User';
import Driver from './components/UserType/Admin/Driver';
import Details from './components/UserType/Dispatch/Ongoing/Details';
// import AddDispatcher from './components/UserType/Admin/AddDispatcher/AddDispatcher';
import Report from './components/UserType/Admin/Report';
import Feedback from './components/UserType/Admin/Feedback';
import DispatcherScreen from './components/UserType/DispatcherScreen';
import Logout from './components/UserType/ClientTabs/Logout';
import Profile from './components/UserType/ClientTabs/Profile';
import Messages from './components/UserType/ClientTabs/Messages';
import Request from './components/UserType/ClientTabs/JoinTricycleRide';

import { Icon } from 'native-base';

import firebase from 'react-native-firebase';

import { NavigationActions , createStackNavigator, createDrawerNavigator, DrawerItems, createBottomTabNavigator } from 'react-navigation';

/*Parent Element of all child Component
  routing and fetch thru API
*/

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      response: [],
      endpoint: 'http://192.168.0.10:5000',
      con: '',
      msg: 'sent',
      // socket: io('http://192.168.0.14:5000', {jsonp: false}),
      permission: false,
      logout: []
    };
  }

  /*Google Firebase API key*/




  componentWillMount(){
    // Access Permission
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

  // Back end Server Fetch
  

  componentWillMount(){
    // Turning on the Geolocation of the phone
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
      // Display pages
      <Screens/>
    )
  }
}
 

const Screens = createStackNavigator({
  Home: {screen: Front},
  Login: { screen: Login},
  SignUp: { screen: SignUp},
  Client: { screen: Client},
  Dispatcher: { screen: Dispatcher },
  Loading: { screen: Loading },
  AddDriver: { screen: AddDriver },
  UpdateDriver: { screen: UpdateDriver},
  DispatchDriver: { screen: DispatchDriver },
  ListReport: { screen: ListReport },
  Details: { screen: Details },
  Admin: { screen: Admin,
    screen: createDrawerNavigator({
      Home: { screen: Admin },
      Users: { screen: User },
      Drivers: { screen: Driver },
      Report: { screen: Report },
      Feedback: { screen: Feedback },
    }, {
        contentComponent: (props) => (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={{height: 250, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('./components/Assets/SertLogo.jpg')} style={{height: 200, width: 200}}/>
                </View>
                  <DrawerItems {...props}/>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    firebase.auth().signOut().then(sucess => {
                      props.navigation.navigate('Login')
                    }).catch((err) => {
                      alert(err)
                    })
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        ),
        contentOptions: {
          activeTintColor: 'blue'
        }
    }) ,navigationOptions: {
      header: null
    }
  },
  ClientScreen: { screen: ClientScreen,
   // Client screen drawer navigation
    screen: createDrawerNavigator({
      Home: { screen: ClientScreen, 
        // client screen bottom tab navigator
        screen: createBottomTabNavigator({
          Single: { screen: ClientScreen},
          Request: { screen: Request}
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
      Reports: { screen: Messages }
    }, {
      // effects of Side drawer
      contentComponent: (props) => (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={{height: 250, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('./components/Assets/SertLogo.jpg')} style={{height: 200, width: 200}}/>
                </View>
                  <DrawerItems {...props}/>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    firebase.auth().signOut().then(sucess => {
                      props.navigation.navigate('Login')
                    }).catch((err) => {
                      alert(err)
                    })
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        ),
      contentOptions: {
        activeTintColor: 'blue'
      }
    })
    // removing the stack navigator at client screen
    ,navigationOptions: {
      header: null
    }
  },
  DispatcherScreen: { screen: DispatcherScreen, 
    screen: createDrawerNavigator({
       Dashboard: { screen: Dashboard },
        Drivers: { screen: ReqDriver },
        Ongoing: { screen: Ongoing },
        Reports: { screen: DispatcherReports },
        Feedback: { screen: DriverFeedback }
    }, {
      contentComponent: (props) => (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={{height: 250, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('./components/Assets/SertLogo.jpg')} style={{height: 200, width: 200}}/>
                </View>
                  <DrawerItems {...props}/>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    firebase.auth().signOut().then(sucess => {
                      props.navigation.navigate('Login')
                    }).catch((err) => {
                      alert(err)
                    })
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        ),
      contentOptions: {
        activeTintColor: 'blue'
      }
    })
    ,navigationOptions: {
      header: null
    }
  }
},
  {
    // Starting Page, edit the bottom line of the initialRoute to change the page 
    initialRouteName: 'Loading',
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



export default App;