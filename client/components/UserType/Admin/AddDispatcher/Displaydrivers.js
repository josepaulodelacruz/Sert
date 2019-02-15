import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity }  from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left } from "native-base";

class Displaydrivers extends Component {

	handleDelete = (id) => {
		this.props.onDelete(id);
	}

	render(){
			let drivers = this.props.drivers.map((driver) => {
			if(driver.role === 'dispatcher'){
				return(
					<Card key={driver.id} id={driver.id}>
			            <CardItem header bordered>
			              <Text>{driver.first} {driver.last}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Contact: {driver.contact}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Toda: {driver.Toda}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Address: {driver.address}</Text>
			            </CardItem>
			            <CardItem footer bordered>
			              <Left/>
			              <Body/>
			              <Right>
			              	<TouchableOpacity style={styles.button} onPress={this.handleDelete.bind(this, driver.id)}>
			              		<Text style={{color: 'white'}}>Delete</Text>
			              	</TouchableOpacity>
			              </Right>
			            </CardItem>
			          </Card>
				)
			}else{
				return false
			}
		})


		return(
			<Content padder>
				{drivers}
			</Content>	
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

export default Displaydrivers;


