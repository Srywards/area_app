import React, { Component } from 'react';
import {Alert, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity, Linking} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import axios from 'axios';
import parse from 'url-parse';

class Login extends React.Component {

	state = {
		username: '',
		password: '',
	};

	componentDidMount() {
		Linking.addEventListener('url', this._handleOpenURL);
	      }

	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleOpenURL);
	      }

	_handleOpenURL = async event => {
		url = parse(event.url, false);
		const mail = url.query.split("?code=").join("");
		var apiBaseUrl = "http://" + global.ip + ":8080/api";
		await axios.post(apiBaseUrl + '/login/google', {'googleMail': mail})
		.then((response) => {
		if (response.status === 200) {
		console.log("Login Google sucess");
		global.user = mail;
		this.props.navigation.navigate('DashboardScreen')
		} else {
		Alert.alert(
			'Alert',
			'Register first to login with your google account',
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		      );
		console.log("Login Google failed");
		      }
		})
		.catch((error) => {
			console.log(error);
			Alert.alert(
				'Alert',
				'This account doesn\'t exist or the database is down',
				[
					{text: 'Retry', onPress: () => console.log('Retry Pressed')},
				],
				);
		});
	}

	renderWebView() {
		Linking.openURL("http://" + global.ip + ':8080/auth/google/login').catch((err) => console.error('An error occurred', err));
	}

	validateForm(event) {
		if (this.state.password.length < 8)
		Alert.alert(
			'Alert',
			'The password requires at least eight character',
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		      );
		else if (this.state.username.length === 0)
		Alert.alert(
			'Alert',
			'The username requires at least one character',
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		      );
		else if (this.state.username.length > 0 && this.state.password.length >= 8)
			this.callLoginEndpoint(event);
		return false;
	}

	callLoginEndpoint = async event => {
		event.preventDefault();
		var apiBaseUrl = "http://" + global.ip + ":8080/api";
		var payload = {
			"username": this.state.username,
			"password": this.state.password
		}
		await axios.post(apiBaseUrl + '/login', payload)
		.then((response) => {
		if (response.status === 200) {
		console.log("Login successfull");
		global.user = this.state.username;
		this.props.navigation.navigate('DashboardScreen')
		} else {
			console.log("Call Login failed", response.status);
			Alert.alert(
				'Alert',
				'This account doesn\'t exist or the database is down',
				[
					{text: 'Retry', onPress: () => console.log('OK Pressed')},
				],
				);
			}
			})
		.catch((error) => {
			console.log(error);
			Alert.alert(
				'Alert',
				'This account doesn\'t exist or the database is down',
				[
					{text: 'Retry', onPress: () => console.log('OK Pressed')},
				],
				);
		});
	}

  render() {
	return (
		<ImageBackground style={styles.container} source={require('../img/ui.jpg')}>
		<TextInput
			clearButtonMode='always'
			placeholder='Name'
			onChangeText={(username) => this.setState({username})}
			style={styles.textInput}
			underlineColorAndroid={'transparent'}/>
		<TextInput
			clearButtonMode='always'
			placeholder='Password'
			onChangeText={(password) => this.setState({password})}
			secureTextEntry={true}
			style={styles.textInput}
			underlineColorAndroid={'transparent'}/>
		<TouchableOpacity style={styles.button} onPress={(event) => this.validateForm(event)}>
			<Text style={styles.btntext}>Log in</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUpScreen')} title='SignUp'>
			<Text style={styles.btntext}>No account already ? Sign Up !</Text>
		</TouchableOpacity>
		<GoogleSigninButton
    			style={{ width: 192, height: 60 }}
    			size={GoogleSigninButton.Size.Wide}
    			color={GoogleSigninButton.Color.Light}
    			onPress={this.renderWebView}
    			disabled={this.state.isSigninInProgress} />
		</ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textInput: {
		alignSelf: 'stretch',
		padding: 20,
		backgroundColor: 'rgba(225, 255, 255, 0.8)',
		marginBottom: 20,
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
	signup: {
		color: '#fff',
		fontSize: 16,
	}
});

export default Login;