import React, { Component } from 'react';
import { Router, Route } from './react-router.native';
import Views from './components/views/';
import { View, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
const { ForgotPassword, CheckMethod, ChooseRole, Home, Login, Parent } = Views;

const theme = {
	colors: {
		primary: '#359a9a',
	},
};

export default class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StatusBar barStyle="light-content" />
				<Router>
					<View style={styles.container}>
						<Route exact path="/" component={CheckMethod} />
						<Route path="/login" component={Login} />
						<Route path="/forgot-password" component={ForgotPassword} />
						<Route path="/choose-role" component={ChooseRole} />
						<Route path="/home" component={Home} />
						<Route path="/parent" component={Parent} />
					</View>
				</Router>
			</ThemeProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
