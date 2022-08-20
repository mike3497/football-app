import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { addPick } from '../../services/picks-service';

export default function GamesTableRow({ game, pick }) {
	const authContext = useContext(AuthContext);

	const [selectedValue, setSelectedValue] = useState(pick?.teamId || '');

	async function handleChange(e) {
		const teamId = e.target.value;
		const gameId = e.target.dataset.gameId;

		setSelectedValue(teamId);

		await addPick(authContext.token, gameId, teamId);
	}

	return (
		<tr>
			<td>{new Date(game.date).toLocaleString()}</td>
			<td>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name={`radio-${game._id}`}
						id={`radio-${game.homeTeamId}`}
						checked={selectedValue === game.homeTeamId}
						onChange={handleChange}
						value={game.homeTeamId}
						data-game-id={game._id}
					/>
					<label
						className="form-check-label"
						htmlFor={`radio-${game.homeTeamId}`}
					>
						{game.homeTeam}
					</label>
				</div>
			</td>
			<td>
				<div className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name={`radio-${game._id}`}
						id={`radio-${game.awayTeamId}`}
						checked={selectedValue === game.awayTeamId}
						onChange={handleChange}
						value={game.awayTeamId}
						data-game-id={game._id}
					/>
					<label
						className="form-check-label"
						htmlFor={`radio-${game.awayTeamId}`}
					>
						{game.awayTeam}
					</label>
				</div>
			</td>
		</tr>
	);
}
