import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
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
					<div className="d-flex justify-content-center my-4">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				)}

				{!loading && (
					<div className="table-responsive">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>Place</th>
									<th>Name</th>
									<th>Correct Picks</th>
									<th>Total Picks</th>
									<th>Correct %</th>
								</tr>
							</thead>
							<tbody>
								{leaderboardData.map((row, index) => (
									<tr key={row.user._id}>
										<td>{index + 1}</td>
										<td>
											{row.user.firstName} {row.user.lastName}
										</td>
										<td>{row.correctPicks}</td>
										<td>{row.totalPicks}</td>
										<td>{row.correctPicksPercentage}%</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Card.Body>
		</Card>
	);
}
