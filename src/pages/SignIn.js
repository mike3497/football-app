import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../services/user-service';
import AuthContext from '../contexts/AuthContext';

export default function Signin() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	async function handleFormSubmit(e) {
		e.preventDefault();

		setButtonDisabled(true);
		setErrorMessage('');

		const result = await signIn(username, password);
		if (result.token) {
			authContext.signIn(result.token);
			navigate('/');
		} else {
			setButtonDisabled(false);
			setErrorMessage(result.message);
		}
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-sm-4">
					<h1>Sign In</h1>

					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							<i className="fa-solid fa-circle-exclamation"></i> {errorMessage}
						</div>
					)}

					<form onSubmit={handleFormSubmit}>
						<div className="mb-2">
							<label className="form-label">Username</label>
							<input
								className="form-control"
								type="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<label className="form-label">Password</label>
							<input
								className="form-control"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							className="btn btn-primary w-100 mb-2"
							type="submit"
							disabled={buttonDisabled}
						>
							Sign in
						</button>

						<p className="text-center small">
							Need an account? <Link to="/sign-up">Sign up</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
