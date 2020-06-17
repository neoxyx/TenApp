import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, AsyncStorage, Alert } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Icon, Card, Text, ListItem } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Api from '../../constans/Api';
import { DrawerContent } from './DrawerContent';
import {
	Avatar
} from 'react-native-paper';

let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
}

const DashboardStack = createStackNavigator();
const DropOffStack = createStackNavigator();
const PickUpStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const MoreStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			coming: [],
			process: [],
			registered: []
		}
	}

	async _loadFontAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	async getComing() {
		let userToken = await AsyncStorage.getItem("token");
		let data = JSON.parse(userToken);
		let dataMe = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'access-token': data
			}
		}

		fetch(Api.url + 'api/protocols/1/status/1', dataMe)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ coming: responseJson });
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}
	async getProcess() {
		let userToken = await AsyncStorage.getItem("token");
		let data = JSON.parse(userToken);
		let dataMe = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'access-token': data
			}
		}

		fetch(Api.url + 'api/protocols/1/status/2', dataMe)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ process: responseJson });
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}
	async getRegistered() {
		let userToken = await AsyncStorage.getItem("token");
		let data = JSON.parse(userToken);
		let dataMe = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'access-token': data
			}
		}

		fetch(Api.url + 'api/protocols/1/status/3', dataMe)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ registered: responseJson });
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}
	componentDidMount() {
		this._loadFontAsync();
		this.getComing();
		this.getProcess();
		this.getRegistered();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<View style={styles.headerContainer}>
						<Icon name="home" size={38} color="gray" /><Text h3 style={styles.textGray}>Incoming Dashboard</Text>
					</View>
				</View>
				<View>
					<Card title="Coming">
						{
							this.state.coming.map((u, i) => {
								return (
									<View key={i} style={styles.headerContainer}>
										<Avatar.Image
											source={{ uri: u.child.pucture }}
											size={50}
										/>
										<Text h5 style={{ fontFamily: 'Roboto-Regular', paddingLeft: 20 }} >{u.child.fname + ' ' + u.child.lname + '\n ESTIMATE TIME ' + u.eta + ' MIN'}</Text>
									</View>
								);
							})
						}
					</Card>
					<Card title="In Process">
						{
							this.state.process.map((u, i) => {
								return (
									<View key={i} style={styles.headerContainer}>
										<Avatar.Image
											source={{ uri: u.child.pucture }}
											size={50}
										/>
										<Text h5 >{u.child.fname + ' ' + u.child.lname + '\n ESTIMATE TIME ' + u.eta + ' MIN'}</Text>
									</View>
								);
							})
						}
					</Card>
					<Card title="Registered">
						{
							this.state.registered.map((u, i) => {
								return (
									<View key={i} style={styles.headerContainer}>
										<Avatar.Image
											source={{ uri: u.child.pucture }}
											size={50}
										/>
										<Text h5 >{u.child.fname + ' ' + u.child.lname + '\n ESTIMATE TIME ' + u.eta + ' MIN'}</Text>
									</View>
								);
							})
						}
					</Card>
				</View>
			</View >
		);
	}

}
const DashboardStackScreen = ({ navigation }) => (
	<DashboardStack.Navigator>
		<DashboardStack.Screen name="Dashboard" component={Dashboard} options={{
			headerTintColor: 'white',
			headerBackground: () => (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
			),
			headerStyle: { backgroundColor: '#399998' },
			headerLeft: (props) => (
				<Icon name="reorder" size={38} color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</DashboardStack.Navigator>
);
class DropOff extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			coming: [],
			inProcess: [],
			droppedOff: []
		}
	}

	async _loadFontAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	async getComing() {
		let userToken = await AsyncStorage.getItem("token");
		let data = JSON.parse(userToken);
		let dataMe = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'access-token': data
			}
		}

		fetch(Api.url + 'api/protocols/2/status/1', dataMe)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ coming: responseJson });
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}
	async getInProcess() {
		let userToken = await AsyncStorage.getItem("token");
		let data = JSON.parse(userToken);
		let dataMe = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'access-token': data
			}
		}

		fetch(Api.url + 'api/protocols/2/status/2', dataMe)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ inProcess: responseJson });
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}
	async getDroppedOff() {
		let userToken = await AsyncStorage.getItem("token");
		let data = JSON.parse(userToken);
		let dataMe = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'access-token': data
			}
		}

		fetch(Api.url + 'api/protocols/2/status/3', dataMe)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ droppedOff: responseJson });
			})
			.catch((error) => {
				Alert.alert(error);
			});
	}
	componentDidMount() {
		this._loadFontAsync();
		this.getComing();
		this.getInProcess();
		this.getDroppedOff();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<View style={styles.headerContainer}>
						<Icon name="home" size={38} color="gray" /><Text h3 style={styles.textGray}>Outcoming Dashboard</Text>
					</View>
				</View>
				<View>
					<Card title="Coming">
						{
							this.state.coming.map((u, i) => {
								return (
									<View key={i} style={styles.headerContainer}>
										<Avatar.Image
											source={{ uri: u.child.pucture }}
											size={50}
										/>
										<Text h5 style={{ fontFamily: 'Roboto-Regular', paddingLeft: 20 }} >{u.child.fname + ' ' + u.child.lname + '\n ESTIMATE TIME ' + u.eta + ' MIN'}</Text>
									</View>
								);
							})
						}
					</Card>
					<Card title="In Process">
						{
							this.state.inProcess.map((u, i) => {
								return (
									<View key={i} style={styles.headerContainer}>
										<Avatar.Image
											source={{ uri: u.child.pucture }}
											size={50}
										/>
										<Text h5 >{u.child.fname + ' ' + u.child.lname + '\n ESTIMATE TIME ' + u.eta + ' MIN'}</Text>
									</View>
								);
							})
						}
					</Card>
					<Card title="Registered">
						{
							this.state.droppedOff.map((u, i) => {
								return (
									<View key={i} style={styles.headerContainer}>
										<Avatar.Image
											source={{ uri: u.child.pucture }}
											size={50}
										/>
										<Text h5 >{u.child.fname + ' ' + u.child.lname + '\n ESTIMATE TIME ' + u.eta + ' MIN'}</Text>
									</View>
								);
							})
						}
					</Card>
				</View>
			</View >
		);
	}
}
const DropOffStackScreen = ({ navigation }) => (
	<DropOffStack.Navigator>
		<DropOffStack.Screen name="Dropoff" component={DropOff} options={{
			headerTintColor: 'white',
			headerBackground: () => (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
			),
			headerStyle: { backgroundColor: '#399998' },
			headerBackTitleVisible: false,
			headerLeft: (props) => (
				<Icon name="reorder" size={38} color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</DropOffStack.Navigator>
);
function PickUp({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>PickUp</Text>
		</View>
	);
}
const PickUpStackScreen = ({ navigation }) => (
	<PickUpStack.Navigator>
		<PickUpStack.Screen name="Pickup" component={PickUp} options={{
			headerTintColor: 'white',
			headerBackground: () => (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
			),
			headerStyle: { backgroundColor: '#399998' },
			headerBackTitleVisible: false,
			headerLeft: (props) => (
				<Icon name="reorder" size={38} color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</PickUpStack.Navigator>
);
function History({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>History</Text>
		</View>
	);
}
const HistoryStackScreen = ({ navigation }) => (
	<HistoryStack.Navigator>
		<HistoryStack.Screen name="History" component={History} options={{
			headerTintColor: 'white',
			headerBackground: () => (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
			),
			headerStyle: { backgroundColor: '#399998' },
			headerBackTitleVisible: false,
			headerLeft: (props) => (
				<Icon name="reorder" size={38} color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</HistoryStack.Navigator>
);
function More({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>More</Text>
		</View>
	);
}
const MoreStackScreen = ({ navigation }) => (
	<MoreStack.Navigator>
		<MoreStack.Screen name="More" component={More} options={{
			headerTintColor: 'white',
			headerBackground: () => (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
			),
			headerStyle: { backgroundColor: '#399998' },
			headerBackTitleVisible: false,
			headerLeft: (props) => (
				<Icon name="reorder" size={38} color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</MoreStack.Navigator>
);
function Settings({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Settings</Text>
		</View>
	);
}
const SettingsStackScreen = ({ navigation }) => (
	<SettingsStack.Navigator>
		<SettingsStack.Screen name="Settings" component={Settings} options={{
			headerTintColor: 'white',
			headerBackground: () => (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
			),
			headerStyle: { backgroundColor: '#399998' },
			headerBackTitleVisible: false,
			headerLeft: (props) => (
				<Icon name="reorder" size={38} color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</SettingsStack.Navigator>
);
const TabsScreen = () => (
	<Tabs.Navigator tabBarOptions={{
		activeTintColor: 'gray',
		inactiveTintColor: 'white',
		activeBackgroundColor: '#399998',
		inactiveBackgroundColor: '#399998'
	}}>
		<Tabs.Screen name="Dashboard" component={DashboardStackScreen} options={{
			tabBarLabel: 'Dashboard',
			tabBarIcon: ({ color, size }) => (
				<Icon name="home" color={color} size={size} />
			),
		}} />
		<Tabs.Screen name="DropOff" component={DropOffStackScreen} options={{
			tabBarLabel: 'DropOff',
			tabBarIcon: ({ color, size }) => (
				<Icon name="child-care" color={color} size={size} />
			),
		}} />
		<Tabs.Screen name="Pickup" component={PickUpStackScreen} options={{
			tabBarLabel: 'Pickup',
			tabBarIcon: ({ color, size }) => (
				<Icon name="directions-car" color={color} size={size} />
			),
		}} />
		<Tabs.Screen name="History" component={HistoryStackScreen} options={{
			tabBarLabel: 'History',
			tabBarIcon: ({ color, size }) => (
				<Icon name="history" color={color} size={size} />
			),
		}} />
		<Tabs.Screen name="More" component={MoreStackScreen} options={{
			tabBarLabel: 'More',
			tabBarIcon: ({ color, size }) => (
				<Icon name="more-horiz" color={color} size={size} />
			),
		}} />
		<Tabs.Screen name="Settings" component={SettingsStackScreen} options={{
			tabBarLabel: 'Settings',
			tabBarIcon: ({ color, size }) => (
				<Icon name="settings" color={color} size={size} />
			),
		}} />
	</Tabs.Navigator>
);
const Drawer = createDrawerNavigator();
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
				<NavigationContainer>
					<Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
						<Drawer.Screen name="Dashboard" component={TabsScreen} />
					</Drawer.Navigator>
				</NavigationContainer>
			);
		} else {
			return (
				<AppLoading />
			)
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
		height: 65
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
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
		padding: 30,
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	image: {
		width: 75,
		height: 30,
	},
	profileImg: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginTop: 20
	}
});
