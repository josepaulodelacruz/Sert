import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Picker, ScrollView, Button} from 'react-native';

export default class Client extends Component {
	constructor(){
		super();
		this.state = {
			user: {
				firstName: '',
				middleName: '',
				lastName: '',
				contact: '',
				eMail: '',
				address: {
					blk: '',
					lot: '',
					phase: ''
				},
				username: '',
				password: '',
				rePassword: '',
				type: 'client'
			}
		}
	}

	static defaultProps = {
		Phases: ['Ph 1','Ph 2','Ph 3','Ph 4']
	};

	static navigationOptions = {
		title: 'Client Registration'
	}

	// Submit form
	handleSubmit = () => {
		const { firstName, middleName, lastName, contact, eMail, blk,lot,phase,username,password } = this.state;
		console.log(firstName, middleName, lastName, contact, eMail, blk,lot,phase,username,password, );
		if(firstName === '' && middleName === '' && lastName === '' && contact === '' && eMail === '' && blk === ''&& lot === '' && phase === ''&& username === '' && password === ''){
			alert('Please answer all the remaint text box');
		}
	}
	render(){
		const phases = this.props.Phases.map(ph => {
			return(
				<Picker.Item key={ph} label={ph} value={ph}/>
			)
		})
		return(
			<ScrollView>
				<View style={styles.container}>
					<View style={{flex: 1,flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
						<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
							<Text>
								First Name: 
							</Text>
							<TextInput
							onChangeText={(firstName) => this.setState({firstName})} 
							placeholder="Input First Name"
			 				style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>
						<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
							<Text>
								Middle Initial: 
							</Text>
							<TextInput
							onChangeText={(middleName) => this.setState({middleName})} 
							placeholder="Input Middle Initial"
			 				style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>	
						<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
							<Text>
								Last Name: 
							</Text>
							<TextInput 
							onChangeText={(lastName) => this.setState({lastName})}
							placeholder="Input Last Name"
			 				style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>
						<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
							<Text>
								Contact: 
							</Text>
							<TextInput 
							onChangeText={(contact) => this.setState({contact})}
							keyboardType='numeric'
							maxLength={11}  //setting limit of input
							placeholder="Input Contact"
			 				style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>
						<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
							<Text>
								E-mail: 
							</Text>
							<TextInput 
							onChangeText={(eMail) => this.setState({eMail})}
							placeholder="Input E-mail"
			 				style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>	
		
						<View style={{flexDirection: 'column', marginTop: 15, alignItems: 'center'}}>
							<Text>Address of the Carlton Residence</Text>
							<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
								<Text>BLK: </Text>
								<TextInput
								keyboardType='numeric'
								maxLength={2}
								onChangeText={(blk) => this.setState({blk})} 
								placeholder="Input Block"
				 				style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
							</View>
							<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
								<Text>LOT: </Text>
								<TextInput
								keyboardType='numeric'
								maxLength={2}
								onChangeText={(lot) => this.setState({lot})} 
								placeholder="Input Lot"
				 				style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
							</View>
							<Text>Select a phase</Text>
							<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
								<Text>Phase: </Text>
								<Picker selectedValue={this.state.phase}
								onValueChange={(itemValue, itemIndex) => this.setState({phase: itemValue})}
								style={{height: 50, width: 100}}>{phases}</Picker>
							</View>
						</View>
						{/*User Info*/}
						<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
							<Text>Username: </Text>
							<TextInput
							onChangeText={(username) => this.setState({username})} 
							placeholder="Input Username"
							style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>
					{/*Conditional display*/}
						<Text style={{textAlign: 'center'}}>Note:Conditional rendiring. Example User name has been taken</Text>
					{/*Password*/}
						<View style={{flexDirection: 'row', marginTop: 15, alignItems: 'center'}}>
							<Text>Password: </Text>
							<TextInput
							onChangeText={(password) => this.setState({password})}  
							placeholder="Input Password"
							style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>
					{/*Validity*/}
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{textAlign: 'center'}}>Re-type Password</Text>
						</View>
						<View style={{flexDirection: 'row', margin: 15, alignItems: 'center'}}>
							<Text>Password: </Text>
							<TextInput
							onChangeText={(rePassword) => this.setState({rePassword})}  
							placeholder="Re-type Password"
							style={{height: 40, width: '60%', backgroundColor: '#f2f2f2', borderColor: 'gray', borderWidth: 2, borderRadius: 20, textAlign: 'center'}}/>
						</View>
					</View>
					<View style={{marginBottom: 15}}>
						<Button title="Submit" onPress={this.handleSubmit}/>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	fontStyle: {
		fontSize: 14,
		fontWeight: 'bold',
		fontStyle: 'italic'
	}
})