import React, { Component } from 'react';
import {Alert, StyleSheet, Text, ImageBackground, Linking, TextInput, TouchableOpacity} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import axios from 'axios';
import parse from 'url-parse';

export class SignUp extends React.Component {

	state = {
		username: '',
		password: '',
		confirmedPassword: '',
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
		await axios.post(apiBaseUrl + '/register/google', {'googleMail': mail})
		.then((response) => {
		console.log(response);
		if (response.status === 200) {
		console.log("Register Google sucess");
		Alert.alert(
			'Alert',
			'You can now login with your google account',
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		);
		} else {
		Alert.alert(
			'Alert',
			'Register failed',
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
				'You can now login with your google account',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed 2')},
				],
				);
		});
	}

	renderWebView() {
		Linking.openURL("http://" + global.ip + ':8080/auth/google/register').catch((err) => console.error('An error occurred', err));
	}

	validateForm(event) {
		if (this.state.username.length === 0)
		Alert.alert(
			'Alert',
			'The username requires at least one character',
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		      );
		else if (this.state.password.length < 8 &&
			 this.state.confirmedPassword.length < 8)
		Alert.alert(
			'Alert',
			'The password requires at least eight character',
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		      );
		else if (this.state.confirmedPassword != this.state.password)
		Alert.alert(
			'Alert',
			'The passwords must match',
			[
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
		      );
		else if (this.state.username.length > 0 && this.state.password.length > 0 && this.state.password.length >= 8 &&
		this.state.confirmedPassword.length >= 8 && this.state.confirmedPassword.length > 0 && this.state.confirmedPassword === this.state.password) {
			this.callRegisterEndpoint(event);
		}
	}

	callRegisterEndpoint(e) {
		e.preventDefault();
		var apiBaseUrl = "http://" + global.ip + ":8080/api";
		console.log(apiBaseUrl);
		var payload={
		  "username": this.state.username,
		  "password": this.state.password
		}
		axios.post(apiBaseUrl + '/register', payload)
		.then(function (response) {
		console.log('lol');
		console.log(response);
		if(response.status === 200){
		 console.log("Registration successfull");
		Alert.alert(
			'Alert',
			'You can now log in with your credentials',
			[
				{text: 'OK', onPress: () => console.log('Login Now')},
			],
			);
		} else {
		 console.log("Call Register failed", response.status);
		 Alert.alert(
			'Alert',
			'Account already exist or database is down',
			[
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			);
		 }
		 })
		 .catch(function (error) {
			 console.log(error);
			 Alert.alert(
				'Alert',
				'Account already exist, database is down or the IP adress is wrong',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
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
			secureTextEntry={true}
			style={styles.textInput}
			onChangeText={(password) => this.setState({password})}
			underlineColorAndroid={'transparent'}/>
		<TextInput
			clearButtonMode='always'
			placeholder='Confirm Password'
			secureTextEntry={true}
			style={styles.textInput}
			onChangeText={(confirmedPassword) => this.setState({confirmedPassword})}
			underlineColorAndroid={'transparent'}/>

		<TouchableOpacity style={styles.button} onPress={(event) => this.validateForm(event)}>
			<Text style={styles.btntext}>Sign Up</Text>
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
	}
});

export default SignUp;