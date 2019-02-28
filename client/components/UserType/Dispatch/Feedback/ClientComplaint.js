import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, H3 } from "native-base";


class ClientComplaint extends Component {
	render(){
		let feeds = this.props.clientFeed.map((feed) => {
			return(
				<Card key={feed.id} id={feed.id}>
		            <CardItem header bordered>
		              <Text>Complainanee: {feed.driver}</Text>
		            </CardItem>
		            <CardItem bordered>
		              <Body>
		                <Text>
		                  At the time <H3>{feed.time}</H3> the driver has a complain of {feed.feedback}
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

export default ClientComplaint;