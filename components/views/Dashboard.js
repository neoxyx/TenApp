import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { Card, Icon, Text, Badge } from 'react-native-elements';
import Api from '../../constans/Api';
import {
    Avatar
} from 'react-native-paper';
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

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            coming: [],
            commingArrived: [],
            process: [],
            processPickup: [],
            registered: [],
            registeredArrived: []
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

        fetch(Api.url + 'api/protocols/1/status/0', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ coming: responseJson });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }
    async getComingArrived() {
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
                this.setState({ commingArrived: responseJson });
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
    async getProcessPickup() {
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
                this.setState({ processPickup: responseJson });
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
    async getRegisteredArrived() {
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

        fetch(Api.url + 'api/protocols/1/status/4', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ registeredArrived: responseJson });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }
    componentDidMount() {
        this._loadFontAsync();
        this.getComingArrived();
        this.getComing();
        this.getProcess();
        this.getProcessPickup();
        this.getRegistered();
        this.getRegisteredArrived();
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.headerContainer}>
                            <Icon name="home" size={hp('13%')} color="gray" />
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('10.331%'), color: 'gray' }}>Incoming Dashboard</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Card title="Coming" titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>
                            {
                                this.state.commingArrived.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer} >
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                status="error"
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('2.5%'), paddingLeft: 20 }}>{u.child.fname + ' ' + u.child.lname}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>ARRIVED</Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                            {
                                this.state.coming.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                                status='warning'
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('2.5%'), paddingLeft: 20 }} >{u.child.fname + ' ' + u.child.lname}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>ESTIMATE TIME </Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.eta} MIN</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </Card>
                        <Card title="In Process" titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>
                            {
                                this.state.process.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                status="warning"
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('2.5%'), paddingLeft: 20 }} >{u.child.fname + ' ' + u.child.lname}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>DROP OFF</Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                            {
                                this.state.processPickup.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                status="warning"
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('2.5%'), paddingLeft: 20 }} >{u.child.fname + ' ' + u.child.lname}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>PICK UP</Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </Card>
                        <Card title="Registered" titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>
                            {
                                this.state.registeredArrived.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                status="success"
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('2.5%'), paddingLeft: 20 }} >{u.child.fname + ' ' + u.child.lname}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>ARRIVED</Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                            {
                                this.state.registered.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                status="success"
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('2.5%'), paddingLeft: 20 }} >{u.child.fname + ' ' + u.child.lname}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>ESTIMATE TIME</Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.eta}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </Card>
                    </View>
                </View>
            </ScrollView >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 60
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