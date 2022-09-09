import React, { useState, useContext } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { getNewGames, updateGames } from '../../services/games-service';
import AuthContext from '../../contexts/AuthContext';

export default function NewGames() {
	const authContext = useContext(AuthContext);

	const [year, setYear] = useState(2022);
	const [week, setWeek] = useState(1);
	const [disabled, setDisabled] = useState(false);

	async function handleFormSubmit(e) {
		e.preventDefault();

		setDisabled(true);

		const response = await getNewGames(authContext.token, year, week);

		setDisabled(false);
	}

	return (
		<Card>
			<Card.Header>Get New Games</Card.Header>
			<Card.Body>
				<Form onSubmit={handleFormSubmit}>
					<Form.Group className="mb-3" controlId="txt-year">
						<Form.Label>Year</Form.Label>
						<Form.Control
							type="text"
							value={year}
							onChange={(e) => setYear(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="txt-week">
						<Form.Label>Week</Form.Label>
						<Form.Control
							type="text"
							value={week}
							onChange={(e) => setWeek(e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" disabled={disabled} type="submit">
						Update
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
