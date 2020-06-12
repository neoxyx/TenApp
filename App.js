import React from 'react';
import { Router, Route } from './react-router.native';
import Views from './components/views/';
import { View, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
const { ForgotPassword, CheckMethod, ChooseRole, Home, Login } = Views;

const theme = {
	colors: {
		primary: '#359a9a',
	},
};

export default function App() {
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
				</View>
			</Router>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
