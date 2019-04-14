import React, { Component } from "react";
import {
	Image,
	Alert,
	StyleSheet,
	Text,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Linking,
	BackHandler,
	FlatList,
	ListItem,
	View
} from "react-native";
import axios from "axios";
import parse from "url-parse";

import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "react-native-modal-datetime-picker";

import actions from "../components/service_actions";
import reactions from "../components/service_reactions";

const looper = [
	{ label: "15000", value: "15000", description: "15 sec" },
	{ label: "30000", value: "30000", description: "30 sec" },
	{ label: "60000", value: "60000", description: "1 minutes" },
	{ label: "120000", value: "120000", description: "2 minutes" },
	{ label: "300000", value: "300000", description: "5 minutes" }
];

export class Applet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scenarioName: "",
			scenarioAction: "",
			scenarioActionParams: "",
			scenarioReaction: "",
			scenarioReactionParams: "",
			selected_service: "",
			selected_actions: "",
			selected_reactions: "",
			timerDate: null,
			timerLoop: "",
			emailSender: "",
			emailReceiver: "",
			playlistname: "",
			trackName: "",
			successMessage: false
		};
		this.handleDate = this.handleDate.bind(this);
	}

	_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = date => {
		this.setState({
			timerDate: date,
			scenarioActionParams: date.getTime(),
		});
		this._hideDateTimePicker();
	};

	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	handleSubmit = () =>
		this.setState({
			selected_service: "",
			selected_actions: "",
			selected_reactions: "",
			timerDate: new Date(),
			emailSender: "",
			emailReceiver: "",
			scenarioName: "",
			scenarioActionParams: "",
			scenarioReactionParams: "",
			playlistname: "",
			trackName: ""
		});

	handleDate = date =>
		this.setState({
			timerDate: date,
			scenarioActionParams: date.getTime()
		});

	handleChangeOptions = (e, { name, value }) =>
		this.setState({
			[name]: value,
			scenarioActionParams: ""
		});

	handleChangeReactions = (e, { name, value }) =>
		this.setState({
			[name]: value,
			scenarioReactionParams: "",
			playlistname: "",
			trackName: ""
		});

	senderCreateService = event => {
		event.preventDefault();
		let successMessage = false;
		if (!(this.state.playlistname && this.state.trackName))
			var url = "http://" + global.ip + ":8080/api";

		var ScenarioContent = {
			scenarioName: this.state.scenarioName,
			serviceAction: actions[parseInt(this.state.selected_service)].label,
			scenarioAction:
				actions[parseInt(this.state.selected_service)].actions[this.state.selected_actions]
					.label,
			scenarioActionParams: this.state.scenarioActionParams,
			serviceReaction: reactions[parseInt(this.state.selected_reactions)].service,
			scenarioReaction: reactions[parseInt(this.state.selected_reactions)].label
		};
		if (this.state.playlistname && this.state.trackName)
			ScenarioContent.scenarioReactionParams =
				this.state.playlistname + "," + this.state.trackName;
		else ScenarioContent.scenarioReactionParams = this.state.scenarioReactionParams;
		if (ScenarioContent.scenarioAction.localeCompare("gmailReceiver") == 0) {
			ScenarioContent.scenarioActionParams =
				"subject:*" + ScenarioContent.scenarioActionParams;
		}
		axios
			.post(url + "/addScenario", ScenarioContent)
			.then(response => {
				if (response.status === 200) {
					alert("Creation of applet successful", response.status);
				} else {
					alert("Invalid creation of applet", response.status);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		const {
			selected_service,
			selected_actions,
			timerDate,
			selected_reactions,
			scenarioName,
			scenarioActionParams,
			scenarioReactionParams,
			playlistname,
			trackName
		} = this.state;

		return (
			<ImageBackground style={styles.container} source={require("../img/ui.jpg")}>
				<TextInput
					fluid
					required
					clearButtonMode="always"
					placeholder="scenario name"
					value={scenarioName}
					style={styles.textInput}
					onChangeText={scenarioName => this.setState({ scenarioName })}
				/>
				<RNPickerSelect
					placeholder={{}}
					items={actions}
					onValueChange={selected_service => this.setState({ selected_service })}
					style={pickerSelectStyles}
					value={this.state.selected_service}
				/>
				{selected_service.length > 0 ? (
					<RNPickerSelect
						placeholder={{}}
						items={actions[selected_service].actions}
						onValueChange={value => {
							this.setState({
								selected_actions: value,
								scenarioActionParams: ""
							});
						}}
						style={pickerSelectStyles}
						value={this.state.selected_actions}
					/>
				) : null}
				{!(selected_service && actions[parseInt(selected_service)].label).localeCompare(
					"gmail"
				) && !selected_actions.localeCompare("1") ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="Subject"
						value={scenarioActionParams}
						style={styles.textInput}
						onChangeText={scenarioActionParams =>
							this.setState({ scenarioActionParams })
						}
					/>
				) : null}

				{!(selected_service && actions[parseInt(selected_service)].label).localeCompare(
					"timer"
				) && !selected_actions.localeCompare("0") ? (
					<View style={pickerSelectStyles}>
						<TouchableOpacity onPress={this._showDateTimePicker}>
							<Text style={pickerSelectStyles}>Show DatePicker</Text>
						</TouchableOpacity>
						<DateTimePicker
							isVisible={this.state.isDateTimePickerVisible}
							onConfirm={this._handleDatePicked}
							onCancel={this._hideDateTimePicker}

						/>
					</View>
				) : null}

				{!(selected_service && actions[parseInt(selected_service)].label).localeCompare(
					"timer"
				) && !selected_actions.localeCompare("1") ? (
					<RNPickerSelect
						placeholder={{}}
						items={looper}
						onValueChange={value => {
							this.setState({
								scenarioActionParams: value
							});
						}}
						style={pickerSelectStyles}
						value={this.state.scenarioActionParams}
					/>
				) : null}

				{!(selected_service && actions[parseInt(selected_service)].label).localeCompare(
					"gdrive"
				) && !selected_actions.localeCompare("1") ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="name of file"
						value={scenarioActionParams}
						style={styles.textInput}
						onChangeText={scenarioActionParams =>
							this.setState({ scenarioActionParams })
						}
					/>
				) : null}
				{!(selected_service && actions[parseInt(selected_service)].label).localeCompare(
					"reddit"
				) && !selected_actions.localeCompare("1") ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="subredditName || empty"
						value={scenarioActionParams}
						style={styles.textInput}
						onChangeText={scenarioActionParams =>
							this.setState({ scenarioActionParams })
						}
					/>
				) : null}
				{selected_service.length > 0 ? (
					<RNPickerSelect
						placeholder={{}}
						items={reactions}
						onValueChange={value => {
							this.setState({
								selected_reactions: value
							});
						}}
						style={pickerSelectStyles}
						value={this.state.selected_reactions}
					/>
				) : null}
				{selected_reactions.localeCompare("1") == 0 ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="mail (ex: 'john@gmail.com')"
						value={scenarioReactionParams}
						style={styles.textInput}
						onChangeText={scenarioReactionParams =>
							this.setState({ scenarioReactionParams })
						}
					/>
				) : null}
				{!selected_reactions.localeCompare("2") ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="Name of playlist"
						value={scenarioReactionParams}
						style={styles.textInput}
						onChangeText={scenarioReactionParams =>
							this.setState({ scenarioReactionParams })
						}
					/>
				) : null}
				{!selected_reactions.localeCompare("3") ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="Name of playlist"
						value={playlistname}
						style={styles.textInput}
						onChangeText={playlistname => this.setState({ playlistname })}
					/>
				) : null}
				{!selected_reactions.localeCompare("3") && playlistname ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="Name of track"
						value={trackName}
						style={styles.textInput}
						onChangeText={trackName => this.setState({ trackName })}
					/>
				) : null}
				{!selected_reactions.localeCompare("4") ? (
					<TextInput
						fluid
						required
						clearButtonMode="always"
						placeholder="Name of file to delete"
						value={scenarioReactionParams}
						style={styles.textInput}
						onChangeText={scenarioReactionParams =>
							this.setState({ scenarioReactionParams })
						}
					/>
				) : null}
				<TouchableOpacity
					style={styles.button}
					onPress={event => this.senderCreateService(event)}
				>
					<Text style={styles.btntext}>Create scenario</Text>
				</TouchableOpacity>

				{console.log(JSON.stringify(this.state, null, 2))}
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	images: {
		width: 80,
		height: 80,
		marginTop: 20,
		marginBottom: 20
	},
	container: {
		flex: 1,
		alignSelf: "stretch",
		width: null,
		justifyContent: "center",
		alignItems: "center"
	},
	textInput: {
		alignSelf: "stretch",
		padding: 20,
		backgroundColor: "rgba(225, 255, 255, 0.8)",
		marginBottom: 20
	},
	button: {
		alignSelf: "stretch",
		marginTop: 20,
		backgroundColor: "#292929",
		alignItems: "center",
		padding: 20
	},
	buttons: {
		marginTop: 20,
		backgroundColor: "#292929",
		alignItems: "center",
		padding: 20
	},
	btntext: {
		color: "#fff",
		fontSize: 16
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: "#f0f",
		borderRadius: 8,
		color: "black",
		paddingRight: 30,
		backgroundColor: "rgba(225, 255, 255, 0.8)"
	}
});

export default Applet;
