import React from 'react';

export default function Alert({ message, type }) {
	if (type === 'success') {
		return (
			<div className="alert alert-success" role="alert">
				<i className="fa-solid fa-circle-check"></i>&nbsp;
				{message}
			</div>
		);
	} else if (type === 'danger') {
		return (
			<div className="alert alert-danger" role="alert">
				<i className="fa-solid fa-circle-exclamation"></i>&nbsp;
				{message}
			</div>
		);
	}

	return;
}
