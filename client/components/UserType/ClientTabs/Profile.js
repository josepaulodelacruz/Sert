import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import StarRating from './Profile/StartRating';
import DataTransaction from './DataRecords/DataTransaction';
import { Header, Left, Body, Right, Icon } from 'native-base';

class Profile extends Component {
	static navigationOptions = {
		// Drawer Icon
		drawerIcon: ({tintColor}) => {
			return(
				<Icon name="person" style={{fontSize: 24, color: "blue"}}/>
			)
		}
	}

	render(){
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
						<TouchableOpacity style={styles.button}>
							<Text style={{color: 'white'}}>Update</Text>
						</TouchableOpacity>
					</Right>
				</Header>
	          <View style={styles.header}></View>
	          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
	          <View style={styles.body}>
	          <StarRating/>
	            <View style={styles.bodyContent}>
	              <Text style={styles.name}>Jose Paulo Dela Cruz</Text>
	              <Text style={styles.info}>Contact Number: </Text>
	              <Text style={styles.description}>Blk 24 Lot 18 Ph 2 Agartha</Text>
	            </View>
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
	    flex: 1,
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
	    fontSize:16,
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