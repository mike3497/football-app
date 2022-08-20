import axios from 'axios';

export async function getGames(token) {
	const response = await axios.get(
		`${process.env.REACT_APP_API_BASE_URL}/games`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		}
	);
	return response.data;
}
