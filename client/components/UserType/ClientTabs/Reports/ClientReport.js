import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right } from "native-base";

class ClientReport extends Component {

	handleReport = (report, id) => {
		this.props.feedback(report, id);
	}

	render(){
		let reports = this.props.reports.map((report) => {
			return(
				<Card key={report.id} id={report.id}>
		            <CardItem header bordered>
		              <Text>Receipt</Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>Driver: {report.driver}</Text>
		            </CardItem>
		            <CardItem bordered>
		              <Body>
		                <Text>Time: {report.time}</Text>
		                <Text>Location: {report.location}</Text>
		                <Text>Destination: {report.destination}</Text>
		                <Text>Price: {report.price}</Text>
		                <Text>Driver#: {report.contact}</Text>
		                <Text>Operator'Name: {report.operatorName}</Text>
		                <Text>Operator#: {report.operatorContactNumber}</Text>
		                <Text>Plate: {report.plate}</Text>
		                <Text>Conduction: {report.conduction}</Text>
		              </Body>
		            </CardItem>
		            <CardItem footer bordered>
		            	<Left>
		            		<Text>Transaction Details</Text>		
		            	</Left>
		            	<Body/>
		            	<Right>
		            		{report.report ? false : <TouchableOpacity style={styles.button} onPress={this.handleReport.bind(this, report, report.id)}>
		            									<Text style={{color: 'white'}}>Report</Text>
		            								</TouchableOpacity> }
		            		
		            	</Right>
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
})

export default ClientReport;