import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Container, Row, Tab, Table } from 'react-bootstrap';
import { duplicates, getPicks } from '../../services/picks-service';
import AuthContext from '../../contexts/AuthContext';

export default function PicksTable() {
	const authContext = useContext(AuthContext);

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		getPicksData();
	}, []);

	async function getPicksData() {
		setIsLoading(true);
		const data = await getPicks(authContext.token, '6312b06cb35b5ee1c34aa912');
		if (data.error) {
			return;
		}
		setData(data);
		setIsLoading(false);
	}

	return (
		<Card>
			<Card.Body>
				<Table>
					<thead>
						<tr>
							<td>User</td>
							<td>Game</td>
							<td>Team</td>
						</tr>
					</thead>
					<tbody>
						{data.map((pick) => (
							<tr>
								<td>{pick.user}</td>
								<td>{pick.game}</td>
								<td>{pick.teamId}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card.Body>
		</Card>
	);
}
