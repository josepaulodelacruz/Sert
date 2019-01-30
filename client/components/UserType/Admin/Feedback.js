import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
class Feedback extends Component {
	static navigationOptions = {
      drawerIcon: ({ tintColor }) =>{
        	return(
              <Icon name="bookmarks" style={{fontSize: 24, color: "blue"}}/>
        	);
        }   
    }
	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Feedback</Text>
					</Body>
					<Right/>
				</Header>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>Display Feedbacks by the users and Dispatcher</Text>
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

export default Feedback;