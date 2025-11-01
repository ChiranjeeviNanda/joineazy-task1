import { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Custom hook for accessing the application's global context.
 * Throws an error if used outside of the AppContextProvider.
 */
export const useAppContext = () => {
	const context = useContext(AppContext);

	if (context === null) {
		throw new Error(
			"useAppContext must be used within an AppContextProvider"
		);
	}

	return context;
};
