import React, { Component } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContent } from './DrawerContent';
import { DropOff } from './parents/DropOff';
import { PickUp } from './parents/PickUp';
import { History } from './parents/History';
import { More } from './parents/More';
import { Settings } from './parents/Settings';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

let customFonts = {
    'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
}

const DropOffStack = createStackNavigator();
const PickUpStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const MoreStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const DropOffStackScreen = ({ navigation }) => (
    <DropOffStack.Navigator>
        <DropOffStack.Screen name=" " component={DropOff} options={{
            headerTintColor: 'white',
            headerBackground: () => (
                <ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
            ),
            headerStyle: { height: hp('10%') },
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <View style={{ paddingLeft: 30 }}>
                    <Icon name="reorder" size={hp('9%')} color="#fff" onPress={() => navigation.openDrawer()} />
                </View>
            ),
            headerRight: () => (
                <View style={{ paddingRight: 40 }}>
                    <Image style={styles.image} source={require('../../assets/img/logo.png')} />
                </View>
            )
        }} />
    </DropOffStack.Navigator>
);

const PickUpStackScreen = ({ navigation }) => (
    <PickUpStack.Navigator>
        <PickUpStack.Screen name=" " component={PickUp} options={{
            headerTintColor: 'white',
            headerBackground: () => (
                <ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
            ),
            headerStyle: { height: hp('10%') },
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <View style={{ paddingLeft: 30 }}>
                    <Icon name="reorder" size={hp('9%')} color="#fff" onPress={() => navigation.openDrawer()} />
                </View>
            ),
            headerRight: () => (
                <View style={{ paddingRight: 40 }}>
                    <Image style={styles.image} source={require('../../assets/img/logo.png')} />
                </View>
            )
        }} />
    </PickUpStack.Navigator>
);
const HistoryStackScreen = ({ navigation }) => (
    <HistoryStack.Navigator>
        <HistoryStack.Screen name=" " component={History} options={{
            headerTintColor: 'white',
            headerBackground: () => (
                <ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
            ),
            headerStyle: { height: hp('10%') },
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <View style={{ paddingLeft: 30 }}>
                    <Icon name="reorder" size={hp('9%')} color="#fff" onPress={() => navigation.openDrawer()} />
                </View>
            ),
            headerRight: () => (
                <View style={{ paddingRight: 40 }}>
                    <Image style={styles.image} source={require('../../assets/img/logo.png')} />
                </View>
            )
        }} />
    </HistoryStack.Navigator>
);
const MoreStackScreen = ({ navigation }) => (
    <MoreStack.Navigator>
        <MoreStack.Screen name=" " component={More} options={{
            headerTintColor: 'white',
            headerBackground: () => (
                <ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
            ),
            headerStyle: { height: hp('10%') },
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <View style={{ paddingLeft: 30 }}>
                    <Icon name="reorder" size={hp('9%')} color="#fff" onPress={() => navigation.openDrawer()} />
                </View>
            ),
            headerRight: () => (
                <View style={{ paddingRight: 40 }}>
                    <Image style={styles.image} source={require('../../assets/img/logo.png')} />
                </View>
            )
        }} />
    </MoreStack.Navigator>
);
const SettingsStackScreen = ({ navigation }) => (
    <SettingsStack.Navigator>
        <SettingsStack.Screen name=" " component={Settings} options={{
            headerTintColor: 'white',
            headerBackground: () => (
                <ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack} />
            ),
            headerStyle: { height: hp('10%') },
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <View style={{ paddingLeft: 30 }}>
                    <Icon name="reorder" size={hp('9%')} color="#fff" onPress={() => navigation.openDrawer()} />
                </View>
            ),
            headerRight: () => (
                <View style={{ paddingRight: 40 }}>
                    <Image style={styles.image} source={require('../../assets/img/logo.png')} />
                </View>
            )
        }} />
    </SettingsStack.Navigator>
);
const TabsScreen = () => (
    <Tabs.Navigator
        tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#399998',
            inactiveBackgroundColor: '#399998',
            style: { height: hp('12%') },
            labelPosition: 'below-icon',
            labelStyle: { fontFamily: 'Roboto-Regular', fontSize: hp('2.4%') }
        }}>
        <Tabs.Screen name="DropOff" component={DropOffStackScreen} options={{
            tabBarLabel: 'DropOff',
            tabBarIcon: ({ color, size }) => (
                <Icon name="child-care" color={color} size={hp('6%')} />
            ),
        }} />
        <Tabs.Screen name="Pickup" component={PickUpStackScreen} options={{
            tabBarLabel: 'Pickup',
            tabBarIcon: ({ color, size }) => (
                <Icon name="directions-car" color={color} size={hp('6%')} />
            ),
        }} />
        <Tabs.Screen name="History" component={HistoryStackScreen} options={{
            tabBarLabel: 'History',
            tabBarIcon: ({ color, size }) => (
                <Icon name="history" color={color} size={hp('6%')} />
            ),
        }} />
        <Tabs.Screen name="More" component={MoreStackScreen} options={{
            tabBarLabel: 'More',
            tabBarIcon: ({ color, size }) => (
                <Icon name="more-horiz" color={color} size={hp('6%')} />
            ),
        }} />
        <Tabs.Screen name="Settings" component={SettingsStackScreen} options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
                <Icon name="settings" color={color} size={hp('6%')} />
            ),
        }} />
    </Tabs.Navigator>
);
const Drawer = createDrawerNavigator();

export default class Parent extends Component {
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
                        <Drawer.Screen name="DropOff" component={TabsScreen} />
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
    imageBack: {
        flex: 1,
        resizeMode: "cover"
    },
    textWhite: {
        color: '#fff',
        fontFamily: 'Roboto-Regular'
    },
    textblack: {
        color: 'black',
        fontFamily: 'Roboto-Regular'
    },
    image: {
        width: wp('25%'),
        height: hp('5%')
    },
    profileImg: {
        width: wp('8%'),
        height: hp('8%'),
        borderRadius: 40,
        marginTop: 20
    }
});
