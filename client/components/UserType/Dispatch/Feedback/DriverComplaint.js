import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, H3 } from "native-base";

class DriverComplaint extends Component {
	render(){
		let feeds = this.props.driverComplaint.map((feed) => {
			return(
				<Card key={feed.id} id={feed.id}>
		            <CardItem header bordered>
		              <Text>Complainant: {feed.driver}</Text>
		            </CardItem>
		            <CardItem header bordered>
		              <Text>Complainee: {feed.fName} {feed.lName} </Text>
		            </CardItem>
		            <CardItem bordered>
		              <Body>
		                <Text>
		                  At the time <H3>{feed.time}</H3> the driver complain is {feed.feedback} to the Complainee of Mr/Mrs. <H3>{feed.lName}</H3>
		                </Text>
		              </Body>
		            </CardItem>
		            <CardItem footer bordered>
		              <Text>Complaint Report</Text>
		            </CardItem>
	          </Card>
			)
		})
		return(
			<View>
				{feeds}
			</View>
		  
		)
	}
}

export default DriverComplaint;