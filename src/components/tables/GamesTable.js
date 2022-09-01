import React, { Fragment, useEffect, useState, useContext } from 'react';
import GamesTableRow from './GamesTableRow';
import AuthContext from '../../contexts/AuthContext';
import { getGames } from '../../services/games-service';
import { getPicks } from '../../services/picks-service';
import { Card, Table, Form, FloatingLabel } from 'react-bootstrap';

export default function GamesTable() {
	const authContext = useContext(AuthContext);

	const [gamesData, setGamesData] = useState([]);
	const [picksData, setPicksData] = useState([]);
	const [week, setWeek] = useState(1);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getGamesData();
		getPicksData();
	}, [week]);

	async function getGamesData() {
		setLoading(true);
		const data = await getGames(authContext.token, week);
		if (data.error) {
			return;
		}
		setGamesData(data);
		setLoading(false);
	}

	async function getPicksData() {
		setLoading(true);
		const data = await getPicks(authContext.token);
		if (data.error) {
			return;
		}
		setPicksData(data);
		setLoading(false);
	}

	return (
		<Card>
			<Card.Body>
				<h3>Games</h3>

				<Fragment>
					{/* <p className="small text-muted">Last Updated: 8/22/2022 10:00PM</p> */}

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
						</Form.Select>
					</FloatingLabel>

					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Date</th>
								<th>Home</th>
								<th>Away</th>
								<th>Winner</th>
							</tr>
						</thead>
						<tbody>
							{loading && (
								<div className="d-flex justify-content-center my-4">
									<div className="spinner-border" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
							)}

							{!loading &&
								gamesData.map((game) => (
									<GamesTableRow
										key={game._id}
										game={game}
										pick={picksData.find((pick) => pick.game === game._id)}
									/>
								))}
						</tbody>
					</Table>
					{/* <p className="small text-muted">Last Updated: 8/22/2022 10:00PM</p> */}
				</Fragment>
			</Card.Body>
		</Card>
	);
}
