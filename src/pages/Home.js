import { Container, Row, Col } from 'react-bootstrap';
import GamesTable from '../components/tables/GamesTable';
import LeaderboardTable from '../components/tables/LeaderboardTable';

export default function Home() {
	return (
		<Container className="mt-4">
			<Row className="mb-4">
				<Col>
					<LeaderboardTable />
				</Col>
			</Row>
			<Row>
				<Col>
					<GamesTable />
				</Col>
			</Row>
		</Container>
	);
}
