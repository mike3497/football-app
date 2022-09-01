import axios from 'axios';

export async function getLeaderboard(token) {
	try {
		const url = `${process.env.REACT_APP_API_BASE_URL}/api/leaderboard`;
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
