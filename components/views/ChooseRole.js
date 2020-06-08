import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Icon } from 'react-native-elements';
import { Link } from '../../react-router.native';

export default () => (
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
				<View style={styles.Select}>
					<Avatar
						size="medium"
						overlayContainerStyle={styles.avatarStyle}
						rounded
						icon={{ name: 'person' }}
					/>
					<Text style={styles.textWhite}>Teacher</Text>
					<Icon name="expand-more" color="#ccc" containerStyle={styles.arrowIcon} />
				</View>
			</View>
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#359a9a',
		padding: 10,
	},
	content: {
		height: '85%',
		flexDirection: 'row',
		display: 'flex',
		width: '80%',
		justifyContent: 'space-around',
		alignContent: 'center',
		flexWrap: 'wrap',
	},
	title: {
		fontSize: 28,
		color: '#fff',
	},
	titleContainer: {
		width: '100%',
		marginBottom: 35,
	},
	selectContainer: {
		width: '100%',
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
	avatarStyle: {
		backgroundColor: '#ccc',
		margin: 5,
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
	},
});
