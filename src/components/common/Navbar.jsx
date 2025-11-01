/**
 * Global navigation bar that remains fixed at the top of the interface.
 * Adapts dynamically based on the current theme and authentication state.
 */

import { Link } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

// Icon Imports
import { LogOut, Sun, Moon, LayoutDashboard, User } from "lucide-react";

const Navbar = () => {
	// Access global state and actions from the context
	const { currentUser, logout, theme, toggleTheme, LIGHT_THEME } =
		useAppContext();

	return (
		<nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
			<div className="flex items-center justify-between gap-4 bg-base-100/90 px-6 py-3 rounded-2xl backdrop-blur-xl border border-base-content/25 shadow-xl">
				
				{/* Application Logo */}
				<Link to="/dashboard" className="flex items-center gap-4 group">
					<LayoutDashboard className="w-6 h-6 mr-1 text-primary" />
					<span className="text-xl sm:text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-200">
						<p className="hidden sm:inline">Assignment</p> Dashboard
					</span>
				</Link>

				{/* Right-Side Controls (User Info, Theme, Logout) */}
				<div className="flex items-center gap-3">
					
					{/* Display current user info (When authenticated only) */}
					{currentUser && (
						<div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-base-200 rounded-full border border-base-content/10">
							<User className="size-4 text-primary" />
							<span className="text-sm font-semibold text-base-content/80 capitalize">
								{currentUser.role} ({currentUser.id})
							</span>
						</div>
					)}

					{/* Theme Toggle Button */}
					<div
						className="tooltip tooltip-bottom"
						data-tip="Switch Theme"
					>
						<button
							onClick={toggleTheme}
							className="btn btn-ghost btn-circle"
							aria-label="Toggle theme"
						>
							{theme === LIGHT_THEME ? (
								<Sun className="size-5" />
							) : (
								<Moon className="size-5" />
							)}
						</button>
					</div>

					{/* Logout Button — visible only when user is logged in */}
					{currentUser && (
						<Link
							to="/login"
							onClick={logout}
							className="btn btn-outline btn-sm text-base-content border-base-content/50 hover:bg-base-focus group"
							aria-label="Logout"
						>
							<LogOut className="size-5 transition-transform group-hover:scale-110" />
							<span className="hidden sm:inline font-semibold">
								Logout
							</span>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
