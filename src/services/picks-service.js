import axios from 'axios';

export async function getPicks(token, userId) {
	try {
		const url = `${process.env.REACT_APP_API_BASE_URL}/api/picks?userId=${userId}`;
		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
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

export async function addPick(token, gameId, teamId) {
	try {
		const url = `${process.env.REACT_APP_API_BASE_URL}/api/picks`;
		const body = {
			gameId,
			teamId,
		};
		const response = await axios.post(url, JSON.stringify(body), {
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
