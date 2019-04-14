import React, { Component } from 'react';
import {Image, Alert, StyleSheet, Text, ImageBackground, TouchableOpacity, Linking, BackHandler, View, ScrollView} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import axios from 'axios';

export class ShowApplet extends React.Component {

	state = {
		scenarios: []
	};

	scenarios = [];

	CardScenarioList = props => (
		<View>
			{props.scenarios.map(scenarios => (
				<this.CardScenarioListItem {...scenarios} key={scenarios.Id} />
			))}
		</View>
	);

	CardScenarioListItem = ({
		ScenarioName,
		ServiceAction,
		ServiceReaction,
		ActionName,
		ReactionName
	}) => (
		<Card centered>
			<Text>{ScenarioName}</Text>
			<Text>Action : {ActionName}</Text>
			<Text>Reaction : {ReactionName}</Text>
			<TouchableOpacity style={styles.button} onPress={(event) => this.handleScenarioDeleteButton(event, ScenarioName)}>
				<Text style={styles.btntext}>Delete Scenario</Text>
			</TouchableOpacity>
		</Card>
	);

	handleScenarioDeleteButton(event, ScenarioName) {
		event.preventDefault();
		this.deleteScenario(ScenarioName);
	}

	deleteScenario(name) {
		var apiBaseUrl = 'http://' + global.ip + ':8080/api';
		axios.defaults.withCredentials = true;
		var payload = {
			scenarioName: name
		};
		axios
			.post(apiBaseUrl + '/deleteScenario', payload)
			.then(response => {
				if (response.status === 200) {
					Alert.alert(
						'Alert',
						`Delete scenario successfully`,
						[
						  {text: 'OK', onPress: () => console.log('OK Pressed')},
						],
					);
					console.log('Delete scenario successfully');
				} else {
					Alert.alert(
						'Alert',
						'Delete scenario failed',
						[
						  {text: 'OK', onPress: () => console.log('OK Pressed')},
						],
					);
					console.log('Delete scenario failed', response.status);
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	fillScenario(response, i) {
		this.scenarios.push({
			Id: i,
			ScenarioName: response.data[i].Name,
			ServiceAction: response.data[i].Action.serviceAction,
			ServiceReaction: response.data[i].Reaction.serviceReaction,
			ActionName: response.data[i].Action.Name,
			ReactionName: response.data[i].Reaction.Name
		});
		this.setState({
			scenarios: this.scenarios
		});
	}

	checkConnectionScenario(response) {
		let i = 0;

		while (i < response.data.length) {
				this.fillScenario(response, i);
				i++;
		}
	}

	getScenario() {
		axios.defaults.withCredentials = true;
		var apiBaseUrl = 'http://' + global.ip + ':8080/api';
		axios.get(apiBaseUrl + '/getScenarios')
		.then(response => {
		if (response.status === 200) {
			this.checkConnectionScenario(response);
		} else {
			console.log('Get scenario failed', response.status);
		}
		})
		.catch(error => {
			console.log(error);
		});
	}

	componentWillMount() {
		this.getScenario();
	}

	render() {
		return (
			<ImageBackground style={styles.container} source={require("../img/ui.jpg")}>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View style={styles.wrapper}>
						<this.CardScenarioList scenarios={this.scenarios} />
					</View>
  				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	contentContainer: {
		paddingVertical: 20
	},
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


export default ShowApplet;