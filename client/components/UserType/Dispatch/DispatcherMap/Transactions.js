import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left } from "native-base";

class Transactions extends Component {
	constructor(){
		super();
		this.state = {
			id: [],
			coords:''
		}
	}

	componentWillMount(){
		this.setState({ transaction: [
			{
				time: this.props.transaction.time,
				location: this.props.transaction.location,
				destination: this.props.transaction.destination,
				latitude: this.props.transaction.latitude,
				longitude: this.props.transaction.longitude,
				desLongitude: this.props.transaction.desLongitude,
				desLatitude: this.props.transaction.desLatitude,
				price: this.props.transaction.price,
				id: this.props.id
			}
		]})
	}

	handleSubmit = () => {
		this.setState({ coords: {
			id: this.props.id,
			latitude: this.props.transaction.latitude,
			longitude: this.props.transaction.longitude,
			desLongitude: this.props.transaction.desLongitude,
			desLatitude: this.props.transaction.desLatitude,
		}},function(){
			this.props.coords(this.state.coords);
		})
	}

	handleAccept = (transaction) => {
		this.props.dispatch(transaction);
	}


	render(){
		
		let transactions = this.state.transaction.map((transaction) => {
			return(
				<View id={transaction.id} key={transaction.id}>
				<CardItem>
					<Text style={{fontSize: 13}}>Current Location: {transaction.location}</Text>
				</CardItem>
				<CardItem>
					<Text style={{fontSize: 13}}>Destination: {transaction.destination}</Text>
				</CardItem>
				<CardItem>
					<Text style={{fontSize: 13}}>Fair Price: {transaction.price}</Text>
				</CardItem>
				<CardItem footer bordered>
		              <Left/>
		              <Right>
		              <View style={{flex: 1, flexDirection: 'row'}}>
		              		<TouchableOpacity style={styles.button} onPress={this.handleSubmit.bind(this)}>
		              			<Text style={{color: 'white'}}>View</Text>
			              	</TouchableOpacity>
			              	<TouchableOpacity style={styles.button} onPress={this.handleAccept.bind(this, transaction)}>
			              		<Text style={{color: 'white'}}>Accept</Text>
			              	</TouchableOpacity>
		              </View>
		              </Right>
		            </CardItem>		
				</View>
			)
		})
		return(
			<View>
				{transactions}
			</View>
				
		)
	}
}

const styles = StyleSheet.create({
	button: {
	    flexDirection: 'row',
	    padding: 8,
	    justifyContent: 'center',
	    marginRight: 12,
	    alignItems: 'center',
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
	  },
})

export default Transactions;