import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Radio, ListItem, Left, Icon } from 'native-base';

import Swiper from 'react-native-swiper';
import firebase from 'react-native-firebase';
import uuid from 'react-native-uuid';


export default class Client extends Component {
  constructor(){
    super();
    this.state = { 
      errorMessage: null,
        isLoading: false,
       fName: null,
       lName: null,
       address: null,
       ContactNumber: null,
       gender: null,
       male: null,
       female: null,
       username: null,
       password: null,
       confirmatoryPassword: null,
       email: null,
       checkmark: ''
    }
  }
  static navigationOptions = {
    title: 'Client Registration'
  }

  /*Submit event, Check for unfill up textbox, comparison check, validation*/
  handleSubmit = () => {
    if(!this.state.fName || !this.state.lName || !this.state.address || !this.state.ContactNumber || !this.state.gender || !this.state.username || !this.state.password || !this.state.email){
      alert(`Don't Leave a unfilled info`)
    }else if(this.state.password !== this.state.confirmatoryPassword){
      alert("Password didn't match") 
     }else{
         firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((success) => {
                  if (firebase.auth().currentUser) {
                    userId = firebase.auth().currentUser.uid;
                    if (userId) {
                        firebase.database().ref('Clients/' + userId).set({
                              sent: false,
                              fName: this.state.fName,
                              lName: this.state.lName,
                              address: this.state.address,
                              contactNumber: this.state.ContactNumber,
                              gender: this.state.gender,
                              username: this.state.username,
                              rating: 0,
                              feedback: "",
                              role: "client",
                              approved: false,
                              Transactions: {
                                  approved: false,
                                  time: "",  
                                  longitude: "",
                                  latitude: "",
                                  desLongitude: "",
                                  desLatitude: "",
                                  service: "",
                                  price: "",
                                  location: "",
                                  destination: ""
                              }
                        }).then((data) => {
                            alert("Sucessfully Registered")
                            this.props.navigation.navigate('Login');
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
  

  render(){
    let icon;
    // Password Checking comparison
      if(this.state.password === null && this.state.confirmatoryPassword === null){
        icon = '';
      }else if(this.state.password === this.state.confirmatoryPassword){
        icon = 'checkmark-circle';
      }else{
        icon = 'close-circle'
      }
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <Container>
        <Content>
          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <Text style={{fontSize: 14}}>Step 1. Fill up First all Personal Information</Text>
          </View>          
          <Form onSubmit={this.handleSubmit}>
            <Item floatingLabel>
              <Label>First Name</Label>
              <Input onChangeText={(fName) => this.setState({fName: fName})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Last Name</Label>
              <Input onChangeText={(lName) => this.setState({lName: lName})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Address</Label>
              <Input onChangeText={(address) => this.setState({address: address})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Contact Number</Label>
              <Input keyboardType='numeric' maxLength={11} onChangeText={(number) => this.setState({ContactNumber: number})}/>
            </Item>
            <ListItem onPress={() => this.setState({gender: 'Male', male: true, female: false})}>
                <Radio style={{paddingRight: 10}} selected={this.state.male} onPress={() => this.setState({gender: 'Male', male: true, female: false})}/>
                <TouchableOpacity >
                  <Text>Male</Text>  
                </TouchableOpacity>
            </ListItem>
            <ListItem onPress={() => this.setState({gender: 'Female', female: true, male: false})}>
                <Radio style={{paddingRight: 10}} selected={this.state.female} onPress={() => this.setState({gender: 'Male', male: true, female: false})} />
                <TouchableOpacity >
                  <Text>Female</Text>  
                </TouchableOpacity>
            </ListItem>
          </Form>
        </Content>
      </Container>
         <Container>
        <Content>
          <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
            <Text style={{fontSize: 14}}>Step 2. User creation Information</Text>
          </View>          
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({username: username})}/>
            </Item>
            <Item floatingLabel last success>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(password) => this.setState({password: password})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input secureTextEntry={true} onChangeText={(conPassword) => this.setState({confirmatoryPassword: conPassword})}/>
              <Icon style={{color: 'red'}} name={icon}/>
            </Item>
            <Item floatingLabel last>
              <Label>E-mail</Label>
              <Input onChangeText={(email) => this.setState({email: email})}/>
            </Item>
          </Form>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit.bind(this)}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Submit</Text>
          </TouchableOpacity>
        </Content>
      </Container>
      
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    margin: 15,
    padding: 15,
      backgroundColor: "#00BFFF",
      borderRadius: 10,
    }
})