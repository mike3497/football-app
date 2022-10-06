import { Line } from 'react-chartjs-2';
import AuthContext from '../../contexts/AuthContext';
import { getLeaderboardChart } from '../../services/leaderboard-service';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Card } from 'react-bootstrap';

export default function PickPercentageChart({ userId }) {
	const authContext = useContext(AuthContext);

	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Week',
				},
			},
			y: {
				title: {
					display: true,
					text: 'Correct Pick %',
				},
			},
		},
	};

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		setIsLoading(true);
		const data = await getLeaderboardChart(authContext.token, userId);
		if (data.error) {
			return;
		}
		setData(data);
		setIsLoading(false);
	}

	if (isLoading) {
		return (
			<Fragment>
				<div className="d-flex justify-content-center my-4">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
				<div className="text-center">Loading...</div>
			</Fragment>
		);
	}

	if (!isLoading && !data && !error) {
		return <Fragment></Fragment>;
	}

	if (error) {
		return <Fragment></Fragment>;
	}

	return (
		<Card>
			<Card.Body>
				<Line
					data={{
						labels: data.labels,
						datasets: [{ data: data.data, borderColor: 'rgb(75, 192, 192)' }],
					}}
					options={options}
				/>
			</Card.Body>
		</Card>
	);
}
