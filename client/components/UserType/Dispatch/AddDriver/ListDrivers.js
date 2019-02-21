import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right } from 'native-base';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

class ListDrivers extends Component {
	handleDelete = (id) => {
		this.props.onDelete(id)
	}

	handleUpdate = (id) => {
		this.props.onUpdate(id);
	}

	render(){
		/*Display all the driver information*/
		let drivers = this.props.drivers.map((driver) => {
			console.log(driver);
			return(
				<Card key={driver.id} id={driver.id}>
		            <CardItem header>
		              <Text>{driver.name}</Text>
		            </CardItem>
		            <CardItem>
		              <Body>
		                <Text>Contact: {driver.contact}</Text>
		                <Text>Address: {driver.address}</Text>
		                <Text>Plate Number: {driver.plate}</Text>
		                <Text>Conduction: {driver.conduction}</Text>
		                <Text>Operator's Name:{driver.operatorName}</Text>
		                <Text>Operator's Contact info:{driver.operatorContactNumber}</Text>
		                <Text>Rating: {driver.rating}</Text>
		              </Body>
		            </CardItem>
		            <CardItem footer>
		            <Left/>
		            <Body/>
		            <Right>
		            	<View style={{flex: 1, flexDirection: 'row'}}>
	              		<TouchableOpacity style={styles.button} onPress={this.handleUpdate.bind(this, driver.id)}>
	              			<Text style={{color: 'white'}}>Update</Text>
		              	</TouchableOpacity>
		              	<TouchableOpacity style={styles.button} onPress={this.handleDelete.bind(this, driver.id)}>
		              		<Text style={{color: 'white'}}>Delete</Text>
		              	</TouchableOpacity>
		              </View>
		            </Right>
		            </CardItem>
		         </Card>
			)
		})
		return(
			<Container>
		        <Content padder>
		          {drivers}
		        </Content>
		      </Container>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
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

export default ListDrivers;