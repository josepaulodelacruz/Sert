import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import Displaydrivers from './AddDispatcher/Displaydrivers';
import firebase from 'react-native-firebase';
import { Header, Left, Body, Right, Icon, Container, Item, Input } from 'native-base';

class Driver extends Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
			isModalVisible: false
		}
	}
	static navigationOptions = {
          drawerIcon: ({ tintColor }) =>{
            return(
              <Icon name="bicycle" style={{fontSize: 24, color: "blue"}}/>
            );
        }   
    }

    componentDidMount(){
    	/*Retrieving data from the database*/
    	let userInfo = [];
    	 firebase.database().ref('Clients/').once('value',(snapshot) => {
       		snapshot.forEach((child) => {
			    userInfo.push({
			      id: child.key,
			      first: child.val().fName,
			      last: child.val().lName,
			      contact: child.val().contactNumber,
			      Toda: child.val().group,
			      address: child.val().address,
			      role: child.val().role
			    });
			  });
            this.setState({users: userInfo}); 
   		 })
    }

    handleDelete = (id) => {
    	/*Deletion of the display Data*/
    	let del = this.state.users;
		let index = del.findIndex(x => x.id === id);
		del.splice(index, 1);
		this.setState({users: del});
		/*Removing data from the database*/
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
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Drivers</Text>
					</Body>
					<Right/>
				</Header>
				<Container >
				<Item >
	              <Input onChangeText={(search) => this.setState({searching: search})} />
	              <TouchableOpacity onPress={this.handleSearch}>
	                <Icon name="ios-search"/>  
	              </TouchableOpacity>
	            </Item >
					<Displaydrivers drivers={this.state.users} onDelete={this.handleDelete.bind(this)} search={this.state.search}/>
				</Container>
			</View>		
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

export default Driver;