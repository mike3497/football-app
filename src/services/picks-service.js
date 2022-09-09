import axios from 'axios';

export async function getPicks(token, userId, week) {
	try {
		let url = new URL(`${process.env.REACT_APP_API_BASE_URL}/api/picks`);

		if (userId) {
			url.searchParams.append('userId', userId);
		}

		if (week) {
			url.searchParams.append('week', week);
		}

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
