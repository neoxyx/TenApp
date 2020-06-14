import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Api from '../../constans/Api';

let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
}

class DashboardScreen extends Component {
	state = {
		fontsLoaded: false,
		first_name: '',
		last_name: '',
		visible: false,
	};
	_openMenu = () => this.setState({ visible: true });

	_closeMenu = () => this.setState({ visible: false });

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
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.textGray}>Home!</Text>
				</View>
			);
		} else {
			return <AppLoading />
		}
	}
}

class DropOffScreen extends Component {
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
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.textGray}>DropOff!</Text>
				</View>
			);
		} else {
			return <AppLoading />
		}
	}
}
class PickUpScreen extends Component {
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
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.textGray}>PickUp!</Text>
				</View>
			);
		} else {
			return <AppLoading />
		}
	}
}
class HistoryScreen extends Component {
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
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.textGray}>History!</Text>
				</View>
			);
		} else {
			return <AppLoading />
		}
	}
}
class MoreScreen extends Component {
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
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.textGray}>More!</Text>
				</View>
			);
		} else {
			return <AppLoading />
		}
	}
}
class SettingsScreen extends Component {
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
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.textGray}>Settings!</Text>
				</View>
			);
		} else {
			return <AppLoading />
		}
	}
}
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function Home() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Dashboard') {
							iconName = focused ? 'ios-home' : 'ios-home';
						} else if (route.name === 'DropOff') {
							iconName = focused ? 'ios-arrow-dropdown' : 'ios-arrow-dropdown';
						}
						else if (route.name === 'PickUp') {
							iconName = focused ? 'ios-arrow-dropup' : 'ios-arrow-dropup';
						}
						else if (route.name === 'History') {
							iconName = focused ? 'ios-recording' : 'ios-recording';
						}
						else if (route.name === 'More') {
							iconName = focused ? 'ios-more' : 'ios-more';
						}
						else if (route.name === 'Settings') {
							iconName = focused ? 'ios-list' : 'ios-list';
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
				})}
				tabBarOptions={{
					activeTintColor: 'gray',
					inactiveTintColor: 'white',
					activeBackgroundColor: '#00b7ea',
					inactiveBackgroundColor: '#00b7ea'
				}}
			>
				<Tab.Screen name="Dashboard" component={DashboardScreen} />
				<Tab.Screen name="DropOff" component={DropOffScreen} />
				<Tab.Screen name="PickUp" component={PickUpScreen} />
				<Tab.Screen name="History" component={HistoryScreen} />
				<Tab.Screen name="More" component={MoreScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
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
