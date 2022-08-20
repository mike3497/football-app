import React, { Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function Navbar() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	async function handleSignOut() {
		authContext.signOut();
		navigate('/sign-in');
	}

	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">
					Football App
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{authContext.isLoggedIn && (
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</li>
						</ul>
					)}
					<ul className="navbar-nav ms-auto">
						{authContext.isLoggedIn && (
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i className="fa-solid fa-circle-user"></i>&nbsp;
									{authContext.user?.firstName} {authContext.user?.lastName}
								</a>
								<ul className="dropdown-menu">
									<li>
										<button className="dropdown-item" onClick={handleSignOut}>
											Sign out
										</button>
									</li>
								</ul>
							</li>
						)}
						{!authContext.isLoggedIn && (
							<Fragment>
								<li className="nav-item">
									<Link className="nav-link" to="/sign-in">
										Sign in
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/sign-up">
										Sign up
									</Link>
								</li>
							</Fragment>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
