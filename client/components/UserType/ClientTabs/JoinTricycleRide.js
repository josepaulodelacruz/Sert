import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Item, Label, Header, Text, Left, Body, Right, Icon, Fab, Button, CardItem, Card,Container,Content, Input } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';



export default class JoinTricycleRide extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			textRequest: 'No Available Requ'
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Request</Text>
					</Body>
					<Right/>
				</Header>
				<Content padder>
		          <Card>
		            <CardItem header >
		              <Left>
						<Icon name="navigate" style={styles.icon}/>
		              	<Text>Enter Specified Address</Text>
		              </Left>
		            </CardItem>
		            <CardItem >
		              <Body>
		              	<Label>Destination</Label>	              		
	              		<Item rounded>
			              <Input onChangeText={(Address) => this.setState({address: Address})} placeholder='Input Desired Destination'/>
			            </Item >
		              </Body>
		            </CardItem>
		            <CardItem>
		            	<Left/>
		            	<Body/>
		            	<Right>
	            			<TouchableOpacity style={styles.button} onPress={this.handleFind}>
								<Text style={{color: 'white'}}>Update</Text>
							</TouchableOpacity>
		            	</Right>
		            </CardItem>
		          </Card>
		        </Content>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	icon: {
		color: 'green'
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