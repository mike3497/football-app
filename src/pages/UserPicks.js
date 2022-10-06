import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PickPercentageChart from '../components/charts/PickPercentageChart';
import PicksTable from '../components/tables/PicksTable';
import UserPicksInfo from '../components/UserPicksInfo';

export default function UserPicks() {
	const { userId } = useParams();

	return (
		<Container className="mt-4">
			<Row className="mb-4">
				<Col>
					<UserPicksInfo userId={userId} />
				</Col>
			</Row>
			<Row className="mb-4">
				<Col>
					<PickPercentageChart userId={userId} />
				</Col>
			</Row>
			<Row>
				<Col>
					<PicksTable userId={userId} />
				</Col>
			</Row>
		</Container>
	);
}
