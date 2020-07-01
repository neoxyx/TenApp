import React, { Component } from 'react';
import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import { Image, Button, Platform, AppState, View, StyleSheet, AsyncStorage, Alert, ScrollView, Switch, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Card, Icon, Text, Badge, Overlay, Input } from 'react-native-elements';
import Api from '../../constans/Api';
import Status from '../../constans/Status';
import { Avatar } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isAndroid = Platform.OS === 'android';
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
let customFonts = {
    'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../../assets/fonts/Roboto-Thin.ttf'),
};

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            //strokeColor: Math.random() * 0xffffff,
            strokeColor: 0x3B83BD,
            //strokeWidth: Math.random() * 30 + 10,
            lines: [
                {
                    points: [{ x: 300, y: 300 }, { x: 600, y: 300 }, { x: 450, y: 600 }, { x: 300, y: 300 }],
                    color: 0xff00ff,
                    alpha: 1,
                    width: 10,
                },
            ],
            appState: AppState.currentState,
            first_name: '',
            last_name: '',
            idUser: '',
            fontsLoaded: false,
            coming: [],
            commingArrived: [],
            process: [],
            processPickup: [],
            registered: [],
            registeredArrived: [],
            selectedValue: '',
            modalVisible: false,
            modalControl: false,
            modalSignature: false,
            picture: '',
            nameChild: '',
            nameParent: '',
            protocolStatusId: '',
            check: false,
            temperature: '',
            arrivalTimeHour: '',
            arrivalTimeMin: '',
            notes: '',
            details: [],
        };
    }
    handleAppStateChangeAsync = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (isAndroid && this.sketch) {
                this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
                return;
            }
        }
        this.setState({ appState: nextAppState });
    };
    async _loadFontAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    async getMeData() {
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

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
    async getComing() {
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

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
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

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
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

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
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

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
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

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
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

        fetch(Api.url + 'api/protocols/1/status/4', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ registeredArrived: responseJson });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }
    async setStatus(status) {
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.protocolStatusId,
                status: status,
                recieved_by: this.state.idUser,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

        fetch(Api.url + 'api/protocols/status', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    details: responseJson.protocol.protocolDetails.map((pd) => {
                        if (pd.activity_result_type === 'bool') pd.value = false;
                        else if (pd.activity_result_type === 'text') pd.value = '';
                        else if (pd.activity_result_type === 'time') pd.value = '00:00';
                        return pd;
                    }),
                });
                this.componentDidMount();
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    async sendAnswers(idDetail, answer) {
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'POST',
            body: JSON.stringify({
                protocolStatus: this.state.protocolStatusId,
                protocolDetail: idDetail,
                answer: answer,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'access-token': data,
            },
        };

        fetch(Api.url + 'api/protocols/answer', dataMe)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    sendDetailsAnswers() {
        this.state.details.map((item, j) => {
            this.sendAnswers(item.id, item.value);
            this.setStatus(Status.R);
            this.componentDidMount();
        })
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChangeAsync);
        this._loadFontAsync();
        this.getMeData();
        this.getComingArrived();
        this.getComing();
        this.getProcess();
        this.getProcessPickup();
        this.getRegistered();
        this.getRegisteredArrived();
    }
    componentWillUnmount() {
        AppState.addEventListener('change', this.handleAppStateChangeAsync);
    }
    onChangeAsync = async () => {
        const { uri } = await this.sketch.takeSnapshotAsync();
        this.setState({
            image: { uri },
            strokeWidth: Math.random() * 30 + 10,
            strokeColor: Math.random() * 0xffffff,
        });
    };
    onReady = () => {
        console.log('ready!');
    };
    render() {
        const toggleOverlay = () => {
            this.setState({ modalVisible: false, modalSignature: false });
        };
        const setProtocolDetailAnswerValue = (index, value) => {
            const newProtocolDetails = this.state.details.map((pd, i) => {
                if (i === index) pd.value = value;
                return pd;
            });
            this.setState({ details: newProtocolDetails });
        };
        const items = this.state.details.map((item, j) => {
            const { value: Value } = item;
            return (
                <View
                    key={j}
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: '20%',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#399998',
                    }}
                >
                    <Icon style={{ marginLeft: 10 }} name={item.Icon} size={40} type="font-awesome" color="#399998" />
                    {item.activity_result_type == 'bool' && (
                        <>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: hp('2%'),
                                    marginLeft: 40
                                }}
                            >
                                {item.activity_name}
                            </Text>
                            <Switch style={{ marginLeft: 90 }} value={Value} onValueChange={(value) => setProtocolDetailAnswerValue(j, value)} />
                        </>
                    )}

                    {item.activity_result_type == 'text' && (
                        <>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: hp('2%'),
                                    marginLeft: 50
                                }}
                            >
                                {item.activity_name}
                            </Text>
                            <Input
                                value={Value}
                                containerStyle={{ marginLeft: 80, width: wp('5%'), marginTop: hp('2%') }}
                                onChangeText={(value) => setProtocolDetailAnswerValue(j, value)}
                            ></Input>
                        </>
                    )}
                    {item.activity_result_type == 'time' && (
                        <>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: hp('2%'),
                                    marginLeft: 40
                                }}
                            >
                                {item.activity_name}
                            </Text>
                            <Input
                                value={Value}
                                placeholder="14:00"
                                containerStyle={{ marginLeft: 150, width: wp('5%'), marginTop: hp('2%') }}
                                onChangeText={(value) => setProtocolDetailAnswerValue(j, value)}
                            ></Input>
                        </>
                    )}
                </View>
            );
        });
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.headerContainer}>
                            <Icon name="home" size={hp('6.5%')} color="gray" />
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('5%'), color: 'gray' }}>
                                Incoming Dashboard
							</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Card
                            title="Coming"
                            titleStyle={{ fontSize: hp('2%'), fontFamily: 'Roboto-Regular', color: 'gray' }}
                        >
                            {this.state.commingArrived.map((u, i) => {
                                return (
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setStatus(Status.CA);
                                            this.setState({ picture: u.child.picture });
                                            this.setState({ nameChild: u.child.fname + ' ' + u.child.lname });
                                            this.setState({ nameParent: u.parent.fname + ' ' + u.parent.lname });
                                            this.setState({ protocolStatusId: u.id });
                                            this.setState({ modalControl: false, modalVisible: true });
                                        }}
                                    >
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                            <Badge
                                                badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                                status="error"
                                                containerStyle={{ position: 'absolute', top: 3, right: 230 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Bold',
                                                        fontSize: hp('2%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    {u.child.fname + ' ' + u.child.lname}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Roboto-Bold',
                                                            fontSize: hp('1.5%'),
                                                            paddingLeft: 20,
                                                        }}
                                                    >
                                                        ARRIVED
													</Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Roboto-Thin',
                                                            fontSize: hp('1.7%'),
                                                            paddingLeft: 20,
                                                        }}
                                                    >
                                                        {u.date}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                );
                            })}
                            {this.state.coming.map((u, i) => {
                                return (
                                    <View key={i} style={styles.cardContainer}>
                                        <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                        <Badge
                                            badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                            containerStyle={{ position: 'absolute', top: 3, right: 230 }}
                                            status="warning"
                                        />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Roboto-Bold',
                                                    fontSize: hp('2%'),
                                                    paddingLeft: 20,
                                                }}
                                            >
                                                {u.child.fname + ' ' + u.child.lname}
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Bold',
                                                        fontSize: hp('1.5%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    ESTIMATE TIME{' '}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Thin',
                                                        fontSize: hp('1.7%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    {u.eta} MIN
												</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </Card>
                        <Card
                            title="In Process"
                            titleStyle={{ fontSize: hp('2%'), fontFamily: 'Roboto-Regular', color: 'gray' }}
                        >
                            {this.state.process.map((u, i) => {
                                return (
                                    <View key={i} style={styles.cardContainer}>
                                        <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                        <Badge
                                            badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                            containerStyle={{ position: 'absolute', top: 3, right: 240 }}
                                            status="warning"
                                        />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Roboto-Bold',
                                                    fontSize: hp('2%'),
                                                    paddingLeft: 20,
                                                }}
                                            >
                                                {u.child.fname + ' ' + u.child.lname}
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Bold',
                                                        fontSize: hp('1.5%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    DROP OFF
													</Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Thin',
                                                        fontSize: hp('1.7%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    {u.date}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                            {this.state.processPickup.map((u, i) => {
                                return (
                                    <View key={i} style={styles.cardContainer}>
                                        <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                        <Badge
                                            badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                            status="warning"
                                            containerStyle={{ position: 'absolute', top: 3, right: 240 }}
                                        />
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text
                                                style={{
                                                    fontFamily: 'Roboto-Bold',
                                                    fontSize: hp('2%'),
                                                    paddingLeft: 20,
                                                }}
                                            >
                                                {u.child.fname + ' ' + u.child.lname}
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Bold',
                                                        fontSize: hp('1.5%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    PICK UP
												</Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Thin',
                                                        fontSize: hp('1.7%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    {u.date}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </Card>
                        <Card
                            title="Registered"
                            titleStyle={{ fontSize: hp('2%'), fontFamily: 'Roboto-Regular', color: 'gray' }}
                        >
                            {this.state.registeredArrived.map((u, i) => {
                                return (
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setStatus(Status.RA);
                                            this.setState({ picture: u.child.picture });
                                            this.setState({ nameChild: u.child.fname + ' ' + u.child.lname });
                                            this.setState({ nameParent: u.parent.fname + ' ' + u.parent.lname });
                                            this.setState({ protocolStatusId: u.id });
                                            this.setState({ modalControl: true, modalVisible: true });
                                        }}
                                    >
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                            <Badge
                                                badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                                status="success"
                                                containerStyle={{ position: 'absolute', top: 3, right: 230 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Bold',
                                                        fontSize: hp('2%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    {u.child.fname + ' ' + u.child.lname}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Roboto-Bold',
                                                            fontSize: hp('1.5%'),
                                                            paddingLeft: 20,
                                                        }}
                                                    >
                                                        ARRIVED
												</Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Roboto-Thin',
                                                            fontSize: hp('1.7%'),
                                                            paddingLeft: 20,
                                                        }}
                                                    >
                                                        {u.date}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                );
                            })}
                            {this.state.registered.map((u, i) => {
                                return (
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setStatus(Status.RA);
                                            this.setState({ picture: u.child.picture });
                                            this.setState({ nameChild: u.child.fname + ' ' + u.child.lname });
                                            this.setState({ nameParent: u.parent.fname + ' ' + u.parent.lname });
                                            this.setState({ protocolStatusId: u.id });
                                            this.setState({ modalControl: true, modalVisible: true });
                                        }}
                                    >
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                            <Badge
                                                badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                                status="success"
                                                containerStyle={{ position: 'absolute', top: 3, right: 230 }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Roboto-Bold',
                                                        fontSize: hp('2%'),
                                                        paddingLeft: 20,
                                                    }}
                                                >
                                                    {u.child.fname + ' ' + u.child.lname}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Roboto-Bold',
                                                            fontSize: hp('1.5%'),
                                                            paddingLeft: 20,
                                                        }}
                                                    >
                                                        ESTIMATE TIME
												</Text>
                                                    <Text
                                                        style={{
                                                            fontFamily: 'Roboto-Thin',
                                                            fontSize: hp('1.7%'),
                                                            paddingLeft: 20,
                                                        }}
                                                    >
                                                        {u.eta}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                );
                            })}
                        </Card>
                    </View>
                </View>
                <Overlay
                    overlayStyle={{ borderWidth: 3, borderColor: '#399998', width: wp('80%'), height: hp('70%') }}
                    isVisible={this.state.modalSignature}
                    onBackdropPress={toggleOverlay}
                >
                    <View style={styles.containerSignature}>
                        <View style={styles.containerSignature}>
                            <View style={styles.sketchContainer}>
                                <ExpoPixi.Sketch
                                    ref={ref => (this.sketch = ref)}
                                    style={styles.sketch}
                                    strokeColor={this.state.strokeColor}
                                    strokeWidth={2}
                                    strokeAlpha={1}
                                    onChange={this.onChangeAsync}
                                    onReady={this.onReady}
                                    initialLines={this.state.lines}
                                />
                                <View style={styles.label}>
                                    <Text>Canvas - draw here</Text>
                                </View>
                            </View>
                            <View style={styles.imageContainer}>
                                <View style={styles.label}>
                                    <Text>Snapshot</Text>
                                </View>
                                <Image style={styles.image} source={this.state.image} />
                            </View>
                        </View>
                        <Button
                            color={'blue'}
                            title="undo"
                            style={styles.button}
                            onPress={() => {
                                this.sketch.undo();
                            }}
                        />
                    </View>
                </Overlay>
                <Overlay
                    overlayStyle={{ borderWidth: 3, borderColor: '#399998', width: wp('80%'), height: hp('70%') }}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={toggleOverlay}
                >
                    <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
                        {this.state.modalControl == false && (
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'gray' }}>
                                Input Protocol
                            </Text>
                        )}
                        {this.state.modalControl == true && (
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'gray' }}>
                                Register Details
                            </Text>
                        )}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: wp('5%') }}>
                        <View
                            style={{
                                width: wp('30%'),
                                height: hp('80%'),
                                paddingTop: 40,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar.Image source={{ uri: this.state.picture }} size={70} />
                                <Text
                                    style={{
                                        fontSize: hp('3.5%'),
                                        fontFamily: 'Roboto-Bold',
                                        paddingLeft: 20,
                                        paddingTop: 10,
                                    }}
                                >
                                    {this.state.nameChild}{' '}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: hp('3%'),
                                }}
                            >
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>
                                    Parent:{' '}
                                </Text>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Bold' }}>
                                    {this.state.nameParent}{' '}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Regular', color: 'gray' }}>
                                    Received by:{' '}
                                </Text>
                                <Text style={{ fontSize: hp('3%'), fontFamily: 'Roboto-Bold' }}>
                                    {this.state.first_name + ' ' + this.state.last_name}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: hp('5%'),
                                marginLeft: wp('3%'),
                                width: wp('0.5%'),
                                height: hp('50%'),
                                backgroundColor: '#399998',
                            }}
                        ></View>
                        <View
                            style={{
                                marginTop: hp('1%'),
                                width: wp('30%'),
                                height: hp('50%'),
                            }}
                        >
                            <View
                                style={{
                                    width: '90%',
                                    height: '70%',
                                    marginTop: hp('4%'),
                                    marginLeft: wp('5%'),
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: '#399998',
                                }}
                            >
                                {items}
                            </View>
                            <View
                                style={{
                                    width: '90%',
                                    height: '15%',
                                    marginTop: hp('2%'),
                                    marginLeft: wp('5%'),
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: '#399998',
                                    borderRadius: 5,
                                }}
                            >
                                <Input
                                    placeholder="Notes"
                                    onChangeText={(value) => this.setState({ notes: value })}
                                ></Input>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '60%',
                                    height: '10%',
                                    marginTop: hp('2%'),
                                    marginLeft: wp('7%'),
                                    alignItems: 'center',
                                }}
                            >
                                {this.state.modalControl == false && (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => this.setState({ modalSignature: true })}
                                            style={{
                                                width: wp('7%'),
                                                backgroundColor: '#399998',
                                                alignItems: 'center',
                                                marginRight: wp('1%'),
                                                borderRadius: 7,
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('2%'), color: '#fff' }}>
                                                Signature
									</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => alert('Cancel')}
                                            style={{
                                                width: wp('7%'),
                                                backgroundColor: '#399998',
                                                alignItems: 'center',
                                                marginRight: wp('1%'),
                                                borderRadius: 7,
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('2%'), color: '#fff' }}>
                                                Cancel
									</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.sendDetailsAnswers(), toggleOverlay
                                            }
                                            style={{
                                                width: wp('7%'),
                                                backgroundColor: '#399998',
                                                alignItems: 'center',
                                                borderRadius: 7,
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('2%'), color: '#fff' }}>
                                                Save
									</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {this.state.modalControl == true && (
                                    <TouchableOpacity
                                        onPress={toggleOverlay}
                                        style={{
                                            width: wp('7%'),
                                            backgroundColor: '#399998',
                                            alignItems: 'center',
                                            borderRadius: 7,
                                        }}
                                    >
                                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('2%'), color: '#fff' }}>
                                            Go Back
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </Overlay>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    textWhite: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
    },
    textblack: {
        color: 'black',
        fontFamily: 'Roboto-Regular',
    },
    textGray: {
        color: 'gray',
        fontFamily: 'Roboto-Regular',
    },
    //Siganture
    containerSignature: {
        flex: 1,
      },
      sketch: {
        flex: 1,
      },
      sketchContainer: {
        height: '50%',
      },
      image: {
        flex: 1,
      },
      imageContainer: {
        height: '50%',
        borderTopWidth: 4,
        borderTopColor: '#E44262',
      },
      label: {
        width: '100%',
        padding: 5,
        alignItems: 'center',
      },
      button: {
        // position: 'absolute',
        // bottom: 8,
        // left: 8,
        zIndex: 1,
        padding: 12,
        minWidth: 56,
        minHeight: 48,
      },
});
