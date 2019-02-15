import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Left, Right, Content, Card, CardItem, Text, Body, Form, Item, Input, Label } from "native-base";
import firebase from 'react-native-firebase';

class UpdateDriver extends Component {
	constructor(){
		super();
		this.state = {
			driver:  [],
			name: null,
			contact: null,
			address: null,
			plate: null,
			conduction: null,
			operatorName: null,
			operatorContactNumber: null
		}
	}

	componentWillMount(){
		let driver = [];
		firebase.database().ref('Clients/Drivers/' + this.props.navigation.state.params.id).once('value', (snapshot) => {
			this.setState({driver: snapshot.val()})
		})
	}

	handleUpdate = () => {
		 Alert.alert(
                'Update?',
                `Update Information of ${this.state.driver.name}`,
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
          			let info = firebase.database().ref('Clients/Drivers/' + this.props.navigation.state.params.id)
						info.update({ name: !this.state.name ? this.state.driver.name : this.state.name , contact: !this.state.contact ? this.state.driver.contact : this.state.contact , address: !this.state.address ? this.state.driver.address : this.state.address, plate: !this.state.plate ? this.state.driver.plate : this.state.plate, conduction: !this.state.conduction ? this.state.driver.conduction : this.state.conduction, operatorName: !this.state.operatorName ? this.state.driver.operatorName : this.state.operatorName, operatorContactNumber: !this.state.operatorContactNumber ? this.state.driver.operatorContactNumber : this.state.operatorContactNumber})
						this.props.navigation.navigate('Dashboard')
	                  }},

                ],
                { cancelable: false }
              )  
		
	}

	render(){

		return(
			<Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Driver Information</Text>
            </CardItem>
               <Form>
                <Item stackedLabel last>
                  <Label>Name:</Label>
                  <Input onChangeText={(name) => this.setState({name: name})} placeholder={this.state.driver.name}/>
                </Item>
                <Item stackedLabel >
                  <Label>Contact:</Label>
                  <Input onChangeText={(contact) => this.setState({contact: contact})} placeholder={this.state.driver.contact}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Address:</Label>
                  <Input onChangeText={(address) => this.setState({address: address})} placeholder={this.state.driver.address}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Plate Number:</Label>
                  <Input onChangeText={(plate) => this.setState({plate: plate})} placeholder={this.state.driver.plate}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Conduction Sticker:</Label>
                  <Input onChangeText={(conduction) => this.setState({conduction: conduction})} placeholder={this.state.driver.conduction}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Operators Name:</Label>
                  <Input onChangeText={(operatorName) => this.setState({operatorName: operatorName})} placeholder={this.state.driver.operatorName}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Operators Contact Number:</Label>
                  <Input onChangeText={(operatorContactNumber) => this.setState({operatorContactNumber: operatorContactNumber})} placeholder={this.state.driver.operatorContactNumber}/>
                </Item>
              </Form>
            <CardItem footer bordered>
              <Left/>
              <Body/>
              <Right>
              <TouchableOpacity style={styles.button} onPress={this.handleUpdate} >
                <Text style={{color: 'white'}}>Update</Text>
              </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
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


export default UpdateDriver;