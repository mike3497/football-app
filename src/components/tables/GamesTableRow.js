import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { addPick } from '../../services/picks-service';

export default function GamesTableRow({ game, pick }) {
	const authContext = useContext(AuthContext);

	const gameDate = new Date(game.date);
	const currentDate = new Date();

	const [selectedValue, setSelectedValue] = useState(pick?.teamId || '');
	const [disabled, setDisabled] = useState(
		currentDate > subtractHours(gameDate, process.env.REACT_APP_PICK_HOURS)
			? true
			: false
	);

	async function handleChange(e) {
		const teamId = e.target.value;
		const gameId = e.target.dataset.gameId;

		setSelectedValue(teamId);
		setDisabled(true);
		const result = await addPick(authContext.token, gameId, teamId);
		setDisabled(false);
	}

	function subtractHours(date, hours) {
		date.setHours(date.getHours() - hours);
		return date;
	}

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
						id={`radio-${game.homeTeamId}`}
						checked={selectedValue === game.homeTeamId}
						onChange={handleChange}
						value={game.homeTeamId}
						data-game-id={game.id}
						disabled={disabled}
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
						id={`radio-${game.awayTeamId}`}
						checked={selectedValue === game.awayTeamId}
						onChange={handleChange}
						value={game.awayTeamId}
						data-game-id={game.id}
						disabled={disabled}
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
