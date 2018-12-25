import React from 'react';
import io from 'socket.io-client/dist/socket.io';
import { StyleSheet, Text, View,Button, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import Front from './components/Front';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Client from './components/UserType/Client';
import Dispatcher from './components/UserType/Dispatcher';
import ClientScreen from './components/UserType/ClientScreen';
import DispatcherScreen from './components/UserType/DispatcherScreen';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';

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

const Screens = createStackNavigator({
  Home: { screen: Front},
  Login: { screen: Login},
  SignUp: { screen: SignUp},
  Client: { screen: Client},
  Dispatcher: { screen: Dispatcher },
  ClientScreen: { screen: ClientScreen},
  // ClientScreen: { screen: ClientScreen,
  //   screen: createDrawerNavigator({
  //     Home: DrawerComponent
  //   })
  // },
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
