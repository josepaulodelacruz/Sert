import React, { Component } from 'react';
import { View, 
     Text, 
     StyleSheet,
     ImageBackground,
     Animated,
     Button } from 'react-native';

class Front extends Component {
  static navigationOptions = {
    title: 'Welcome',
    color: '#blue',
    
  };

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <View style={styles.container}> 
          <Animated.View>
            <ImageBackground style={styles.posStyle} source={require('./Assets/SertLogo.jpg')}/>
          </Animated.View>
          <Button style={{flex: 2}} title="CONTINUE =>" onPress={() => navigate('Login')}/>
        </View>
        <Text style={{textAlign: 'center'}}>Sert Application Developed by the students of CITI Global College &copy; 2019</Text>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  posStyle: {
    width: 300,
    height: 300,
  }
})

export default Front;