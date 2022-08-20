import axios from 'axios';

export const signUp = async (username, password, firstName, lastName) => {
	try {
		const url = `${process.env.REACT_APP_API_BASE_URL}/users/sign-up`;
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
		return response.data;
	} catch (error) {
		return error.toJSON();
	}
};

export const signIn = async (username, password) => {
	try {
		const url = `${process.env.REACT_APP_API_BASE_URL}/users/sign-in`;
		const data = JSON.stringify({
			username,
			password,
		});
		const response = await axios.post(url, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		return error.toJSON();
	}
};
