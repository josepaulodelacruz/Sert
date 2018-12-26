import React from 'react';
import io from 'socket.io-client/dist/socket.io';
import { StyleSheet, Text, View,Button, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
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
      socket: io('http://192.168.0.15:5000', {jsonp: false})
    };
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

  render() {
    // return (
    //   <View style={styles.container}>
    //     <Text>hello {this.state.response}</Text>
    //     <Button title="Press" onPress={() => this.state.socket.emit('Send', this.state.msg)}/>
    //   </View>
    // );
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
    initialRouteName: 'Home',
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

