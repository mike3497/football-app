import React, { Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function SiteNavbar() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	async function handleSignOut() {
		authContext.signOut();
		navigate('/sign-in');
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand>My CFB Pick'em</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{!authContext.isLoggedIn && (
						<Nav className="ms-auto">
							<Link className="nav-link" to="/sign-in">
								Sign In
							</Link>
							<Link className="nav-link" to="/sign-up">
								Sign Up
							</Link>
						</Nav>
					)}
					{authContext.isLoggedIn && (
						<Nav className="ms-auto">
							<NavDropdown
								title={
									<Fragment>
										<i className="fa-solid fa-circle-user"></i>&nbsp;
										{authContext.user.firstName} {authContext.user.lastName}
									</Fragment>
								}
								id="basic-nav-dropdown"
							>
								<NavDropdown.Item onClick={handleSignOut}>
									Sign Out
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);

	// return (
	// 	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
	// 		<div className="container">
	// 			<Link className="navbar-brand" to="/">
	// 				Football App
	// 			</Link>
	// 			<button
	// 				className="navbar-toggler"
	// 				type="button"
	// 				data-bs-toggle="collapse"
	// 				data-bs-target="#navbarNav"
	// 				aria-controls="navbarNav"
	// 				aria-expanded="false"
	// 				aria-label="Toggle navigation"
	// 			>
	// 				<span className="navbar-toggler-icon"></span>
	// 			</button>
	// 			<div className="collapse navbar-collapse" id="navbarNav">
	// 				{authContext.isLoggedIn && (
	// 					<ul className="navbar-nav">
	// 						<li className="nav-item">
	// 							<Link className="nav-link" to="/">
	// 								Home
	// 							</Link>
	// 						</li>
	// 					</ul>
	// 				)}
	// 				<ul className="navbar-nav ms-auto">
	// 					{authContext.isLoggedIn && (
	// 						<li className="nav-item dropdown">
	// 							<a
	// 								className="nav-link dropdown-toggle"
	// 								href="#"
	// 								data-bs-toggle="dropdown"
	// 								aria-expanded="false"
	// 							>
	// 								<i className="fa-solid fa-circle-user"></i>&nbsp;
	// 								{authContext.user?.firstName} {authContext.user?.lastName}
	// 							</a>
	// 							<ul className="dropdown-menu">
	// 								<li>
	// 									<button className="dropdown-item" onClick={handleSignOut}>
	// 										Sign out
	// 									</button>
	// 								</li>
	// 							</ul>
	// 						</li>
	// 					)}
	// 					{!authContext.isLoggedIn && (
	// 						<Fragment>
	// 							<li className="nav-item">
	// 								<Link className="nav-link" to="/sign-in">
	// 									Sign in
	// 								</Link>
	// 							</li>
	// 							<li className="nav-item">
	// 								<Link className="nav-link" to="/sign-up">
	// 									Sign up
	// 								</Link>
	// 							</li>
	// 						</Fragment>
	// 					)}
	// 				</ul>
	// 			</div>
	// 		</div>
	// 	</nav>
	// );
}
