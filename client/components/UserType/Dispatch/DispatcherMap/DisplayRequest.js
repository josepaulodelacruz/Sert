import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left } from "native-base";
import Transactions from './Transactions';

class DisplayRequest extends Component {

	handleSend = (id) => {
		this.props.coords(id);
	}

	handleDispatch = (transaction, request) => {
		this.props.dispatch(request, transaction);
	}


	render(){
		let id;
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
							if(request.approved === false){
								return(
								<Card key={request.id} id={request.id}>
					            <CardItem header bordered>
					              <Text style={{fontSize: 12}}>{request.first} {request.last}</Text>
					            </CardItem>
					                <Transactions dispatch={this.handleDispatch.bind(this, request)} transaction={request.transactions} id={request.id} coords={this.handleSend}/>
					          </Card>
								)
							}
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

export default DisplayRequest;