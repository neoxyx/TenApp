import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, AsyncStorage, Alert } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, Icon } from 'react-native-elements';
import { Link } from '../../react-router.native';
import Api from '../../constans/Api';

let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
}

export default class Home extends Component {
	state = {
		fontsLoaded: false,
		first_name: '',
		last_name: ''
	};

	async getToken() {
		try {
			let userToken = await AsyncStorage.getItem("token");
			let data = JSON.parse(userToken);
			let dataUser = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'access-token': data
				}
			}

			fetch(Api.url + 'auth/me', dataUser)
				.then((response) => response.json())
				.then((responseJson) => {
					this.setState({
						first_name: JSON.stringify(responseJson.first_name),
						last_name: JSON.stringify(responseJson.last_name)
					})
				})
				.catch((error) => {
					Alert.alert(error);
				});
		} catch (error) {
			console.log("Something went wrong", error);
		}
	}

	async _loadFontAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	componentDidMount() {
		this._loadFontAsync();
		this.getToken();
	}
	render() {
		if (this.state.fontsLoaded) {
			return (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack}>
					<View style={styles.container}>
						<View style={styles.content}>
							<View style={styles.titleContainer}>
								<Icon name="home" color="gray" />
								<Text style={styles.textGray}>Incoming Dashboard</Text>
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
		flexDirection: "column"
	},
	content: {
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '90%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
		paddingLeft: 30,
	},
	titleContainer: {
		width: '100%'
	},
	imageBack: {
		flex: 1,
		resizeMode: "cover",
		height: 700
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: '50%',
		width: '100%',
		paddingHorizontal: 10,
	},
	textWhite: {
		color: '#fff',
		fontFamily: 'Roboto-Regular'
	},
	textGray: {
		color: 'gray',
		fontFamily: 'Roboto-Regular'
	},
	homeContainer: {
		padding: 23,
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
});