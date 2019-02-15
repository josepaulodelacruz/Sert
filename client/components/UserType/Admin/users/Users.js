import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left } from "native-base";
import uuid from 'react-native-uuid';
import firebase from 'react-native-firebase';

class Users extends Component {

	handleDelete = (id) => {
		this.props.deleteDb(id)
	}

	render(){
		let users = this.props.clients.map((user) => {
			if(user.role === 'client' || user.role === null){
				if(this.props.search === null){
					return(
					<Card key={user.id} id={user.id}>
			            <CardItem header bordered>
			              <Text>{user.fName} { user.lName}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Address: {user.address}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Contact: {user.contact}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Rating: {user.rating}</Text>
			            </CardItem>
			            <CardItem footer bordered>
			              <Left/>
			              <Body/>
			              <Right>
			              	<TouchableOpacity style={styles.button} onPress={this.handleDelete.bind(this, user.id)}>
			              		<Text style={{color: 'white'}}>Delete</Text>
			              	</TouchableOpacity>
			              </Right>
			            </CardItem>
			          </Card>
					)
				}else if(this.props.search === user.fName || this.props.search === user.lName){
					return(
					<Card key={user.id} id={user.id}>
			            <CardItem header bordered>
			              <Text>{user.fName} { user.lName}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Address: {user.address}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Contact: {user.contact}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Rating: {user.rating}</Text>
			            </CardItem>
			            <CardItem footer bordered>
			              <Left/>
			              <Body/>
			              <Right>
			              	<TouchableOpacity style={styles.button} onPress={this.handleDelete.bind(this, user.id)}>
			              		<Text style={{color: 'white'}}>Delete</Text>
			              	</TouchableOpacity>
			              </Right>
			            </CardItem>
			          </Card>
					)
				}else if(this.props.search === user.contact){
					return(
					<Card key={user.id} id={user.id}>
			            <CardItem header bordered>
			              <Text>{user.fName} { user.lName}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Address: {user.address}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Contact: {user.contact}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Rating: {user.rating}</Text>
			            </CardItem>
			            <CardItem footer bordered>
			              <Left/>
			              <Body/>
			              <Right>
			              	<TouchableOpacity style={styles.button} onPress={this.handleDelete.bind(this, user.id)}>
			              		<Text style={{color: 'white'}}>Delete</Text>
			              	</TouchableOpacity>
			              </Right>
			            </CardItem>
			          </Card>
						)
					} else if(this.props.search === ''){
						return(
					<Card key={user.id} id={user.id}>
			            <CardItem header bordered>
			              <Text>{user.fName} { user.lName}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Address: {user.address}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Contact: {user.contact}</Text>
			            </CardItem>
			            <CardItem bordered>
			              <Text>Rating: {user.rating}</Text>
			            </CardItem>
			            <CardItem footer bordered>
			              <Left/>
			              <Body/>
			              <Right>
			              	<TouchableOpacity style={styles.button} onPress={this.handleDelete.bind(this, user.id)}>
			              		<Text style={{color: 'white'}}>Delete</Text>
			              	</TouchableOpacity>
			              </Right>
			            </CardItem>
			          </Card>
						)
					}
				
			}else{
				return false;
			}
		})
		return(
		 	<Content padder>
		 		{users}
			</Content>
		)
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
	  activeContainer: {
	    width: 30,
	    height: 30,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: 'white',
	    borderRadius: 15,
	  },
	  activeFill: {
	    width: 30,
	    height: 30,
	    borderRadius: 15,
	    backgroundColor: 'red',
	    transform: [{ scale: 0.6 }],
	  },
})

export default Users;