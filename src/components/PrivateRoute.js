import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
	const authContext = useContext(AuthContext);

	return authContext.isLoggedIn ? children : <Navigate to="/sign-in" />;
}
