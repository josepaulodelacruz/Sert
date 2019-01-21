import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Star from 'react-native-star-view';

class StarRating extends Component {
	render(){
		return(
		 	<View style={styles.container}>
		        <Star score={4} style={styles.starStyle} />
      		</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	starStyle: {
      width: 100,
      height: 20,
      margin: 20		
	}
})


export default StarRating;