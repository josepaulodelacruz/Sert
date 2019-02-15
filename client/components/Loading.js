import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase';
import { UIActivityIndicator, DotIndicator, } from 'react-native-indicators';	

class Loading extends Component {
	constructor(){
		super();
		this.state = {
			userType: null
		}
	}
	componentWillMount() {
	    this.database()
	  }

	componentWillUnmount(){
		this.database()
	}

	

	database (){
	  	 firebase.auth().onAuthStateChanged(user => {
	      	if(!user){
	      		this.props.navigation.navigate('Login')
	      	}else{
	      		firebase.database().ref('Clients/' + user.uid ).once('value', snapshot => {
	      			console.log(snapshot.val().role);
					this.setState({userType: snapshot.val().role})
					if(this.state.userType === 'Admin'){
						this.props.navigation.navigate('Admin')
					}else if(this.state.userType === 'dispatcher'){
						this.props.navigation.navigate('DispatcherScreen')
					}else if(this.state.userType === 'client'){
						this.props.navigation.navigate('ClientScreen')
					}
				})
	      	}
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