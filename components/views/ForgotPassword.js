import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon } from 'react-native-elements';
import { Link } from '../../react-router.native';
import { button as Button } from '../elements/Button';

export default () => (
	<View style={styles.container}>
		<View style={styles.headerContainer}>
			<Link to="/login">
				<Icon name="arrow-back" color="#fff" />
			</Link>
		</View>
		<View style={styles.formContainer}>
			<View style={styles.titleContainer}>
				<Text h3 style={styles.textWhite}>
					Forgot my password
				</Text>
			</View>

			<View style={styles.componentContainer}>
				<Input placeholder="TEN CENTER" inputContainerStyle={styles.input} inputStyle={styles.input} />
			</View>

			<View style={styles.componentContainer}>
				<Input placeholder="EMAIL ADDRESS" inputContainerStyle={styles.input} inputStyle={styles.input} />
			</View>

			<View style={styles.buttonContainer}>
				<Button buttonStyle={styles.button} title="Send Recovery Link" />
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#359a9a',
		padding: 10,
	},
	formContainer: {
		padding: 23,
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '100%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	titleContainer: {
		width: '100%',
		marginBottom: 80,
	},
	componentContainer: {
		width: '100%',
		marginBottom: 10,
	},
	buttonContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 8,
	},
	headerContainer: {
		alignItems: 'flex-start',
		height: '5%',
		paddingHorizontal: 10,
	},
	textWhite: {
		color: '#fff',
	},
	input: {
		color: '#fff',
		borderColor: '#fff',
	},
});
