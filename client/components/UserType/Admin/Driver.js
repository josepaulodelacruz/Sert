import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { Header, Left, Body, Right, Icon } from 'native-base';

class Driver extends Component {
	constructor(props){
		super(props);
		this.state = {
			add: false,
			isModalVisible: false
		}
	}
	static navigationOptions = {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="bicycle" style={{fontSize: 24, color: "blue"}}/>
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
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Drivers</Text>
					</Body>
					<Right>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('AddDispatcher')} style={styles.button}>
							<Text style={{color: 'white'}}>Add Driver</Text>
						</TouchableOpacity>
					</Right>
				</Header>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>Add Drivers</Text>
				</View>
			</View>		
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	button: {
	    flexDirection: 'row',
	    padding: 8,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
	  },
})

export default Driver;