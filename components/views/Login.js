import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, Input, Icon } from 'react-native-elements';
import { Link } from '../../react-router.native';
import { button as Button } from '../elements/Button';
import Api from '../../constans/Api';
import { Redirect } from 'react-router-dom';

let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
}

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			center: '',
			email: '',
			password: '',
			st: false,
			fontsLoaded: false,
		}
	}

	async _loadFontAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount = () => {
		this._loadFontAsync();
	}

	async storeToken(userToken) {
		try {
			await AsyncStorage.setItem("token", JSON.stringify(userToken));
		} catch (error) {
			console.log("Something went wrong", error);
		}
	}

	onLogin = () => {
		const { center, email, password } = this.state;
		let dataLogin = {
			method: 'POST',
			body: JSON.stringify({
				username: email,
				password: password,
				center: center
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}

		fetch(Api.url + 'auth/login', dataLogin)
			.then((response) => response.json())
			.then((responseJson) => {
				this.storeToken(responseJson.token);
				this.setState({ st: true });
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}

	render() {
		const { st } = this.state;
		if (st) {
			return <Redirect to={'/home'} />
		}
		if (this.state.fontsLoaded) {
			return (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack}>
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<Link to="/">
								<Icon name="arrow-back" color="#fff" />
							</Link>
							<Link to="/forgot-password">
								<Text style={styles.textWhite}>Forgot my password</Text>
							</Link>
						</View>
						<View style={styles.loginContainer}>
							<View style={styles.titleContainer}>
								<Text h3 style={styles.textWhite}>
									Log in
						</Text>
							</View>

							<View style={styles.componentContainer}>
								<Input value={this.state.center} type="text" placeholder="TEN CENTER" onChangeText={(center) => this.setState({ center })} inputContainerStyle={styles.input} inputStyle={styles.input} />
							</View>

							<View style={styles.componentContainer}>
								<Input value={this.state.email} type="text" placeholder="EMAIL ADDRESS" onChangeText={(email) => this.setState({ email })} inputContainerStyle={styles.input} inputStyle={styles.input} />
							</View>

							<View style={styles.componentContainer}>
								<Input value={this.state.password} type="password" placeholder="PASSWORD" onChangeText={(password) => this.setState({ password })} secureTextEntry={true} inputContainerStyle={styles.input} inputStyle={styles.input} />
							</View>

							<View style={styles.buttonContainer}>
								<Button buttonStyle={styles.button} title="Log In" onPress={this.onLogin} />
								<Link to="/choose-role">
									<Text style={{ fontFamily: 'Roboto-Regular' }}>Choose your role</Text>
								</Link>
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
	loginContainer: {
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
		marginBottom: 50,
	},
	componentContainer: {
		width: '100%',
		marginBottom: 30,
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
		marginBottom: 25,
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '5%',
		width: '100%',
		paddingHorizontal: 10,
	},
	textWhite: {
		color: '#fff',
		fontFamily: 'Roboto-Regular'
	},
	input: {
		color: '#fff',
		borderColor: '#fff',
	}
});
