import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Link } from '../../react-router.native';

let customFonts = {
	'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
	'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
	'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
}

export default class ChooseRole extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			ddlSelectedValue: 1
		}
	}
	async _loadFontAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}
	componentDidMount = () => {
		this._loadFontAsync();
	}
	setSelectedStateValue = (ddlValue) => {
		this.setState({ ddlSelectedValue: ddlValue });
	}
	render() {
		let items = [
			{
				value: 'Teacher',
			},
			{
				value: 'Parent',
			}
		]
		if (this.state.fontsLoaded) {
			return (
				<ImageBackground source={require('../../assets/img/bg.png')} style={styles.imageBack}>
					<View style={styles.container}>
						<View style={styles.headerContainer}>
							<Link to="/login">
								<Icon name="arrow-back" color="#fff" />
							</Link>
						</View>
						<View style={styles.content}>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>Choose your role</Text>
							</View>
							<View style={styles.selectContainer}>
								<Dropdown label={'Choose your role'} data={items} itemTextStyle={styles.textWhite} fontSize={18} pickerStyle={{ backgroundColor: 'transparent' }} baseColor={'white'} containerStyle={styles.select} textColor={'white'} itemColor={'white'} onChangeText={(value) => this.setSelectedStateValue(value)} />
							</View>
						</View>
					</View>
				</ImageBackground>
			);
		} else {
			return <AppLoading />
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		paddingTop: 10,
	},
	imageBack: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
		height: 700
	},
	content: {
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '90%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
		paddingLeft: 30,
	},
	title: {
		fontSize: 28,
		color: '#fff',
		fontFamily: 'Roboto-Regular'
	},
	titleContainer: {
		width: '100%',
		marginBottom: 35,
	},
	select: {
		backgroundColor: 'transparent',
		width: '100%'
	},
	avatarStyle: {
		backgroundColor: '#ccc',
		margin: 5,
	},
	selectContainer: {
		flexDirection: 'row',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	Select: {
		width: '100%',
		borderRadius: 3,
		borderColor: '#fff',
		borderWidth: 3,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
	},
	selectStart: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	avatarOverlay: { backgroundColor: 'gray', marginHorizontal: 8 },
	headerContainer: {
		alignItems: 'flex-start',
		height: '5%',
		width: '100%',
		paddingHorizontal: 10,
	},
	arrowIcon: {
		position: 'absolute',
		right: 5,
	},
	textWhite: {
		color: '#fff',
		fontFamily: 'Roboto-Regular'
	},
});
