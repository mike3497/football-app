import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PicksTable from '../components/tables/PicksTable';

export default function UserPicks() {
	const { userId } = useParams();

	return (
		<Container className="mt-4">
			<Row>
				<Col>
					<PicksTable userId={userId} />
				</Col>
			</Row>
		</Container>
	);
}
