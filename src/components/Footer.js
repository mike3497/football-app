import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Footer() {
	return (
		<Container>
			<Row>
				<Col className="text-center small text-muted py-2">
					<p className="mb-0">&copy;2022 Michael Carillon</p>
				</Col>
			</Row>
		</Container>
	);
}
