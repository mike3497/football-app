import axios from 'axios';

export const signUp = async (username, password, firstName, lastName) => {
	const url = 'http://localhost:3000/api/users/sign-up';
	const data = JSON.stringify({
		username,
		password,
		firstName,
		lastName,
	});
	const response = await axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};

export const signIn = async (username, password) => {
	const url = 'http://localhost:3000/api/users/sign-in';
	const data = JSON.stringify({
		username,
		password,
	});
	const response = await axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response;
};
