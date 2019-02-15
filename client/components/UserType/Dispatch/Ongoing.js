import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';

class Ongoing extends Component {
	static navigationOptions = {
	      drawerIcon: ({ tintColor }) =>{
	        return(
	          <Icon name="navigate" style={{fontSize: 24, color: "blue"}}/>
	        );
	    }   
	}

	render(){
		return(
			<View>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Ongoing</Text>
					</Body>
					<Right/>
				</Header>
			</View>
		)
	}
}

export default Ongoing;