import React, { Fragment, useEffect, useState, useContext } from 'react';
import GamesTableRow from './GamesTableRow';
import AuthContext from '../../contexts/AuthContext';
import { getGames } from '../../services/games-service';
import { getPicks } from '../../services/picks-service';
import { Card, Table, Form, FloatingLabel } from 'react-bootstrap';

export default function GamesTable() {
	const authContext = useContext(AuthContext);

	const [gamesData, setGamesData] = useState([]);
	const [gamesIsLoading, setGamesIsLoading] = useState(false);
	const [gamesError, setGamesError] = useState(null);

	const [picksData, setPicksData] = useState([]);
	const [picksIsLoading, setPicksIsLoading] = useState(false);
	const [picksError, setPicksError] = useState(null);

	const [week, setWeek] = useState(1);

	useEffect(() => {
		getGamesData();
		getPicksData();
	}, [week]);

	async function getGamesData() {
		setGamesIsLoading(true);
		const data = await getGames(authContext.token, week);
		if (data.error) {
			return;
		}
		setGamesData(data);
		setGamesIsLoading(false);
	}

	async function getPicksData() {
		setPicksIsLoading(true);
		const data = await getPicks(authContext.token, authContext.user.id);
		if (data.error) {
			return;
		}
		setPicksData(data);
		setPicksIsLoading(false);
	}

	return (
		<Card>
			<Card.Body>
				<h3>Games</h3>

				<Fragment>
					<FloatingLabel className="mb-3" controlId="select-week" label="Week">
						<Form.Select onChange={(e) => setWeek(e.target.value)} value={week}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
						</Form.Select>
					</FloatingLabel>

					{gamesIsLoading && picksIsLoading && (
						<Fragment>
							<div className="d-flex justify-content-center my-4">
								<div className="spinner-border" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
							</div>
							<div className="text-center">Loading...</div>
						</Fragment>
					)}

					{!gamesIsLoading && !picksIsLoading && gamesData.length > 0 && (
						<Table
							className="table-layout-fixed"
							striped
							bordered
							hover
							responsive
						>
							<thead>
								<tr>
									<th>Date</th>
									<th>Home</th>
									<th>Away</th>
									<th>Home Score</th>
									<th>Away Score</th>
									<th>Winner</th>
								</tr>
							</thead>
							<tbody>
								{gamesData.map((game) => (
									<GamesTableRow
										key={game.id}
										game={game}
										pick={picksData.find((pick) => pick.gameId === game.id)}
									/>
								))}
							</tbody>
						</Table>
					)}

					{!gamesIsLoading && !picksIsLoading && gamesData.length === 0 && (
						<div className="text-center">No games found.</div>
					)}
				</Fragment>
			</Card.Body>
		</Card>
	);
}
