import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Fragment } from 'react';
import Admin from './pages/Admin';
import UserPicks from './pages/UserPicks';

function App() {
	return (
		<Fragment>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path="/picks/:userId"
					element={
						<PrivateRoute>
							<UserPicks />
						</PrivateRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<PrivateRoute>
							<Admin />
						</PrivateRoute>
					}
				/>
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Routes>
			<Footer />
		</Fragment>
	);
}

export default App;
