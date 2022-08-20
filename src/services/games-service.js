import axios from 'axios';

export async function getGames(token) {
	const response = await axios.get('http://localhost:3000/api/games', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	return response.data;
}
