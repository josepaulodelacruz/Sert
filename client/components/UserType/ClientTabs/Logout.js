import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
import { DrawerItems } from 'react-navigation';

class Logout extends Component {
	static navigationOptions = {
		drawerIcon: ({tintColor}) => {
			return(				
				<Icon name="chatboxes" style={{fontSize: 24, color: "blue"}} onPress={() => {
					alert('Logout')
				}}/>
			)
			
			
		}
	}
	render(){
		return(
			<View>
				<Text>Logout</Text>
			</View>
		)
	}
}	

export default Logout;