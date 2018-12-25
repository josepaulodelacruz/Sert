import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import DashBoardClient from './ClientTabs/DashBoardClient';
import Profile from './ClientTabs/Profile';
import Messages from './ClientTabs/Messages';
import TricycleRide from './ClientTabs/TricycleRide';
import JoinTricycleRide from './ClientTabs/JoinTricycleRide';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'native-base';
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
	Home: { screen: DashBoardClient,
			screen: createBottomTabNavigator({
				Single: { screen: DashBoardClient},
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
	Profile: { screen: Profile},
	Messages: { screen: Messages}
}, {
	contentComponent: CustomDrawerComponent,
	contentOptions: {
		activeTintColor: 'blue'
	}
})

// const BottomDrawer = createBottomTabNavigator({
// 	SingleRide: { screen: DashBoardClient,
// 		screen: createDrawerNavigator({
// 			Home: { screen: DashBoardClient},
// 			Profile: { screen: Profile},
// 			Messages: { screen: Messages}
// 		}, {
// 			contentComponent: CustomDrawerComponent,
// 			contentOptions: {
// 				activeTintColor: 'blue'
// 			}
// 		})
// 	},
// 	JoinRide: { screen: JoinTricycleRide}
// }, {
// 	defaultNavigationOptions: ({ navigation }) => ({
// 		tabBarIcon: ({ focused, tintColor }) => {
// 			const { routeName } = navigation.state;
// 			let iconName;
// 			if (routeName === "SingleRide") {
// 				 iconName = `bicycle${focused ? '' : '-outline'}`;
// 			} else if (routeName === 'JoinRide') {
// 				 iconName = `md-people${focused ? '' : '-outline'}`;
// 			}
// 			return <Icon name={iconName} size={25} color={tintColor} />;
// 		}
// 	}),
// 	tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//   })

// Home: { screen: DashBoardClient, 
	// 		screen: createBottomTabNavigator({
	// 			Home: { screen: DashBoardClient},
	// 			Single: { screen: TricycleRide},
	// 			Join: { screen: JoinTricycleRide}
	// 		})
	// },


	// DashBoardClient: {
	// 	screen: createBottomTabNavigator({
	// 		Single: { screen: TricycleRide },
	// 		Joined: { screen: JoinTricycleRide}
	// 	})
	// },



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default ClientScreen;

