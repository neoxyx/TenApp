import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { Icon, Card, Text, Badge } from 'react-native-elements';
import Api from '../../constans/Api';
import {
    Avatar
} from 'react-native-paper';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';

export class DropOff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            coming: [],
            commingArrived: [],
            inProcess: [],
            inProcessPickup: [],
            droppedOff: [],
            droppedOffPickUp: []
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

        fetch(Api.url + 'api/protocols/2/status/0', dataMe)
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

        fetch(Api.url + 'api/protocols/2/status/1', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ commingArrived: responseJson });
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
    async getInProcessPickUp() {
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
                this.setState({ inProcessPickup: responseJson });
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
    async getDroppedOffArrived() {
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

        fetch(Api.url + 'api/protocols/2/status/4', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ droppedOffPickUp: responseJson });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }
    componentDidMount() {
        this._loadFontAsync();
        this.getComing();
        this.getComingArrived();
        this.getInProcess();
        this.getInProcessPickUp
        this.getDroppedOff();
        this.getDroppedOffArrived();
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.headerContainer}>
                            <Icon name="home" size={hp('13%')} color="gray" />
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('10.331%'), color: 'gray' }}>Outcoming Dashboard</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Card title="Coming" titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>
                            {
                                this.state.commingArrived.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                                status='error'
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
                                this.state.inProcess.map((u, i) => {
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
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>DROP OFF</Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                            {
                                this.state.inProcessPickup.map((u, i) => {
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
                                                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: hp('1.5%'), paddingLeft: 20 }}>PICK UP</Text>
                                                    <Text style={{ fontFamily: 'Roboto-Thin', fontSize: hp('1.7%'), paddingLeft: 20 }}>{u.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </Card>
                        <Card title="Dropped Off" titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>
                            {
                                this.state.droppedOff.map((u, i) => {
                                    return (
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image
                                                source={{ uri: u.child.pucture }}
                                                size={70}
                                            />
                                            <Badge
                                                badgeStyle={{ width: 25, height: 25, borderRadius: 25 }}
                                                containerStyle={{ position: 'absolute', top: 3, right: 300 }}
                                                status='success'
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
                                this.state.droppedOffPickUp.map((u, i) => {
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