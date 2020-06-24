import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, Input, Icon } from 'react-native-elements';
import { Link } from '../../react-router.native';
import { button as Button } from '../elements/Button';
import Api from '../../constans/Api';
import { Redirect } from 'react-router-dom';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import JwtDecode from 'jwt-decode';
import { set } from 'react-native-reanimated';

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
			centers: [],
			selectedValue: '',
			parent: false
		}
	}

	async _loadFontAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	GetCentersData = () => {
		fetch(Api.url + 'api/daycare')
			.then(response => response.json())
			.then(json => { this.setState({ centers: json }) })
	}

	componentDidMount = () => {
		this.GetCentersData();
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
				if (responseJson.token !== undefined) {
					var jwtDecode = require('jwt-decode');
					var token = responseJson.token;
					var decode = jwtDecode(token);
					this.setState({ parent: decode.parent });
					this.storeToken(responseJson.token)
					this.setState({ st: true });
				} else {
					Alert.alert('Debes ingresar datos validas en todos los campos');
				}
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}


	render() {
		if (this.state.st && this.state.parent) {
			return <Redirect to={'/parent'} />
		}
		if (this.state.st && !this.state.parent) {
			return <Redirect to={'/home'} />
		}
		if (this.state.fontsLoaded) {

			return (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack}>
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<Link to="/">
								<Icon name="arrow-back" color="#fff" size={50} />
							</Link>
							<Link to="/forgot-password">
								<Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'white' }}>Forgot my password</Text>
							</Link>
						</View>
						<View style={styles.content}>
							<View style={styles.formContainer}>
								<Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('5%'), color: 'white', paddingBottom: 50 }}>
									Log in
								</Text>
								<SearchableDropdown
									onTextChange={text => console.log(text)}
									onItemSelect={item => this.setState({ center: item.name })}
									//onItemSelect called after the selection from the dropdown
									containerStyle={{ paddingBottom: 40 }}
									//suggestion container style
									textInputStyle={{ color: 'white', fontSize: hp('2%'), paddingHorizontal: 8 }}
									itemStyle={
										//single dropdown item style
										styles.input
									}
									itemTextStyle={{
										//text style of a single dropdown item
										color: 'white',
										fontFamily: 'Roboto-Regular',
										fontSize: hp('2%'),
									}}
									items={this.state.centers}
									//mapping of item array
									defaultIndex={2}
									//default selected item index
									placeholder="CENTER NAME"
									//place holder for the search input
									resetValue={false}
								//To remove the underline from the android input
								/>
								<View style={styles.formInputs}>
									<Input value={this.state.email} type="text" placeholder="EMAIL ADDRESS" onChangeText={(email) => this.setState({ email })} inputContainerStyle={styles.input} inputStyle={styles.input} />
								</View>
								<View style={styles.formInputs}>
									<Input value={this.state.password} type="password" placeholder="PASSWORD" onChangeText={(password) => this.setState({ password })} secureTextEntry={true} inputContainerStyle={styles.input} inputStyle={styles.input} />
								</View>
								<View style={styles.buttonContainer}>
									<Button buttonStyle={styles.button} title="Log In" titleStyle={styles.textGmail} onPress={this.onLogin} />
								</View>
							</View>
						</View>
					</View>
				</ImageBackground >
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
		paddingTop: hp('1%')
	},
	content: {
		padding: hp('3%'),
		height: hp('80%'),
		flexDirection: 'column',
		display: 'flex',
		width: wp('100%'),
		justifyContent: 'space-around',
		alignContent: 'flex-start',
		flexWrap: 'wrap',
	},
	formInputs: {
		width: wp('85%'),
		paddingBottom: 30
	},
	imageBack: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		height: hp('100%')
	},
	formContainer: {
		alignItems: 'baseline',
		width: wp('30%'),
		height: hp('50%')
	},
	buttonContainer: {
		alignItems: 'center',
		width: wp('90%'),
		height: hp('50%')
	},
	button: {
		width: wp('30%'),
		height: hp('5%'),
		paddingVertical: hp('1%'),
		paddingHorizontal: wp('4%'),
		borderRadius: 5,
		marginBottom: hp('2.5%'),
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: hp('10%'),
		width: wp('100%'),
		paddingHorizontal: wp('2%'),
		paddingTop: hp('4%')
	},
	input: {
		color: '#fff',
		borderColor: '#fff',
		fontFamily: 'Roboto-Regular',
		fontSize: hp('2%')
	},
	textGmail: {
		color: '#399998',
		fontFamily: 'Roboto-Regular',
		fontSize: hp('3%')
	},
});
