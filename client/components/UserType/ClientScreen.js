import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerItems, createBottomTabNavigator } from 'react-navigation';
import { Header, Left, Body, Right, Icon, Fab, Button } from 'native-base';
import Locator from './ClientTabs/Maps/Locator';
// https://www.youtube.com/watch?v=7uhJN4kVS6g

export default class ClientScreen extends React.Component {
	constructor(){
		super();
		this.state = {
			active: true
		};
	}

	bookRide = () => {
		alert('Book A Ride?');
	}

	static navigationOptions = {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="home" style={{fontSize: 24, color: "blue"}}/>
            );
        }
    } 

	render(){
		const { navigate } = this.props.navigation;
		return(
			// <AppNavigator/>
			<View style={styles.container}>
			<View style={{paddingTop: 22, backgroundColor: '#111'}}>
				<StatusBar translucent={true} backgroundColor={'transparent'}/>
			</View>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Single Ride</Text>
					</Body>
					<Right/>
				</Header>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Locator/>
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
    flex: 1
  },
});


