import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, Input, Icon } from 'react-native-elements';
import { Link } from '../../react-router.native';
import { button as Button } from '../elements/Button';

let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
}

export default class ForgotPassword extends Component {
	state = {
		fontsLoaded: false,
	};
	async _loadFontAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	componentDidMount() {
		this._loadFontAsync();
	}
	render() {
		if (this.state.fontsLoaded) {
			return (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack}>

					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<Link to="/login">
								<Icon name="arrow-back" color="#fff" />
							</Link>
						</View>
						<View style={styles.formContainer}>
							<View style={styles.titleContainer}>
								<Text h3 style={styles.textWhite}>
									Forgot my password
							</Text>
							</View>

							<View style={styles.componentContainer}>
								<Input placeholder="TEN CENTER" inputContainerStyle={styles.input} inputStyle={styles.input} />
							</View>

							<View style={styles.componentContainer}>
								<Input placeholder="EMAIL ADDRESS" inputContainerStyle={styles.input} inputStyle={styles.input} />
							</View>

							<View style={styles.buttonContainer}>
								<Button buttonStyle={styles.button} title="Send Recovery Link" />
							</View>
						</View>
					</View>
				</ImageBackground>
			);
		} else {
			return <AppLoading />
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: 10
	},
	imageBack: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		height: 700
	},
	formContainer: {
		padding: 23,
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	titleContainer: {
		width: '100%',
		marginBottom: 80,
	},
	componentContainer: {
		width: '100%',
		marginBottom: 10,
	},
	buttonContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 8,
		fontFamily: 'Roboto-Regular'
	},
	headerContainer: {
		alignItems: 'flex-start',
		height: '5%',
		paddingHorizontal: 10,
	},
	textWhite: {
		color: '#fff',
		fontFamily: 'Roboto-Regular'
	},
	input: {
		color: '#fff',
		borderColor: '#fff',
	},
});
