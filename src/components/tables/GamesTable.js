import React from 'react';
import GamesTableRow from './GamesTableRow';

export default function GamesTable({ games, picks }) {
	return (
		<div className="table-responsive">
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Date</th>
						<th>Home Team</th>
						<th>Away Team</th>
					</tr>
				</thead>
				<tbody>
					{games.map((game) => (
						<GamesTableRow
							key={game._id}
							game={game}
							pick={picks.find((pick) => pick.gameId === game._id)}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
