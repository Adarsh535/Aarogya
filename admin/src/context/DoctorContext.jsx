import { createContext, useState } from "react";
export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '')
	const [appointments, setAppointments] = useState([])
	const [dashData, setDashData] = useState(null)
	const [profileData, setProfileData] = useState(null)

	const value = {
		dToken, setDToken,
		backendUrl,
		appointments, setAppointments,
		dashData, setDashData,
		profileData, setProfileData
	}

	return (
		<DoctorContext.Provider value={value}>
			{props.children}
		</DoctorContext.Provider>
	) 
}

export default DoctorContextProvider