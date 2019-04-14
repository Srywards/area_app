import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';

export class Home extends React.Component {

  render() {
    return (
      <View style={styles.wrapper}>
        <ImageBackground style={styles.container} source={require('../img/ui.jpg')}>
          <Text style={styles.header}>Area</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('LoginScreen')} title='SignUp'>
			      <Text style={styles.btntext}>Go to Log in</Text>
		      </TouchableOpacity>
		      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUpScreen')} title='SignUp'>
			      <Text style={styles.btntext}>No account ? Sign Up</Text>
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

export default Home;