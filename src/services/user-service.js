import axios from 'axios';

export const signUp = async (username, password, firstName, lastName) => {
	const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/sign-up`;
	const data = {
		username,
		password,
		firstName,
		lastName,
	};
	try {
		const response = await axios.post(url, JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		if (error.response.data) {
			return error.response.data;
		}
		return error;
	}
};

export async function signIn(username, password) {
	const url = `${process.env.REACT_APP_API_BASE_URL}/api/users/sign-in`;
	const data = {
		username,
		password,
	};
	try {
		const response = await axios.post(url, JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		if (error.response.data) {
			return error.response.data;
		}
		return error;
	}
}
