import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Icon, Fab, Button } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';



export default class JoinTricycleRide extends React.Component {
	constructor(){
		super();
		this.state = {
			active: true
		};
	}
	
	bookRide = () => {
		alert('Book A Ride?');
	}

	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Join Ride</Text>
					</Body>
					<Right/>
				</Header>
				<View>
					<Text>Hello World</Text>
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


const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})