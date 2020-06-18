import React from 'react';
import { View, StyleSheet, Image, ImageBackground, Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Link } from '../../react-router.native';
import { button as Button, buttonOutlined as ButtonOutlined } from '../elements/Button';

let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
}

export default class CheckMethod extends React.Component {
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
				<View style={styles.container} >
					<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack}>
						<View style={styles.headerContainer}>
							<Link to="/login">
								<Text h4 style={styles.textWhite}>
									Log in
								</Text>
							</Link>
						</View>
						<View style={styles.content}>
							<View style={styles.imageContainer}>
								<Image style={styles.image} source={require('../../assets/img/logo.png')} />
							</View>

							<View style={styles.titleContainer}>
								<Text style={styles.title}>Welcome to Ten App</Text>
							</View>

							<View style={styles.buttonContainer}>
								<Button buttonStyle={styles.button} title="Continue with Gmail" />
								<ButtonOutlined buttonStyle={styles.button} titleStyle={styles.textWhite} title="Create Account" />
							</View>
						</View>
					</ImageBackground>
				</View>
			)
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
	imageBack: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		height: 1800
	},
	content: {
		padding: 23,
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'Roboto-Regular'
	},
	titleContainer: {
		width: '100%',
		marginBottom: 20
	},
	componentContainer: {
		width: '100%',
		marginBottom: 30,
	},
	buttonContainer: {
		width: '100%',
	},
	imageContainer: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 40,
	},
	image: {
		width: 200,
		height: 80,
	},
	button: {
		paddingVertical: 10,
		width: '100%',
		borderRadius: 8,
		textAlign: 'center',
		marginBottom: 10,
		fontFamily: 'Roboto-Regular'
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '5%',
		width: '100%',
		paddingHorizontal: 10,
	},
	textWhite: {
		color: '#fff',
		fontFamily: 'Roboto-Regular'
	},
});
