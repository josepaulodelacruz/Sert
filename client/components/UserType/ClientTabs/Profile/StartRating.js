import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Star from 'react-native-star-view';

class StarRating extends Component {
	componentWillMount(){

	}

	render(){
		let rating;
		let sumRequest;
		let n;
		rating = parseInt(this.props.rate);
		sumRequest = parseInt(this.props.request);
		n = sumRequest * 5;
		let total = rating/n;
		let star;
		if(total <= 0.10){
			star = <Star score={0.5} style={styles.starStyle} />
		}else if(total <= 0.20){
			star = <Star score={1} style={styles.starStyle} />
		}else if(total <= 0.30){
			star = <Star score={1.5} style={styles.starStyle} />
		}else if(total <= 0.40){
			star = <Star score={2} style={styles.starStyle} />
		}else if(total <= 0.50){
			star = <Star score={2.5} style={styles.starStyle} />
		}else if(total <= 0.60){
			star = <Star score={3} style={styles.starStyle} />
		}else if(total <= 0.70){
			star = <Star score={3.5} style={styles.starStyle} />
		}else if(total <= 0.80){
			star = <Star score={4} style={styles.starStyle} />
		}else if(total <= 0.90){
			star = <Star score={4.5} style={styles.starStyle} />
		}else if(total <= 1){
			star = <Star score={5} style={styles.starStyle} />
		}else{
			star = <Star score={0} style={styles.starStyle} />
		}
		return(
		 	<View style={styles.container}>
		        {star}
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