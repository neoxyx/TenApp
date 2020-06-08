import React from 'react';
import { Router, Route } from './react-router.native';
import Views from './components/views/';
import { View, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
const { Login, ForgotPassword, CheckMethod, ChooseRole } = Views;

const theme = {
	colors: {
		primary: '#359a9a',
	},
};

const App = () => (
	<ThemeProvider theme={theme}>
		<StatusBar barStyle="light-content" />
		<Router>
			<View style={styles.container}>
				<Route exact path="/" component={CheckMethod} />
				<Route path="/login" component={Login} />
				<Route path="/forgot-password" component={ForgotPassword} />
				<Route path="/choose-role" component={ChooseRole} />
			</View>
		</Router>
	</ThemeProvider>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
