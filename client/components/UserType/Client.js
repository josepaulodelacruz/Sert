import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Radio, ListItem, Left, Icon } from 'native-base';

import Swiper from 'react-native-swiper';

export default class Client extends Component {
  constructor(){
    super();
    this.state = {
       fName: null,
       lName: null,
       address: null,
       ContactNumber: null,
       Male: false,
       Female: false,
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


  handleMaleReg = () => {
    this.setState({
      Male: true,
      Female: false
    })
  }

  handleFemaleReg = () => {
    this.setState({
      Female: true,
      Male: false
    })
  }

  /*Submit event, Check for unfill up textbox, comparison check, validation*/
  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    this.props.navigation.navigate('Login')
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
          <Form>
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
              <Input onChangeText={(number) => this.setState({ContactNumber: number})}/>
            </Item>
            <ListItem onPress={this.handleMaleReg}>
                <Radio style={{paddingRight: 10}} selected={this.state.Male} onPress={this.handleMaleReg}/>
                <TouchableOpacity >
                  <Text>Male</Text>  
                </TouchableOpacity>
            </ListItem>
            <ListItem onPress={this.handleFemaleReg}>
                <Radio style={{paddingRight: 10}} selected={this.state.Female} onPress={this.handleFemaleReg} />
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
              <Input onChangeText={(password) => this.setState({password: password})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input onChangeText={(conPassword) => this.setState({confirmatoryPassword: conPassword})}/>
              <Icon style={{color: 'red'}}name={icon}/>
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