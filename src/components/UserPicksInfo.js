import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Card, Table, FloatingLabel, Form } from 'react-bootstrap';
import AuthContext from '../contexts/AuthContext';
import { getUser } from '../services/user-service';

function UserPicksInfo({ userId }) {
	const authContext = useContext(AuthContext);

	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		setIsLoading(true);
		const data = await getUser(authContext.token, userId);
		if (data.error) {
			return;
		}
		setData(data);
		setIsLoading(false);
	}

	return (
		<Card>
			<Card.Body>
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

				{!isLoading && (
					<h1 className="m-0">
						{data.firstName} {data.lastName} Picks
					</h1>
				)}
			</Card.Body>
		</Card>
	);
}

export default UserPicksInfo;
