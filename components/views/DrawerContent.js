import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer
} from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../constans/Api';
import { Redirect } from 'react-router-dom';

export class DrawerContent extends Component {
    state = {
        st: false,
        first_name: '',
        last_name: '',
        email: ''
    }
    async componentDidMount() {
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
                this.setState({ email: responseJson.email });
            })
            .catch((error) => {
                Alert.alert(error);
            });

    }
    render(props) {
        if (this.state.st) {
            AsyncStorage.removeItem("token");
            return <Redirect to={'/login'} />
        }
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={require('../../assets/img/profile.png')}
                                    size={50}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{this.state.first_name + ' ' + this.state.last_name}</Title>
                                    <Caption style={styles.caption}>{this.state.email}</Caption>
                                </View>
                            </View>
                        </View>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <Drawer.Item
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => { this.setState({ st: true }) }}
                    />
                </Drawer.Section>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 10,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
})