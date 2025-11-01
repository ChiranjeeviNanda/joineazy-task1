import { createContext, useState, useEffect, useMemo } from "react";
import {
	MOCK_ASSIGNMENTS,
	MOCK_SUBMISSIONS,
	MOCK_USERS,
	LIGHT_THEME,
	DARK_THEME,
} from "../utils/constants";

export const AppContext = createContext(null);

/**
 * Provides application-level state, including user authentication,
 * theme selection, and core data to the component tree.
 */
export const AppContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [allUsers] = useState(MOCK_USERS);
	const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
	const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);

	const initialTheme = localStorage.getItem("theme") || LIGHT_THEME;
	const [theme, setTheme] = useState(initialTheme);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
		);
	};

	const logout = () => setCurrentUser(null);

	const contextValue = useMemo(
		() => ({
			// Auth & User
			currentUser,
			setCurrentUser,
			allUsers,
			logout,
			// Data
			assignments,
			setAssignments,
			submissions,
			setSubmissions,
			// Theme
			theme,
			toggleTheme,
			LIGHT_THEME,
			DARK_THEME,
		}),
		[currentUser, assignments, submissions, theme]
	);

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
};
