import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Api from '../../constans/Api';

const DashboardStack = createStackNavigator();
const DropOffStack = createStackNavigator();
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
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()}
					title="Menu" />
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
				<Icon name="reorder" color="#fff" onPress={() => navigation.openDrawer()}
					title="Menu" />
			),
			headerRight: () => (
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			)
		}} />
	</DropOffStack.Navigator>
);
export const Profile = () => {
	return (
		<ScreenContainer>
			<Text>Profile</Text>
		</ScreenContainer>
	);
}
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
				<Icon name="list" color={color} size={size} />
			),
		}} />
	</Tabs.Navigator>
);
const Drawer = createDrawerNavigator();
export default class Home extends Component {
	render() {
		return (
			<NavigationContainer>
				<Drawer.Navigator>
					<Drawer.Screen name="Dashboard" component={TabsScreen} />
					<Drawer.Screen name="Profile" component={Profile} />
				</Drawer.Navigator>
			</NavigationContainer>
		);
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
		height: 60
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
});
