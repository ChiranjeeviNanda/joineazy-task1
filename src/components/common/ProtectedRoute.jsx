/**
 * Component wrapper used in routes to guard access based on user authentication status.
 * It redirects unauthenticated users to the login page..
 */

import { Navigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

const ProtectedRoute = ({ element: Element }) => {
	const { currentUser } = useAppContext();

	return currentUser ? <Element /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
