import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { signUp } from '../services/user-service';

export default function Signup() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	async function handleFormSubmit(e) {
		e.preventDefault();

		setButtonDisabled(true);
		setErrorMessage('');

		const result = await signUp(username, password, firstName, lastName);
		if (result.data.token) {
			authContext.signIn(result.data.token);
			navigate('/');
		} else {
			setButtonDisabled(false);
			setErrorMessage(result.data.message);
		}
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-sm-4">
					<h1>Sign Up</h1>

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
						<div className="mb-2">
							<label className="form-label">First Name</label>
							<input
								className="form-control"
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<label className="form-label">Last Name</label>
							<input
								className="form-control"
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<button
							className="btn btn-primary w-100 mb-2"
							type="submit"
							disabled={buttonDisabled}
						>
							Sign up
						</button>
						<p className="text-center small">
							Already have an account? <Link to="/sign-in">Sign in</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
