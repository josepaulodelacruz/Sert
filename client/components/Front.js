import React, { Component } from 'react';
import { View, 
     Text, 
     StyleSheet,
     ImageBackground,
     Animated,
     Button,
     ActivityIndicator } from 'react-native'; 
     import { withNavigation } from 'react-navigation';



import { UIActivityIndicator, DotIndicator, } from 'react-native-indicators';

class Front extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }
  static navigationOptions = {
    title: 'Welcome',
    color: '#blue',
    
  };

  // componentDidMount() {
  //   firebase.auth().signInAnonymously()
  //     .then(() => {
  //       this.setState({
  //         isAuthenticated: true,
  //       });
  //     }).catch((err) => {
  //       alert("Can't Connect to Server")
  //     })
  // }

  render(){
    // let loading;
    // if(this.state.isAuthenticated === true){
    //   loading = <Button style={{flex: 2}} title="CONTINUE =>" onPress={() => navigate('Login')}/>
    //   console.log(this.state.isAuthenticated)
    // }
    // }else{
    //   loading = <DotIndicator color="blue" size={9}/>
    // }
    return(
      <View style={styles.container}>
        <View style={styles.container}> 
          <Animated.View>
            <ImageBackground style={styles.posStyle} source={require('./Assets/SertLogo.jpg')}/>
          </Animated.View>
           <Button style={{flex: 2}} title="CONTINUE =>" onPress={() => this.props.navigation.navigate('Login')}/>
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

export default withNavigation(Front);