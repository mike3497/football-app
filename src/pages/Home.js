import { useEffect, useState, useContext } from 'react';
import GamesTable from '../components/tables/GamesTable';
import AuthContext from '../contexts/AuthContext';
import { getGames } from '../services/games-service';
import { getPicks } from '../services/picks-service';

export default function Home() {
	const authContext = useContext(AuthContext);

	const [games, setGames] = useState([]);
	const [picks, setPicks] = useState([]);

	useEffect(() => {
		getGamesData();
		getPicksData();
	}, []);

	async function getGamesData() {
		const data = await getGames(authContext.token);
		setGames(data);
	}

	async function getPicksData() {
		const data = await getPicks(authContext.token);
		setPicks(data);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>Games</h1>
					<p>Make your picks for this week!</p>
					<h3>Week 1</h3>
					{games.length > 0 && <GamesTable games={games} picks={picks} />}
				</div>
			</div>
		</div>
	);
}
