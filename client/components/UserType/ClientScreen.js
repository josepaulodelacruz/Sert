import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import DashBoardClient from './ClientTabs/DashBoardClient';
import Profile from './ClientTabs/Profile';
import Messages from './ClientTabs/Messages';
// https://www.youtube.com/watch?v=7uhJN4kVS6g

class ClientScreen extends Component {
	static navigationOptions= {
		title: 'Client',
		header: null
	}
	render(){
		const { navigate } = this.props.navigation;
		return(
			<AppNavigator/>	
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


const AppNavigator = createDrawerNavigator({
	Home: DashBoardClient,
	Profile: Profile,
	Messages: Messages
}, {
	contentComponent: CustomDrawerComponent
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default ClientScreen;