import React from 'react';

export default function PicksTableRow({ index, pick }) {
	const game = pick.game;
	const selectedValue = pick?.teamId || '';

	let color = '';

	if (pick && pick.game.winningTeamId) {
		color = '#F7DEDE';

		if (pick.teamId === pick.game.winningTeamId) {
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
						checked={selectedValue === game.homeTeamId}
						value={game.homeTeamId}
						data-game-id={game.id}
						disabled={true}
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
						checked={selectedValue === game.awayTeamId}
						value={game.awayTeamId}
						disabled={true}
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
