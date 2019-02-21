import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";

class Reports extends Component {
	render(){
		/*Displaying all the Reports*/
		let reports = this.props.reports.map((report) => {
			return(
			 <Card key={report.id} id={report.id}>
	            <CardItem header bordered>
	              <Text>Customer: {report.fName} {report.lName}</Text>
	            </CardItem>
	            <CardItem header bordered>
	              <Text>Driver: {report.driver}</Text>
	            </CardItem>
	            <CardItem bordered>
	              <Body>
	               <Text>Time: {report.time}</Text>
	               <Text>location: {report.location}</Text>
	               <Text>destination: {report.destination}</Text>
	               <Text>price: {report.price}</Text>
	               <Text>Driver#: {report.contact}</Text>
	               <Text>Operator: {report.operatorName}</Text>
	               <Text>Operator#: {report.operatorContactNumber}</Text>
	              </Body>
	            </CardItem>
	            <CardItem footer bordered>
	              <Text>Transactions History</Text>
	            </CardItem>
	          </Card>
			)
		})
		return(
			<View style={styles.container}>
				<Container>
		        <Content padder>
		         {reports}
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

export default Reports;