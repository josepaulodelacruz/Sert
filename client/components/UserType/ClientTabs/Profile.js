import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import StarRating from './Profile/StartRating';
import DataTransaction from './DataRecords/DataTransaction';
import { Container, Header, Content, Form, Item, Input, Label, Icon, Left, Body, Right} from 'native-base';
import firebase from 'react-native-firebase';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			userInfo: [],
			update: false,
			firs: null,
			last: null,
			number: null,
			locAddress: null
		}
	}
	static navigationOptions = {
		// Drawer Icon
		drawerIcon: ({tintColor}) => {
			return(
				<Icon name="person" style={{fontSize: 24, color: "blue"}}/>
			)
		}
	}

	componentDidMount(){
		/*Retrieving the currently login user*/
		let uid = firebase.auth().currentUser.uid;
		firebase.database().ref('Clients/' + uid ).on('value', snapshot => {
			this.setState({userInfo: snapshot.val()})
		})
		console.log(this.state.userInfo)
	}

	handleUpdate = () => {
		this.setState({update: true})
	}

	handleSubmit = () => {
		Alert.alert(
                'Update',
                'Personal Information?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                  	/*Updating the Personal Information of the Client*/
                  	if(!this.state.first && !this.state.last && !this.state.contactNumber && !this.state.locAddress){
                  		alert('Enter all needed information')
                  	}else{this.setState({update: false})
                    		let uid = firebase.auth().currentUser.uid;
							let info = firebase.database().ref('Clients/' + uid )
							info.update({ fName: this.state.first, lName: this.state.last, contactNumber: this.state.number, address: this.state.locAddress})
                  		}}, 
              		}
				],
                { cancelable: false }
              )
	}


	render(){
		let user;
		let button;
		if(this.state.update === true){
			user = 	<View style={{flex: 1, marginTop: 20, justifyContent: 'center' }}>
						<Item >
			              <Input placeholder={this.state.userInfo.fName} onChangeText={(firstName) => this.setState({first: firstName})}/>
			            </Item>
			            <Item >
			               <Input placeholder={this.state.userInfo.lName} onChangeText={(lastName) => this.setState({last: lastName})}/>
			            </Item>
			            <Item >
			              <Input placeholder={this.state.userInfo.contactNumber} onChangeText={(number) => this.setState({number: number})}/>
			            </Item>
			            <Item >
			              <Input placeholder={this.state.userInfo.address} onChangeText={(address) => this.setState({locAddress: address})}/>
			            </Item>
					</View>;

            button = <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
	            		<Text>Submit</Text>
	            	</TouchableOpacity>;
		}else{
			user = <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<Text style={styles.name}>{this.state.userInfo.fName} {this.state.userInfo.lName}</Text>
						<Text style={{fontSize: 18}}>Contact Number</Text>
						<Text style={styles.info}>{this.state.userInfo.contactNumber}</Text>
						<Text style={{fontSize: 18}}>Address</Text>
						<Text style={styles.description}>{this.state.userInfo.address}</Text>			
					</View>
				
		}
		return(
		<ScrollView>
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Profile</Text>
					</Body>
					<Right>
						<TouchableOpacity onPress={this.handleUpdate} style={styles.button}>
							<Text style={{color: 'white'}}>Update</Text>
						</TouchableOpacity>
					</Right>
				</Header>
	          <View style={styles.header}></View>
	          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
	          <View style={styles.body}>
	          <StarRating/>
	          	{user}
	            {button}
	            <DataTransaction/>
	        </View>
	      </View>
		</ScrollView>
			
		)
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	 header:{
    backgroundColor: "#00BFFF",
    height:200,
	  },
	  avatar: {
	    width: 130,
	    height: 130,
	    borderRadius: 63,
	    borderWidth: 4,
	    borderColor: "white",
	    marginBottom:10,
	    alignSelf:'center',
	    position: 'absolute',
	    marginTop:180
	  },
	  name:{
	    fontSize:22,
	    color:"#FFFFFF",
	    fontWeight:'600',
	  },
	  body:{
	    marginTop:40,
	  },
	  bodyContent: {
	    alignItems: 'center',
	  },
	  name:{
	    fontSize:28,
	    color: "#696969",
	    fontWeight: "600"
	  },
	  info:{
	    fontSize:16,
	    color: "#00BFFF",
	    marginTop:10
	  },
	  description:{
	    fontSize: 20,
	    color: "#696969",
	    marginTop:10,
	    textAlign: 'center'
	  },
	  buttonContainer: {
	    marginTop:10,
	    height:45,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
	    marginBottom:20,
	    width:250,
	    borderRadius:30,
	    backgroundColor: "#00BFFF",
	  },
	  button: {
	    flexDirection: 'row',
	    padding: 8,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
	  }
})

export default Profile;