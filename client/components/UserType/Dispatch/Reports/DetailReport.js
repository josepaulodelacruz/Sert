import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";

class DetailReport extends Component {
	render(){
		console.log(this.props.navigation.state.params.report)
		return(
			<View style={styles.container}>
				<Container>
		        <Content padder>
		          <Card>
		            <CardItem header bordered>
		              <Text>Customer: {this.props.navigation.state.params.report.fName} {this.props.navigation.state.params.report.lName}</Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>Driver: {this.props.navigation.state.params.report.driver}</Text>
		            </CardItem>
		            <CardItem bordered>
		              <Body>
		                <Text>Location: {this.props.navigation.state.params.report.location}</Text>
		                <Text>Destination: {this.props.navigation.state.params.report.destination}</Text>
		                <Text>Price: {this.props.navigation.state.params.report.price}</Text>
		                <Text>Time: {this.props.navigation.state.params.report.time}</Text>
		                <Text>Driver#: {this.props.navigation.state.params.report.contact}</Text>
		                <Text>Operator's Name: {this.props.navigation.state.params.report.operatorName}</Text>
		                <Text>Operator#: {this.props.navigation.state.params.report.operatorContactNumber}</Text>
		                <Text>Client Rating: {this.props.navigation.state.params.report.rating}</Text>
		                <Text>Driver Rating: {this.props.navigation.state.params.report.dRating}</Text>
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

export default DetailReport;