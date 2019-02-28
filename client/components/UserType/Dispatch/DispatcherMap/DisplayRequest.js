import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left } from "native-base";
import Transactions from './Transactions';
import Star from 'react-native-star-view';

class DisplayRequest extends Component {
	constructor(){
		super();
		this.state = {
			starRating: null
		}
	}

	handleSend = (id) => {
		this.props.coords(id);
	}

	handleDispatch = (transaction, request) => {
		this.props.dispatch(request, transaction);
	}


	render(){
		let id;
		let rating;
		let sumRequest;
		let requests = this.props.request.map((request) => {	
			if(request.id === id){
				return false;
			}else{
				id = request;
				if(!request.transactions){
					return false;
				}else{
					if(request.sent === false){
						return false;
					}else{
						if(request.role === 'client'){

							rating = parseInt(request.rating);
							sumRequest = parseInt(request.request);
							let n = sumRequest * 5;
							let total = rating/n;
							let star = 0;
							if(total <= 0.10){
								star = 0.5
							}else if(total <= 0.20){
								star = 1;
							}else if(total <= 0.30){
								star = 1.5;
							}else if(total <= 0.40){
								star = 2.0;
							}else if(total <= 0.50){
								star = 2.5
							}else if(total <= 0.60){
								star = 3.0
							}else if(total <= 0.70){
								star = 3.5
							}else if(total <= 0.80){
								star = 4.0
							}else if(total <= 0.90){
								star = 4.5
							}else if(total <= 1){
								star = 5
							}
							return(
							<Card key={request.id} id={request.id}>
				            <CardItem header bordered>
				            <Left>
				            	<Text style={{fontSize: 12}}>{request.first} {request.last}</Text>
				            </Left>
				            <Body/>
				            <Right>
				            	<Star score={star} style={styles.starStyle} />
				            </Right>  
				            </CardItem>
				                <Transactions dispatch={this.handleDispatch.bind(this, request)} transaction={request.transactions} id={request.id} coords={this.handleSend}/>
				          </Card>
							)
						}
					}
				}	
			}	
		})
		return(
			 <Container>
			 <Content padder>
	          {requests}
	          </Content>
	      </Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	starStyle: {
      width: 100,
      height: 20,		
	}
})


export default DisplayRequest;