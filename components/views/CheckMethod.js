import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, Text, ScrollView, Dimensions } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Link } from '../../react-router.native';
import { button as Button, buttonOutlined as ButtonOutlined } from '../elements/Button';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
	'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
}
export default class CheckMethod extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orientation: '',
			fontsLoaded: false
		}
	}
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
						<ScrollView>
							<View style={styles.headerContainer}>
								<Link to="/login">
									<Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('4%'), fontWeight: '300', color: 'white' }}>
										Log in
								</Text>
								</Link>
							</View>
							<View style={styles.content}>
								<View style={styles.buttonContainer}>
									<Image style={styles.image} source={require('../../assets/img/logo.png')} />
									<Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3.5%'), color: 'white', paddingTop: 30, paddingBottom: 30 }}> Welcome to Ten App</Text>
									<Button buttonStyle={styles.button} titleStyle={styles.textGmail} title="Continue with Gmail" />
									<ButtonOutlined buttonStyle={styles.button} titleStyle={styles.textCreateAccount} title="Create Account" />
								</View>
							</View>
						</ScrollView>
					</ImageBackground>
				</View >

			)
		} else {
			return <AppLoading />
		}
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: 'center'
	},
	imageBack: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		height: '100%'
	},
	content: {
		padding: hp('2.3%'),
		height: hp('85%'),
		flexDirection: 'row',
		display: 'flex',
		width: wp('100%'),
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	buttonContainer: {
		alignItems: 'center',
		width: wp('100%'),
		height: hp('50%')
	},
	image: {
		width: 175,
		height: 70
	},
	button: {
		paddingVertical: hp('1%'),
		width: wp('50%'),
		height: hp('7%'),
		borderRadius: 8,
		textAlign: 'center',
		marginBottom: hp('1.0%'),
		fontFamily: 'Roboto-Regular'
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: hp('5%'),
		width: wp('100%'),
		paddingHorizontal: wp('2%'),
		paddingTop: hp('4%')
	},
	textCreateAccount: {
		color: '#fff',
		fontFamily: 'Roboto-Regular',
		fontSize: hp('2.5%')
	},
	textGmail: {
		color: '#399998',
		fontFamily: 'Roboto-Regular',
		fontSize: hp('2.5%')
	},
});
