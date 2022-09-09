import React, { useState, useContext } from 'react';
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap';
import { updateGames } from '../services/games-service';
import AuthContext from '../contexts/AuthContext';
import UpdateGames from '../components/admin/UpdateGames';
import NewGames from '../components/admin/NewGames';

export default function Admin() {
	return (
		<Container className="mt-4">
			<Row>
				<Col>
					<h1>Admin</h1>
				</Col>
			</Row>
			<Row className="mb-4">
				<Col>
					<NewGames />
				</Col>
			</Row>
			<Row>
				<Col>
					<UpdateGames />
				</Col>
			</Row>
		</Container>
	);
}
