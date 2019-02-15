import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Icon, Container, Item, Input } from 'native-base';
import firebase from 'react-native-firebase';
import uuid from 'react-native-uuid';
import Users from './users/Users';

let users;
class User extends Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
			searching: null,
		}
	}
	static navigationOptions = {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="person" style={{fontSize: 24, color: "blue"}}/>
            );
        }   
    }

    componentWillMount(){
    	let userInfo = [];
    	 firebase.database().ref('Clients/').once('value',(snapshot) => {
       		snapshot.forEach((child) => {
			    userInfo.push({
			      id: child.key,
			      fName: child.val().fName,
			      lName: child.val().lName,
			      contact: child.val().contactNumber,
			      address: child.val().address,
			      rating: child.val().rating,
			      role: child.val().role
			    });
			  });
            this.setState({users: userInfo}); 
   		 })
    }


    handleDelete = (id) => {
    	let del = this.state.users;
		let index = del.findIndex(x => x.id === id);
		del.splice(index, 1);
		this.setState({users: del});
		
    	firebase.database().ref('Clients/').child('' + id).remove()
    }


	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Users</Text>
					</Body>
					<Right>
						<Item >
			              <Input onChangeText={(search) => this.setState({searching: search})} />
			              <TouchableOpacity onPress={this.handleSearch}>
			                <Icon name="ios-search"/>  
			              </TouchableOpacity>
			            </Item >
					</Right>
				</Header>
				<Container>
					<Users clients={this.state.users} search={this.state.searching} deleteDb={this.handleDelete.bind(this)}/>
				</Container>
			</View>
		)
	}
}

	
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default User;