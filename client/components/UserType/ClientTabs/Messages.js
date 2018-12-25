import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';

class Messages extends Component {
	static navigationOptions = {
		drawerIcon: ({tintColor}) => {
			return(
				<Icon name="chatboxes" style={{fontSize: 24, color: "blue"}}/>
			)
			
		}
	}

	render(){
		return(
			<View style={styles.container}>
			<View style={{paddingTop: 22, backgroundColor: '#111'}}>
				<StatusBar translucent={true} backgroundColor={'transparent'}/>
			</View>	
				<Header>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text>Messages</Text>
					</Body>
					<Right/>
				</Header>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>Messages</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Messages;