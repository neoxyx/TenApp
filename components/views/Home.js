import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground, AsyncStorage, Alert } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Api from '../../constans/Api';
import { DrawerContent } from './DrawerContent';

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
const ScreenContainer = ({ children }) => (
	<View style={styles.container}></View>
);

export const Dashboard = () => (
	<ScreenContainer>
		<Text></Text>
	</ScreenContainer>
);
const DashboardStackScreen = ({ navigation }) => (
	<DashboardStack.Navigator>
		<DashboardStack.Screen name="Dashboard" component={Dashboard} options={{
			headerTintColor: 'white',
			headerBackground: () => (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
			),
			headerStyle: { backgroundColor: '#399998' },
			headerLeft: (props) => (
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</DashboardStack.Navigator>
);
export const DropOff = () => (
	<ScreenContainer>
		<Text></Text>
	</ScreenContainer>
);
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
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</DropOffStack.Navigator>
);
export const PickUp = () => (
	<ScreenContainer>
		<Text></Text>
	</ScreenContainer>
);
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
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</PickUpStack.Navigator>
);
export const History = () => (
	<ScreenContainer>
		<Text></Text>
	</ScreenContainer>
);
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
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</HistoryStack.Navigator>
);
export const More = () => (
	<ScreenContainer>
		<Text></Text>
	</ScreenContainer>
);
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
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()} />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</MoreStack.Navigator>
);
export const Settings = () => (
	<ScreenContainer>
		<Text></Text>
	</ScreenContainer>
);
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
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()} />
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
	state = {
		fontsLoaded: false
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
		height: 80
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
