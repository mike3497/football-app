import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { getLeaderboard } from '../../services/leaderboard-service';

export default function LeaderboardTable() {
	const authContext = useContext(AuthContext);

	const [leaderboardData, setLeaderboardData] = useState([]);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getGamesData();
	}, []);

	async function getGamesData() {
		setLoading(true);
		const data = await getLeaderboard(authContext.token);
		if (data.error) {
			return;
		}
		setLeaderboardData(data);
		setLoading(false);
	}

	return (
		<Card>
			<Card.Body>
				<h3>Leaderboard</h3>

				{loading && (
					<Fragment>
						<div className="d-flex justify-content-center my-4">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
						<div className="text-center">Loading...</div>
					</Fragment>
				)}

				{!loading && (
					<Table striped bordered responsive>
						<thead>
							<tr>
								<th>Ranking</th>
								<th>Name</th>
								<th>Correct Picks</th>
								<th>Correct %</th>
							</tr>
						</thead>
						<tbody>
							{leaderboardData.map((row, index) => (
								<tr key={row.user.id}>
									<td>{row.ranking}</td>
									<td>
										<Link to={`/picks/${row.user.id}`}>
											{row.user.firstName} {row.user.lastName}
										</Link>
									</td>
									<td>{row.correctPicks}</td>
									<td>{row.correctPicksPercentage}%</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Card.Body>
		</Card>
	);
}
