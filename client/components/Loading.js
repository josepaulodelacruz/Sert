import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase';
import { UIActivityIndicator, DotIndicator, } from 'react-native-indicators';	

class Loading extends Component {
	componentDidMount() {
	    firebase.auth().onAuthStateChanged(user => {
	      this.props.navigation.navigate(user ? 'ClientScreen' : 'Login')
	      console.log(user)
	    })
	  }

	render() {
	    return (
	      <View style={styles.container}>
	        <DotIndicator color="blue" size={14}/>
	      </View>
	    )
	  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Loading