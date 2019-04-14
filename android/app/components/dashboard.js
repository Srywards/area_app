import React, { Component } from 'react';
import {Image, Alert, StyleSheet, Text, ImageBackground, TouchableOpacity, Linking, BackHandler} from 'react-native';
import axios from 'axios';
import parse from 'url-parse';

export class Dashboard extends React.Component {

	constructor(props) {
		super(props)
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	      }

	componentDidMount() {
		Linking.addEventListener('url', this._handleOpenURL);
	      }

	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleOpenURL);
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	      }

	handleBackButtonClick() {
		Alert.alert(
				'Alert',
				'Click on logout to go back.',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				);
		return true;
	}

	_handleOpenURL = async event => {
		url = parse(event.url, false);
		const token = url.query.split("?code=").join("");
		var apiBaseUrl = "http://" + global.ip + ":8080/api";
		await axios.post(apiBaseUrl + '/addToken', {'token': token, 'username': global.user, 'tokenName': global.tokenname})
		.then((response) => {
		global.tokenname = '';
		console.log(response);
		if (response.status === 200) {
			Alert.alert(
				'Alert',
				'Your are now connected to this service',
				[
					{text: 'OK', onPress: () => console.log('OK Pressed')},
				],
				);
		} else {
		console.log("error");
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

	RenderWebview(str) {
		global.tokenname = str.split('/')[3].trim();
		Linking.openURL("http://" + global.ip + ':8080' + str).catch((err) => console.error('An error occurred', err));
	}

	Logout() {
		global.user= '';
		global.tokenname= '';
		this.props.navigation.goBack(null);
	}

	render() {
		return (
		<ImageBackground style={styles.container} source={require('../img/ui.jpg')}>
		<TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.navigate('AppletScreen')}>
			<Text style={styles.btntext}>Add an applet</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.images} onPress={() => this.RenderWebview('/api/addToken/gmail')}>
			<Image style={styles.images} source={require('../img/gmail.png')} />
		</TouchableOpacity>
		<TouchableOpacity style={styles.images} onPress={() => this.RenderWebview('/api/addToken/spotify')}>
			<Image style={styles.images} source={require('../img/spotify.png')} />
		</TouchableOpacity>
		<TouchableOpacity style={styles.images} onPress={() => this.RenderWebview('/api/addToken/gdrive')}>
			<Image style={styles.images} source={require('../img/drive.png')} />
		</TouchableOpacity>
		<TouchableOpacity style={styles.images} onPress={() => this.RenderWebview('/api/addToken/reddit')}>
			<Image style={styles.images} source={require('../img/reddit.png')} />
		</TouchableOpacity>
		<TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.navigate('ShowAppletScreen')}>
			<Text style={styles.btntext}>Show my applets</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.button} onPress={() => this.Logout()}>
			<Text style={styles.btntext}>Logout</Text>
		</TouchableOpacity>
		</ImageBackground>
	    );
	  }
	}

	const styles = StyleSheet.create({
		images : {
			width : 80,
			height : 80,
			marginTop: 20,
			marginBottom: 20,

		},
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
		buttons: {
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

export default Dashboard;