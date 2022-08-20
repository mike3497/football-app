import axios from 'axios';

export async function getPicks(token) {
	const response = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/picks`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
}

export async function addPick(token, gameId, teamId) {
	const body = {
		gameId,
		teamId,
	};
	const response = await axios.post(
		`${process.env.REACT_APP_API_BASE_URL}/picks`,
		JSON.stringify(body),
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	);
	return response.data;
}
