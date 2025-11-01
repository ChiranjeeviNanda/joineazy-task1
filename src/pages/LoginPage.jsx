/**
 * Renders the login interface with role selection, validation,
 * and mock login logic. Authenticates users against the mock `allUsers` list
 * and redirects authenticated users to the dashboard.
 */

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import FormInput from "../components/common/FormInput";
import { LogIn, User, Lock, Users, XCircle } from "lucide-react";


const LoginPage = () => {
	const { currentUser, setCurrentUser, allUsers } = useAppContext();
	const navigate = useNavigate();

	// Redirect authenticated users to dashboard
	if (currentUser) {
		return <Navigate to="/dashboard" replace />;
	}

	// State Management
	const [userId, setUserId] = useState("");
	const [password, setPassword] = useState("password");
	const [role, setRole] = useState("");
	const [loginError, setLoginError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Handles form submission for mock authentication.
	 * Matches entered credentials against mock users
	 * and sets current user if validation succeeds.
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoginError("");
		setIsLoading(true);

		// Simulate network delay
		setTimeout(() => {
			// Find user by ID
			const foundUser = allUsers.find(
				(u) => u.id.toLowerCase() === userId.toLowerCase()
			);

			// Validate credentials (mock password always 'password')
			if (
				foundUser &&
				password === "password" &&
				foundUser.role === role
			) {
				setCurrentUser(foundUser);
				navigate("/dashboard", { replace: true });
			} else {
				// Handle validation errors
				let errorMessage = "Invalid User ID or Password.";
				if (!foundUser) {
					errorMessage = "User ID not found.";
				} else if (foundUser.role !== role) {
					errorMessage = `User ID ${userId} does not match the selected role.`;
				}
				setLoginError(errorMessage);
			}

			setIsLoading(false);
		}, 500);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="card bg-base-100 rounded-2xl shadow-2xl border border-base-content/25 transition-all duration-300">
					<form
						className="card-body p-6 sm:p-8 lg:p-10 space-y-3"
						onSubmit={handleSubmit}
					>
						{/* Header */}
						<div className="text-center mb-4">
							<h2 className="text-3xl font-extrabold text-primary flex items-center justify-center">
								<LogIn className="size-6 mr-2" />
								Dashboard Login
							</h2>
							<p className="text-base text-base-content/70 mt-2">
								Please select your role to continue.
							</p>
						</div>

						{/* Role Selector */}
						<div className="form-control group">
							<label className="label pb-1">
								<span className="label-text text-base font-semibold text-base-content/90">
									<Users className="size-4 mr-1 inline-block align-text-bottom text-primary" />{" "}
									Select Role *
								</span>
							</label>
							<select
								className="select select-bordered select-lg w-full rounded-2xl transition-all duration-150 focus:shadow-lg border-2 hover:border-primary/50 focus:border-primary appearance-none"
								value={role}
								onChange={(e) => {
									setRole(e.target.value);
									setLoginError("");
								}}
								required
							>
								<option value="" disabled>
									Choose your role to continue
								</option>
								<option value="student">Student</option>
								<option value="admin">Admin</option>
							</select>
						</div>

						{/* Conditional Fields */}
						{role && (
							<>
								<FormInput
									id="userId"
									label="User ID"
									type="text"
									value={userId}
									onChange={(e) => setUserId(e.target.value)}
									placeholder="e.g., s1 or a1"
									Icon={User}
									required
								/>

								<FormInput
									id="password"
									label="Password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="•••••••• (Mock: password)"
									Icon={Lock}
									required
								/>

								{/* Error Message */}
								{loginError && (
									<div
										role="alert"
										className="alert alert-error rounded-xl border-2 border-error"
									>
										<XCircle className="size-5" />
										<span className="font-semibold">
											{loginError}
										</span>
									</div>
								)}

								{/* Submit Button */}
								<div className="form-control mt-3">
									<button
										type="submit"
										className="btn btn-primary btn-lg btn-block rounded-2xl text-base-100 text-lg font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg transition duration-300"
										disabled={isLoading}
									>
										{!isLoading ? (
											<>
												<LogIn
													className="size-6 mr-2"
													aria-hidden="true"
												/>
												Login
											</>
										) : (
											<>
												<span
													className="loading loading-dots size-6 mr-2"
													aria-hidden="true"
												/>
												Logging in...
											</>
										)}
									</button>
								</div>
							</>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
