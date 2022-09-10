import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Card, Table, FloatingLabel, Form } from 'react-bootstrap';
import { getPicks } from '../../services/picks-service';
import AuthContext from '../../contexts/AuthContext';
import PicksTableRow from './PicksTableRow';

export default function PicksTable({ userId }) {
	const authContext = useContext(AuthContext);

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [week, setWeek] = useState(1);

	useEffect(() => {
		getData();
	}, [week]);

	async function getData() {
		setIsLoading(true);
		const data = await getPicks(authContext.token, userId, week);
		if (data.error) {
			return;
		}
		setData(data);
		setIsLoading(false);
	}

	return (
		<Card>
			<Card.Body>
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

				{isLoading && (
					<Fragment>
						<div className="d-flex justify-content-center my-4">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
						<div className="text-center">Loading...</div>
					</Fragment>
				)}

				{!isLoading && data.length > 0 && (
					<Fragment>
						<Table striped bordered responsive>
							<thead>
								<tr>
									<td>Date</td>
									<td>Home</td>
									<td>Away</td>
								</tr>
							</thead>
							<tbody>
								{data.map((pick) => (
									<PicksTableRow key={pick.id} pick={pick} />
								))}
							</tbody>
						</Table>
					</Fragment>
				)}

				{!isLoading && data.length === 0 && (
					<p className="text-center mb-0">No picks found.</p>
				)}
			</Card.Body>
		</Card>
	);
}
