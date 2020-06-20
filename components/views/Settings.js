import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Font from 'expo-font';

export class Settings extends Component {
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
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    headerContainer: {
        flexDirection: 'row'
    },
    textWhite: {
        color: '#fff',
        fontFamily: 'Roboto-Regular'
    },
    textblack: {
        color: 'black',
        fontFamily: 'Roboto-Regular'
    },
    textGray: {
        color: 'gray',
        fontFamily: 'Roboto-Regular'
    }
});