import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { Link } from '../../react-router.native';
import { button as Button, buttonOutlined as ButtonOutlined } from '../elements/Button';
export default () => (
	<View style={styles.container}>
		<View style={styles.headerContainer}>
			<Link to="/login">
				<Text h4 style={styles.textWhite}>
					Log in
				</Text>
			</Link>
		</View>
		<View style={styles.content}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require('../../assets/img/logo.png')} />
			</View>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Welcome to Ten App</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button buttonStyle={styles.button} title="Continue with Gmail" />
				<ButtonOutlined buttonStyle={styles.button} titleStyle={styles.textWhite} title="Create Account" />
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#359a9a',
	},
	content: {
		padding: 23,
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '80%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		color: '#fff',
	},
	titleContainer: {
		width: '100%',
		marginBottom: 20,
	},
	componentContainer: {
		width: '100%',
		marginBottom: 30,
	},
	buttonContainer: {
		width: '100%',
	},
	imageContainer: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 40,
	},
	image: {
		width: 200,
		height: 80,
	},
	button: {
		paddingVertical: 10,
		width: '100%',
		borderRadius: 8,
		textAlign: 'center',
		marginBottom: 10,
	},
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '5%',
		width: '100%',
		paddingHorizontal: 10,
	},
	textWhite: {
		color: '#fff',
	},
});
