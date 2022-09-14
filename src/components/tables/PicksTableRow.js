import React from 'react';

export default function PicksTableRow({ game, pick }) {
	const selectedValue = pick?.teamId || '';

	let color = '';

	if (game.winningTeam) {
		color = '#F7DEDE';

		if (pick && pick.teamId === pick.game.winningTeamId) {
			color = '#F9FCEE';
		}
	}

	return (
		<tr style={{ backgroundColor: color }}>
			<td>{new Date(game.date).toLocaleString()}</td>
			<td>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name={`radio-${game.id}`}
						checked={selectedValue === game.homeTeamId}
						disabled
					/>
					<label
						className="form-check-label"
						htmlFor={`radio-${game.homeTeamId}`}
					>
						<span
							className={game.winningTeam === game.homeTeam ? 'fw-bolder' : ''}
						>
							{game.homeTeam}
							<br />
							{game.homeTeamScore}
						</span>
					</label>
				</div>
			</td>
			<td>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name={`radio-${game.id}`}
						checked={selectedValue === game.awayTeamId}
						disabled
					/>
					<label
						className="form-check-label"
						htmlFor={`radio-${game.awayTeamId}`}
					>
						<span
							className={game.winningTeam === game.awayTeam ? 'fw-bolder' : ''}
						>
							{game.awayTeam}
							<br />
							{game.awayTeamScore}
						</span>
					</label>
				</div>
			</td>
		</tr>
	);
}
