import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Right, Left } from "native-base";
import Transactions from './Transactions';
import Star from 'react-native-star-view';

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
					            <Left>
					            	<Text style={{fontSize: 12}}>{request.first} {request.last}</Text>
					            </Left>
					            <Body/>
					            <Right>
					            	<Star score={0} style={styles.starStyle} />
					            </Right>  
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