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
				<Link className="navbar-brand" to="/">
					My CFB Pick'em
				</Link>
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
}
