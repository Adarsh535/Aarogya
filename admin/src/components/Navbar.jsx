import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const Navbar = () => {

	const { aToken, setAToken } = useContext(AdminContext);
	const { dToken, setDToken } = useContext(DoctorContext);
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	//navigate to home page 
	const navigate = useNavigate();

	//logout
	const logout = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You want to logout?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#5f6fff',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, logout!'
		}).then((result) => {
			if (result.isConfirmed) {
				navigate('/');
				aToken && setAToken('');
				aToken && localStorage.removeItem('aToken');
				dToken && setDToken('');
				dToken && localStorage.removeItem('dToken');
				Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
			}
		});
	};

	const formatDate = () => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${days[currentTime.getDay()]}, ${months[currentTime.getMonth()]} ${currentTime.getDate()}, ${currentTime.getFullYear()}`;
	};

	const formatTime = () => {
		return currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	};

	return (
		<div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-gradient-to-r from-white to-blue-50 shadow-sm fixed top-0 left-0 right-0 z-10'>
			<div className='flex items-center gap-2 text-md'>
				<img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
				<p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
			</div>
			<div className='flex items-center gap-6'>
				<div className='text-right hidden md:block'>
					<p className='text-sm font-semibold text-gray-700'>{formatTime()}</p>
					<p className='text-xs text-gray-500'>{formatDate()}</p>
				</div>
				<button onClick={logout} className='bg-gradient-to-r from-[#5f6fff] to-[#1126e6] text-white text-sm px-8 rounded-full py-2.5 hover:shadow-lg transition-all'>Logout</button>
			</div>
		</div>
	);
}

export default Navbar;
