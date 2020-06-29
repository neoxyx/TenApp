import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Alert, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Card, Icon, Text, Badge, Overlay, Input, CheckBox } from 'react-native-elements';
import Api from '../../constans/Api';
import { Avatar } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
    async setStatusInprocess() {
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.protocolStatusId,
                status: 2,
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
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    async sendAnswers() {
        let userToken = await AsyncStorage.getItem('token');
        let data = JSON.parse(userToken);
        let dataMe = {
            method: 'POST',
            body: JSON.stringify({
                protocolStatus: this.state.protocolStatusId,
                protocolDetail: 2,
                recieved_by: this.state.idUser,
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
                this.setState({ details: responseJson.protocol.protocolDetails });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    sendDetailsAnswers() {
        console.log(this.state.details);
    }

    componentDidMount() {
        this._loadFontAsync();
        this.getMeData();
        this.getComingArrived();
        this.getComing();
        this.getProcess();
        this.getProcessPickup();
        this.getRegistered();
        this.getRegisteredArrived();
    }
    render() {
        const toggleOverlay = () => {
            this.setState({ modalVisible: false });
        };
        const setProtocolDetailAnswerValue = (index, value) => {
            const newProtocolDetails = this.state.details.map((pd, i) => {
                if (i === index) pd.value = value;
                return pd;
            });
            this.setState({ details: newProtocolDetails });
        };
        const setTimeValue = (index, value, valueToSet, op = 'm') => {
            const time = value.split(':');
            const [h, m] = time;
            let val;
            if (op === 'm') val = `${h}:${valueToSet}`;
            else val = `${valueToSet}:${m}`;
            setProtocolDetailAnswerValue(index, val);
        };
        const Check = (props) => {
            return (
                <CheckBox checked={props.value} />
            );
        }
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
                                    marginLeft: 20,
                                    marginRight: 45,
                                }}
                            >
                                {item.activity_name}
                            </Text>
                            <Check value={Value} onPress={(value) => { setProtocolDetailAnswerValue(j, value) }} />
                        </>
                    )}

                    {item.activity_result_type == 'text' && (
                        <>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: hp('2%'),
                                    marginLeft: 30,
                                    marginRight: 45,
                                }}
                            >
                                {item.activity_name}
                            </Text>
                            <Input
                                value={Value}
                                containerStyle={{ width: wp('5%'), marginTop: hp('2%') }}
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
                                    marginLeft: 20,
                                    marginRight: 85,
                                }}
                            >
                                {item.activity_name}
                            </Text>
                            <Input
                                placeholder="07"
                                containerStyle={{ width: wp('4%'), marginTop: hp('2%') }}
                                onChangeText={(hour) => setTimeValue(j, Value, hour, 'h')}
                            ></Input>
                            <Text>:</Text>
                            <Input
                                placeholder="23"
                                containerStyle={{ width: wp('4%'), marginTop: hp('2%') }}
                                onChangeText={(min) => setTimeValue(j, Value, min, 'm')}
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
                            <Icon name="home" size={hp('13%')} color="gray" />
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('10.331%'), color: 'gray' }}>
                                Incoming Dashboard
							</Text>
                        </View>
                    </View>
                    <View style={styles.headerContainer}>
                        <Card
                            title="Coming"
                            titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}
                        >
                            {this.state.commingArrived.map((u, i) => {
                                return (
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setStatusInprocess();
                                            this.setState({ picture: u.child.picture });
                                            this.setState({ nameChild: u.child.fname + ' ' + u.child.lname });
                                            this.setState({ nameParent: u.parent.fname + ' ' + u.parent.lname });
                                            this.setState({ protocolStatusId: u.id });
                                            this.setState({ modalVisible: true });
                                        }}
                                    >
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                            <Badge
                                                badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                                status="error"
                                                containerStyle={{ position: 'absolute', top: 3, right: 260 }}
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
                                            containerStyle={{ position: 'absolute', top: 3, right: 260 }}
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
                            titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}
                        >
                            {this.state.process.map((u, i) => {
                                return (
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setStatusInprocess();
                                            this.setState({ picture: u.child.picture });
                                            this.setState({ nameChild: u.child.fname + ' ' + u.child.lname });
                                            this.setState({ nameParent: u.parent.fname + ' ' + u.parent.lname });
                                            this.setState({ protocolStatusId: u.id });
                                            this.setState({ modalVisible: true });
                                        }}
                                    >
                                        <View key={i} style={styles.cardContainer}>
                                            <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                            <Badge
                                                badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                                status="warning"
                                                containerStyle={{ position: 'absolute', top: 3, right: 260 }}
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
                                    </TouchableHighlight>
                                );
                            })}
                            {this.state.processPickup.map((u, i) => {
                                return (
                                    <View key={i} style={styles.cardContainer}>
                                        <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                        <Badge
                                            badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                            status="warning"
                                            containerStyle={{ position: 'absolute', top: 3, right: 260 }}
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
                            titleStyle={{ fontSize: hp('3.5%'), fontFamily: 'Roboto-Regular', color: 'gray' }}
                        >
                            {this.state.registeredArrived.map((u, i) => {
                                return (
                                    <View key={i} style={styles.cardContainer}>
                                        <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                        <Badge
                                            badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                            status="success"
                                            containerStyle={{ position: 'absolute', top: 3, right: 260 }}
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
                                );
                            })}
                            {this.state.registered.map((u, i) => {
                                return (
                                    <View key={i} style={styles.cardContainer}>
                                        <Avatar.Image source={{ uri: u.child.picture }} size={50} />
                                        <Badge
                                            badgeStyle={{ width: 20, height: 20, borderRadius: 20 }}
                                            status="success"
                                            containerStyle={{ position: 'absolute', top: 3, right: 260 }}
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
                                );
                            })}
                        </Card>
                    </View>
                </View>
                <Overlay
                    overlayStyle={{ borderWidth: 3, borderColor: '#399998', width: wp('70%'), height: hp('70%') }}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={toggleOverlay}
                >
                    <View style={{ flexDirection: 'row', paddingTop: hp('5%'), marginLeft: wp('10%') }}>
                        <View
                            style={{
                                width: '84.6%',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: hp('3%'), color: 'gray' }}>
                                Input Protocol
							</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginLeft: wp('10%') }}>
                        <View
                            style={{
                                width: '42%',
                                height: '80%',
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
                                marginTop: '5%',
                                width: '0.6%',
                                height: '83%',
                                backgroundColor: '#399998',
                            }}
                        ></View>
                        <View
                            style={{
                                marginTop: '1%',
                                width: '42%',
                                height: '80%',
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
                                    marginLeft: wp('8%'),
                                    alignItems: 'center',
                                }}
                            >
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
                                        this.sendDetailsAnswers()
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
        paddingTop: 60,
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
});
