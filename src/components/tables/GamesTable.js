import React, { Fragment, useEffect, useState, useContext } from 'react';
import GamesTableRow from './GamesTableRow';
import AuthContext from '../../contexts/AuthContext';
import { getGames } from '../../services/games-service';
import { getPicks } from '../../services/picks-service';
import { Card, Table, Form, FloatingLabel } from 'react-bootstrap';

export default function GamesTable() {
	const authContext = useContext(AuthContext);

	const [gamesData, setGamesData] = useState([]);
	const [gamesError, setGamesError] = useState(null);

	const [picksData, setPicksData] = useState([]);
	const [picksError, setPicksError] = useState(null);

	const [activeRequests, setActiveRequests] = useState(0);

	const [week, setWeek] = useState(getWeek());

	useEffect(() => {
		getGamesData();
		getPicksData();
	}, [week]);

	async function getGamesData() {
		setActiveRequests((activeRequests) => activeRequests + 1);
		const data = await getGames(authContext.token, week);
		if (data.error) {
			return;
		}
		setGamesData(data);
		setActiveRequests((activeRequests) => activeRequests - 1);
	}

	async function getPicksData() {
		setActiveRequests((activeRequests) => activeRequests + 1);
		const data = await getPicks(authContext.token, authContext.user.id);
		if (data.error) {
			return;
		}
		setPicksData(data);
		setActiveRequests((activeRequests) => activeRequests - 1);
	}

	function getWeek() {
		const today = new Date();

		const weeks = [
			{ week: 1, startDate: '8/27/22', endDate: '9/5/22' },
			{ week: 2, startDate: '9/9/22', endDate: '9/10/22' },
			{ week: 3, startDate: '9/16/22', endDate: '9/18/22' },
			{ week: 4, startDate: '9/22/22', endDate: '9/24/22' },
			{ week: 5, startDate: '9/29/22', endDate: '10/1/22' },
			{ week: 6, startDate: '10/7/22', endDate: '10/8/22' },
			{ week: 7, startDate: '10/12/22', endDate: '10/16/22' },
			{ week: 8, startDate: '10/19/22', endDate: '10/22/22' },
			{ week: 9, startDate: '10/27/22', endDate: '10/30/22' },
			{ week: 10, startDate: '11/1/22', endDate: '11/5/22' },
			{ week: 11, startDate: '11/8/22', endDate: '11/12/22' },
			{ week: 12, startDate: '11/15/22', endDate: '11/19/22' },
			{ week: 13, startDate: '11/22/22', endDate: '11/26/22' },
		];

		let currentWeek = 1;

		for (let i = 0; i < weeks.length; i++) {
			const week = weeks[i];

			if (
				today >= new Date(week.startDate) &&
				today <= new Date(week.endDate)
			) {
				currentWeek = week.week;
				break;
			}

			if (
				i !== weeks.length - 1 &&
				today >= new Date(week.endDate) &&
				today <= new Date(weeks[i + 1].startDate)
			) {
				currentWeek = weeks[i + 1].week;
				break;
			}

			if (i === weeks.length - 1) {
				currentWeek = weeks[i].week;
				break;
			}
		}

		return currentWeek;
	}

	return (
		<Card>
			<Card.Body>
				<p>activeRequests: {activeRequests}</p>
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

					{activeRequests > 0 && (
						<Fragment>
							<div className="d-flex justify-content-center my-4">
								<div className="spinner-border" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
							</div>
							<div className="text-center">Loading...</div>
						</Fragment>
					)}

					{activeRequests === 0 && gamesData.length > 0 && (
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>Date</th>
									<th>Home</th>
									<th>Away</th>
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

					{activeRequests === 0 && gamesData.length === 0 && (
						<div className="text-center">No games found.</div>
					)}
				</Fragment>
			</Card.Body>
		</Card>
	);
}
