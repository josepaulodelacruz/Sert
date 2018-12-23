import React, { Component } from 'react';
import { View, Text } from 'react-native';


class ClientPage extends Component {
	render(){
		return(
			<View>
				<Text>
					Client Page
					<DrawerComponent/>
				</Text>
			</View>
		)
	}
}

export default ClientPage;