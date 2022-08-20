import axios from 'axios';

export async function getPicks(token) {
	const response = await axios.get('http://localhost:3000/api/picks', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
}

export async function addPick(token, gameId, teamId) {
	const body = {
		gameId,
		teamId,
	};
	const response = await axios.post(
		'http://localhost:3000/api/picks',
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
