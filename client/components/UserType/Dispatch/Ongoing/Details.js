import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";

class Details extends Component {

	render(){
		return(
			<View style={styles.container}>
				<Container>
		        <Content padder>
		          <Card>
		            <CardItem header bordered>
		              <Text>Customer: {this.props.navigation.state.params.infoList.fName} {this.props.navigation.state.params.infoList.lName}</Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>Driver: {this.props.navigation.state.params.infoList.driver}</Text>
		            </CardItem>
		            <CardItem bordered>
		              <Body>
		                <Text>Location: {this.props.navigation.state.params.infoList.location}</Text>
		                <Text>Destination: {this.props.navigation.state.params.infoList.destination}</Text>
		                <Text>Price: {this.props.navigation.state.params.infoList.price}</Text>
		                <Text>Time: {this.props.navigation.state.params.infoList.time}</Text>
		                <Text>Driver#: {this.props.navigation.state.params.infoList.contact}</Text>
		                <Text>Operator's Name: {this.props.navigation.state.params.infoList.operatorName}</Text>
		                <Text>Operator#: {this.props.navigation.state.params.infoList.operatorContactNumber}</Text>
		                <Text>Client Rating: {this.props.navigation.state.params.infoList.rating}</Text>
		                <Text>Driver Rating: {this.props.navigation.state.params.infoList.dRating}</Text>
		              </Body>
		            </CardItem>
		            <CardItem footer bordered>
		              <Text>Transactions Details</Text>
		            </CardItem>
		          </Card>
		        </Content>
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

export default Details