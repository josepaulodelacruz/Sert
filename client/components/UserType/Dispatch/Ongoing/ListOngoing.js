import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right } from "native-base";

class ListOngoing extends Component {

	handleDetails(list, id){
		this.props.details(list, id);
	}

	handleDone(list,id){
		this.props.detailsId(list, id);
	}

	handleReport(list, id){
		this.props.feedback(list, id);
	}

	render(){
		let lists = this.props.ongoing.map((list) => {
			return(
				<Card key={list.id} id={list.id}>
	            <CardItem header bordered>
	              <Text>Customer: {list.fName} {list.lName}</Text>
	            </CardItem>
	            <CardItem >
	              <Text>Driver: {list.driver}</Text>
	            </CardItem>
	            <CardItem>
	              <Body>
	                <Text>
	                  Location: {list.location}
	                </Text>
	                <Text>
	                  Destination: {list.destination}
	                </Text>
	              </Body>
	            </CardItem>
	            <CardItem footer bordered>
	              <Left>
	              	<View style={{flex: 1}}>
	              		<TouchableOpacity style={styles.report} onPress={this.handleReport.bind(this, list, list.id)}>
	              			<Text style={{color: 'white'}}>Report</Text>
	              		</TouchableOpacity>	              		
	              	</View>
	              </Left>
	              <Right>
	              	<View style={{flex: 1, flexDirection: 'row'}}>
	              		<TouchableOpacity style={styles.button} onPress={this.handleDetails.bind(this, list, list.id)}>
	              			<Text style={{color: 'white'}}>Details</Text>
		              	</TouchableOpacity>
		              	<TouchableOpacity style={styles.button} onPress={this.handleDone.bind(this, list, list.id)}>
		              		<Text style={{color: 'white'}}>Done</Text>
		              	</TouchableOpacity>
		              </View>
	              </Right>
	            </CardItem>
	          </Card>
			)
		})
		return(
		 	<Container>
	        <Content padder>
	          {lists}
	        </Content>
	      </Container>
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
	    marginRight: 12,
	    alignItems: 'center',
	    backgroundColor: "#00BFFF",
	    borderRadius: 10,
	  },
	report: {
	    flexDirection: 'row',
	    padding: 8,
	    justifyContent: 'center',
	    marginRight: 12,
	    alignItems: 'center',
	    backgroundColor: "red",
	    borderRadius: 10,
	  },  
})

export default ListOngoing;