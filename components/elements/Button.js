import React from 'react';
import { ThemeProvider, Button } from 'react-native-elements';

const buttonTheme = {
	Button: {
		buttonStyle: {
			backgroundColor: '#fff',
		},
		titleStyle: {
			color: '#359a9a',
		},
	},
};

export const button = (props) => {
	return (
		<ThemeProvider theme={buttonTheme}>
			<Button {...props} />
		</ThemeProvider>
	);
};

const buttonOutlinedTheme = {
	Button: {
		buttonStyle: {
			borderColor: '#fff',
		},
		titleStyle: {
			color: '#fff',
		},
	},
};

export const buttonOutlined = (props) => {
	return (
		<ThemeProvider theme={buttonOutlinedTheme}>
			<Button {...props} type={'outline'} />
		</ThemeProvider>
	);
};
