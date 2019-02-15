import React, { Component } from 'react';
import { View, Text, StyleSheet, BackHandler, Alert } from 'react-native';
import { Header, Left, Body, Right, Icon } from 'native-base';
class Admin extends Component {
	static navigationOptions = {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="home" style={{fontSize: 24, color: "blue"}}/>
            );
        }   
    }

    onButtonPress = () => {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // then navigate
  navigate('Admin');
}

handleBackButton = () => {
 Alert.alert(
     'Exit App',
     'Exiting the application?', [{
         text: 'Cancel',
         onPress: () => console.log('Cancel Pressed'),
         style: 'cancel'
     }, {
         text: 'OK',
         onPress: () => BackHandler.exitApp()
     }, ], {
         cancelable: false
     }
  )
  return true;
} 

componentDidMount(){
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount(){
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Home</Text>
					</Body>
					<Right/>
				</Header>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>Display Pictures of Carlton Toda Home page</Text>
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

export default Admin;