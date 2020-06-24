import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Card, Text, Slider } from 'react-native-elements';
import Api from '../../../constans/Api';
import {
    Avatar
} from 'react-native-paper';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

let customFonts = {
    'Roboto-Black': require('../../../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../../../assets/fonts/Roboto-Thin.ttf'),
}

export class DropOff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            children: [],
            time: 0
        }
    }

    async _loadFontAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    async getChildren() {
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

        fetch(Api.url + 'api/children/my-children', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ children: responseJson });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }
    componentDidMount() {
        this._loadFontAsync();
        this.getChildren();
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.headerContainer}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'gray' }}>Who do you come to drop off?</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Card containerStyle={{ borderWidth: 1, borderColor: '#399998' }}>
                            {
                                this.state.children.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.picture }}
                                                size={50}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('2.5%'), paddingLeft: 20 }} >{u.fname + ' ' + u.lname}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('2%'), paddingLeft: 20 }}>Description</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </Card>
                    </View>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                        <View style={styles.headerContainer}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'gray' }}>Estimate time of arrival</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{this.state.time}min</Text>
                        <Slider
                            style={{ width: wp('60%'), marginHorizontal: wp('2%') }}
                            minimumTrackTintColor='#399998'
                            maximumTrackTintColor='#399998'
                            step='10'
                            thumbTintColor='white'
                            maximumValue={60}
                            value={this.state.time}
                            onValueChange={(value) => this.setState({ time: value })}
                        />
                        <Text>60min</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => alert('Eta: ' + this.state.time)}
                            style={{ width: wp('32%'), height: hp('5%'), backgroundColor: '#399998', alignItems: 'center', borderRadius: 7 }}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: '#fff' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        flexDirection: "column",
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 10
    },
    cardContainer: {
        flexDirection: 'row',
        paddingTop: 10
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