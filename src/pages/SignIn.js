import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../services/user-service';
import AuthContext from '../contexts/AuthContext';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function Signin() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	async function handleFormSubmit(e) {
		e.preventDefault();

		setButtonDisabled(true);
		setErrorMessage('');

		const result = await signIn(username, password);
		if (result.token) {
			authContext.signIn(result.token);
			setErrorMessage('');
			navigate('/');
		} else {
			setErrorMessage(result.message);
		}

		setButtonDisabled(false);
	}

	return (
		<Container className="mt-4">
			<Row className="justify-content-center">
				<Col sm={4}>
					<Card>
						<Card.Body>
							<h1>Sign In</h1>

							{errorMessage && (
								<div className="alert alert-danger" role="alert">
									<i className="fa-solid fa-circle-exclamation"></i>{' '}
									{errorMessage}
								</div>
							)}

							<Form onSubmit={handleFormSubmit}>
								<Form.Group className="mb-3" controlId="txt-username">
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="txt-password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Form.Group>
								<Button
									variant="primary"
									className="w-100 mb-2"
									type="submit"
									disabled={buttonDisabled}
								>
									Sign in
								</Button>
								<p className="text-center small mb-0">
									Need an account? <Link to="/sign-up">Sign up</Link>
								</p>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
