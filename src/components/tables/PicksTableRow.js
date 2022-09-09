import React from 'react';

export default function PicksTableRow({ index, pick }) {
	let pickedTeam = '';

	if (pick.teamId === pick.game.homeTeamId) {
		pickedTeam = pick.game.homeTeam;
	} else if (pick.teamId === pick.game.awayTeamId) {
		pickedTeam = pick.game.awayTeam;
	}

	let color = '#F7DEDE';

	if (pick.teamId === pick.game.winningTeamId) {
		color = '#F9FCEE';
	}

	return (
		<tr style={{ backgroundColor: color }}>
			<td>{new Date(pick.game.date).toLocaleString()}</td>
			<td>{pick.game.homeTeam}</td>
			<td>{pick.game.awayTeam}</td>
			<td>{pickedTeam}</td>
			<td>{pick.game.winningTeam}</td>
		</tr>
	);
}
