import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Icon, Fab, Button } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoiamV5cGkiLCJhIjoiY2psOWIzMzhhMW1rcTNycWttcDIwYzU3aCJ9.mRXngxERf-Zth8ABFhNgag');


class Locator extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={15}
            centerCoordinate={[11.256, 43.770]}
            style={styles.container}>
        </Mapbox.MapView>
      </View>
    );
  }
}



export default class JoinTricycleRide extends React.Component {
	constructor(){
		super();
		this.state = {
			active: true
		};
	}
	
	bookRide = () => {
		alert('Book A Ride?');
	}

	render(){
		return(
			<View style={styles.container}>
			<View style={{paddingTop: 22, backgroundColor: '#111'}}>
				<StatusBar translucent={true} backgroundColor={'transparent'}/>
			</View>	
				<Header style={{backgroundColor: '#3073FA'}}>
					<Left>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}/>
					</Left>
					<Body>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Join Ride</Text>
					</Body>
					<Right/>
				</Header>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Locator/>
				</View>
				<View style={{ flex: 1 }}>
		          <Fab
		            active={this.state.active}
		            direction="up"
		            containerStyle={{ }}
		            style={{ backgroundColor: '#5067FF' }}
		            position="bottomRight"
		            onPress={this.bookRide.bind(this)}>
		             <Text>+</Text>
		          </Fab>
		        </View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})