import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left, Form, Item, Label } from "native-base";

class DispatcherList extends Component {

	handleDispatcher = (id) => {
		this.props.dispatchDriver(id)
	}

	render(){
		let drivers = this.props.dispatcherList.map((driver) => {
			return(
				
				<Card key={driver.id} id={driver.id}>
            <CardItem header bordered>
              <Text>Driver Information</Text>
            </CardItem>
               <Form>
                <Item stackedLabel last>
                  <Label>Name: {driver.name}</Label>
                </Item>
                <Item stackedLabel >
                  <Label>Contact: {driver.contact}</Label>
                </Item>
                <Item stackedLabel last>
                  <Label>Plate Number: {driver.plate} </Label>
                </Item>
                <Item stackedLabel last>
                  <Label>Conduction Sticker: {driver.conduction}</Label>
                </Item>
                <Item stackedLabel last>
                  <Label>Operators Name: {driver.operatorName}</Label>
                </Item>
                <Item stackedLabel last>
                  <Label>Operators#: {driver.operatorContactNumber}</Label>
                </Item>
              </Form>
            <CardItem footer bordered>
              <Left/>
              <Body/>
              <Right>
              <TouchableOpacity style={styles.button} onPress={this.handleDispatcher.bind(this, driver)} >
                <Text style={{color: 'white'}}>Dispatch</Text>
              </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>

			)
		})
		return(
			<Content padder>
			{drivers}
			</Content>	
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

export default DispatcherList;