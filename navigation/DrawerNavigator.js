import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from '@react-navigation/drawer';

/*import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';*/

import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH * 0.83,
    contentComponent: ({ navigation }) => {
        return <MenuDrawer navigation={navigation} />;
    },
};

const DrawerNavigator = createDrawerNavigator(
    {

    },
    DrawerConfig
);

export default createAppContainer(DrawerNavigator);