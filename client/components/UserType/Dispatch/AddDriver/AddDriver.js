import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, Content, Card, CardItem, Text, Body, Form, Item, Input, Label } from "native-base";
import firebase from 'react-native-firebase';

export default class AddDriver extends Component {
  constructor(){
    super();
    this.state = {
      name: null,
      contact: null,
      address: null,
      plate: null,
      conduction: null,
      operatorName: null,
      operatorContactNumber: null,
    }
  }

  handleAddDriver = () => {
      if(this.state.name === null || this.state.contact === null || this.state.address === null || this.state.plate === null || this.state.conduction === null){
        alert("Please answer Necessary Information Needed")
      }else{
        firebase.database().ref('Clients/Drivers').push({
          name: this.state.name,
          contact: this.state.contact,
          address: this.state.address,
          plate: this.state.plate,
          conduction: this.state.conduction,
          operatorName: this.state.operatorName,
          operatorContactNumber: this.state.operatorContactNumber,
          rating: 0,
          report: false
        })
        this.props.navigation.navigate('Dashboard')
        
      }
  }



  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Driver Information</Text>
            </CardItem>
               <Form>
                <Item stackedLabel last>
                  <Label>Name:</Label>
                  <Input onChangeText={(name) => this.setState({name: name})} />
                </Item>
                <Item stackedLabel >
                  <Label>Contact:</Label>
                  <Input keyboardType='numeric' maxLength={11} onChangeText={(contact) => this.setState({contact: contact})} />
                </Item>
                <Item stackedLabel last>
                  <Label>Address:</Label>
                  <Input onChangeText={(address) => this.setState({address: address})} />
                </Item>
                <Item stackedLabel last>
                  <Label>Plate Number:</Label>
                  <Input onChangeText={(plate) => this.setState({plate: plate})}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Conduction Sticker:</Label>
                  <Input onChangeText={(conduction) => this.setState({conduction: conduction})}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Operators Name:</Label>
                  <Input onChangeText={(operatorName) => this.setState({operatorName: operatorName})}/>
                </Item>
                <Item stackedLabel last>
                  <Label>Operators Contact Number:</Label>
                  <Input keyboardType='numeric' maxLength={11} onChangeText={(operatorContactNumber) => this.setState({operatorContactNumber: operatorContactNumber})}/>
                </Item>
              </Form>
            <CardItem footer bordered>
              <Left/>
              <Body/>
              <Right>
              <TouchableOpacity style={styles.button} onPress={this.handleAddDriver} >
                <Text style={{color: 'white'}}>Add Driver</Text>
              </TouchableOpacity>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
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

