import { createContext, useState, useEffect } from "react";
export const AdminContext = createContext()

const AdminContextProvider = (props) => {

	//state function for token

	const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');

	//importing backend url using .env

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	// Save token to localStorage whenever it changes
	useEffect(() => {
		if (aToken) {
			localStorage.setItem('aToken', aToken);
		} else {
			localStorage.removeItem('aToken');
		}
	}, [aToken]);

	const value = {
		aToken,
		setAToken,
		backendUrl

	}

	return (
		<AdminContext.Provider value={value}>
			{props.children}
		</AdminContext.Provider>
	)
}

export default AdminContextProvider