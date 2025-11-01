import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./hooks/useAppContext";

// Page Imports
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// Component Imports
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
	const { currentUser, theme } = useAppContext();

	return (
		<div
			className="min-h-screen bg-base-100 text-base-content"
			data-theme={theme}
		>
			<Navbar />

			<main className="container mx-auto p-4 md:p-8">
				<Routes>
					{/* Public Route */}
					<Route path="/login" element={<LoginPage />} />

					{/* Protected Route */}
					<Route
						path="/dashboard"
						element={<ProtectedRoute element={DashboardPage} />}
					/>

					{/* Default Route/Redirect: Redirects authenticated users to dashboard, others to login. */}
					<Route
						path="*"
						element={
							<Navigate
								to={currentUser ? "/dashboard" : "/login"}
								replace
							/>
						}
					/>
				</Routes>
			</main>
		</div>
	);
};

export default App;
