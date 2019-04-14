import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity} from 'react-native';

export class Connect extends React.Component {

	constructor(){
		super();
    global.ip = '';
    global.user= '';
    global.tokenname= '';
	      }

	      state = {
		ip: '',
	};

attributeip() {
  if (this.state.ip.length < 9)
  Alert.alert(
    'Alert',
    `The IP requires at least nine character\nFor example : localhost or 127.0.0.1`,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
  );
  else {
	  global.ip = this.state.ip;
    this.props.navigation.navigate('HomeScreen');
  }
}

  render() {
    return (
      <View style={styles.wrapper}>
        <ImageBackground style={styles.container} source={require('../img/ui.jpg')}>
          <Text style={styles.header}>Area</Text>
      	  <TextInput
	            placeholder='Server IP'
	            onChangeText={(ip) => this.setState({ip})}
              style={styles.textInput}
	            underlineColorAndroid={'transparent'}/>
          <TouchableOpacity style={styles.button} onPress={() =>  this.attributeip()}>
			    <Text style={styles.btntext}>Continue</Text>
	      </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  textInput: {
		alignSelf: 'stretch',
		padding: 20,
		backgroundColor: 'rgba(225, 255, 255, 0.8)',
		marginBottom: 20,
	},
  container: {
      flex: 1,
      alignSelf: 'stretch',
      width: null,
      justifyContent: 'center',
      alignItems: 'center',
  },
  header: {
      fontSize: 38,
      color: '#292929',
      fontWeight: 'bold',
      marginBottom: 80,
  },
  button: {
		alignSelf: 'stretch',
		marginTop: 20,
		backgroundColor: '#292929',
		alignItems: 'center',
    padding: 20,
	},
  btntext: {
		color: '#fff',
		fontSize: 16,
	},
});

export default Connect;