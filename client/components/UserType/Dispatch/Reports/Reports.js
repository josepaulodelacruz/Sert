import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Icon, Left, Right } from "native-base";

class Reports extends Component {

	handleDetails = (report, id) => {
		this.props.details(report, id);
	}

	render(){
		let reports = this.props.reports.map((report) => {
			return(
				<Card key={report.id} id={report.id}>
		            <CardItem header bordered>
		              <Text>Customer: {report.fName} {report.lName}</Text>
		            </CardItem>
		            <CardItem >
		              <Text>Driver: {report.driver}</Text>
		            </CardItem>
		            <CardItem>
		              <Body>
		                <Text>
		                  Location: {report.location}
		                </Text>
		                <Text>
		                  Destination: {report.destination}
		                </Text>
		              </Body>
		            </CardItem>
		            <CardItem footer bordered>
		              <Left/>
		              <Right>
		              	<View style={{flex: 1, flexDirection: 'row'}}>
		              		<TouchableOpacity style={styles.button} onPress={this.handleDetails.bind(this, report, report.id)}>
		              			<Text style={{color: 'white'}}>Details</Text>
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
	          {reports}
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
})

export default Reports