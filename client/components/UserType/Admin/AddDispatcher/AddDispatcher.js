import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Item, Input, Label, Form, Left, Right} from "native-base";
import firebase from 'react-native-firebase';
export default class AddDispatcher extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: null,
      address: null,
      contact: null,
      plateNumber: null,
      group: null,
      conduction: null,
      email: null,
      password: null,
      conPassword: null,
    }
  }

  handleSubmit = () => {
    if(!this.state.name || !this.state.address || !this.state.contact || !this.state.plateNumber || !this.state.group || !this.state.conduction || !this.state.password || !this.state.email || !this.state.conPassword){
      alert("Fill up All the information Needed")
    }else if(this.state.password !== this.state.conPassword){
      alert("Password didn't match")
    }else{
       firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((success) => {
              if (firebase.auth().currentUser) {
                userId = firebase.auth().currentUser.uid;
                if (userId) {
                    firebase.database().ref('Clients/' + userId).set({
                          name: this.state.name,
                          address: this.state.address,
                          contact: this.state.contact,
                          plateNumber: this.state.plateNumber,
                          group: this.state.group,
                          conduction: this.state.conduction,
                          email: this.state.email,
                          password: this.state.password,
                          active: 0,
                          role: 'dispatcher',
                          transactions: {
                            accepted: "",
                            cancel: "",
                          }
                    }).then((data) => {
                        alert("Sucessfully Registered")
                        this.props.navigation.navigate('Admin')
                    }).catch((error) => {
                        alert(error)
                    })
                }
            }
        }).catch((error) => {
          alert(error)
        })     
    }
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Dispatcher Information</Text>
            </CardItem>
                <Form>
                  <Item floatingLabel>
                  <Label>Name</Label>
                  <Input onChangeText={(name) => this.setState({name: name})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>Address</Label>
                  <Input onChangeText={(address) => this.setState({address:address })} />
                </Item>
                <Item floatingLabel last>
                  <Label>Contact Number</Label>
                  <Input onChangeText={(contact) => this.setState({contact: contact})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>Plate Number</Label>
                  <Input onChangeText={(plateNumber) => this.setState({plateNumber: plateNumber})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>Tricyc Operators Group</Label>
                  <Input onChangeText={(group) => this.setState({group: group})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>Conduction Sticker</Label>
                  <Input onChangeText={(conduction) => this.setState({conduction: conduction})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>E-mail</Label>
                  <Input onChangeText={(email) => this.setState({email: email})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input onChangeText={(password) => this.setState({password: password})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>Confirm Password</Label>
                  <Input onChangeText={(conPassword) => this.setState({conPassword: conPassword})}/>
                </Item>
                </Form>
            <CardItem footer bordered>
              <Left/>
              <Body/>
              <Right>
                <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                  <Text style={{color: 'white'}}>Add</Text>
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
  button: {
      flexDirection: 'row',
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#00BFFF",
      borderRadius: 10,
    },
})