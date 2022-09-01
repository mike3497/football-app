import axios from 'axios';

export async function getGames(token, week) {
	try {
		const url = `${process.env.REACT_APP_API_BASE_URL}/api/games?week=${week}`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		if (!error.response.data) {
			return { error: error.message };
		}

		return { error: error.response.data.message };
	}
}

export async function updateGames(token, year, week) {
	try {
		const url = `${process.env.REACT_APP_API_BASE_URL}/api/games`;
		const data = {
			year,
			week,
		};
		const response = await axios.post(url, JSON.stringify(data), {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		if (!error.response.data) {
			return { error: error.message };
		}

		return { error: error.response.data.message };
	}
}
