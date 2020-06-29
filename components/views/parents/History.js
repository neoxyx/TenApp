import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Card, Text, Overlay, Input } from 'react-native-elements';
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

export class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            fontsLoaded: false,
            children: [],
            picture: '',
            nameChild: '',
            modalVisible: false,
            notes: ''
        }
    }

    async _loadFontAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    async getMeData() {
        let userToken = await AsyncStorage.getItem("token");
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': data
            }
        }

        fetch(Api.url + 'auth/me', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ first_name: responseJson.first_name });
                this.setState({ last_name: responseJson.last_name });
                this.setState({ idUser: responseJson.id });
            })
            .catch((error) => {
                Alert.alert(error);
            });

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
        this.getMeData();
        this.getChildren();
    }
    render() {
        const toggleOverlay = () => {
            this.setState({ modalVisible: false });
        };
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.headerContainer}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'gray' }}>Drop off / Pick up History</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Card containerStyle={{ borderWidth: 1, borderColor: '#399998' }}>
                            {
                                this.state.children.map((u, i) => {
                                    return (
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.setState({ picture: u.picture });
                                                this.setState({ nameChild: u.fname + ' ' + u.lname });
                                                this.setState({ modalVisible: true });
                                                // this.getHistory();
                                            }}>
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
                                        </TouchableHighlight>
                                    );
                                })
                            }
                        </Card>
                    </View>
                </View>
                <Overlay
                    overlayStyle={{ borderWidth: 3, borderColor: '#399998', width: wp('90%'), height: hp('75%') }}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={toggleOverlay}
                >
                    <View style={{ flexDirection: 'row', paddingTop: hp('1%'), marginLeft: wp('10%') }}>
                        <View style={{
                            width: '84.6%',
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'gray' }}>Drop off / Pick up Details</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: wp('15%') }}>
                        <View style={{
                            width: '84.6%',
                            alignItems: 'center',
                            marginTop: 30
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Avatar.Image
                                    source={{ uri: this.state.picture }}
                                    size={70}
                                />
                                <Text style={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Bold', paddingLeft: 20, paddingTop: 10 }}>{this.state.nameChild} </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: hp('3%')
                                }}>
                                <Text style={{ fontSize: hp('2%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>12/05/2020 7:02 AM</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: hp('3%')
                                }}>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>Drop by: </Text>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Bold' }}>DANNA ROGERS </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>Received by: </Text>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Bold' }}>{this.state.first_name + ' ' + this.state.last_name}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>Temperature: </Text>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Bold' }}>99°F</Text>
                            </View>
                            <View style={{
                                marginTop: hp('2%'),
                                width: wp('70%'),
                                height: hp('15%'),
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: '#399998',
                                borderRadius: 5
                            }}>
                                <Input placeholder='Notes' onChangeText={value => this.setState({ notes: value })}></Input>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => alert('go back')}
                                    style={{ width: wp('40%'), height: hp('6%'), backgroundColor: '#399998', alignItems: 'center', justifyContent: 'center', borderRadius: 7, marginTop: hp('2%') }}>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: '#fff' }}>Go Back</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Overlay>
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