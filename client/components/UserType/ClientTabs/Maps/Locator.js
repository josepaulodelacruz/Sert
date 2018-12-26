import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoiamV5cGkiLCJhIjoiY2psOWIzMzhhMW1rcTNycWttcDIwYzU3aCJ9.mRXngxERf-Zth8ABFhNgag');

class Locator extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Mapbox.MapView
		            styleURL={Mapbox.StyleURL.Street}
		            zoomLevel={15}
		            centerCoordinate={[11.256, 43.770]}
		            style={styles.container}>
        		</Mapbox.MapView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Locator;