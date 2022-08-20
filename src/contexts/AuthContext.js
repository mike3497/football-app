import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = React.createContext({
	token: '',
	user: '',
	isLoggedIn: false,
	signIn: (token) => {},
	signOut: () => {},
});

export const AuthContextProvider = (props) => {
	const initialToken = localStorage.getItem('token');

	const [token, setToken] = useState(initialToken);
	const [user, setUser] = useState(initialToken ? jwtDecode(initialToken) : {});

	const userIsLoggedIn = !!token;

	function handleSignIn(token) {
		setToken(token);
		localStorage.setItem('token', token);
		setUser(jwtDecode(token));
	}

	function handleSignOut() {
		setToken(null);
		localStorage.removeItem('token');
		setUser(null);
	}

	const contextValue = {
		token: token,
		user: user,
		isLoggedIn: userIsLoggedIn,
		signIn: handleSignIn,
		signOut: handleSignOut,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
