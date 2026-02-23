import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
	const { aToken } = useContext(AdminContext)
	const { dToken } = useContext(DoctorContext)
	
	return (
		<div className='h-screen bg-white shadow-xl fixed left-0 top-0 w-64 border-r border-gray-200'>
			{
				aToken && <>
					<div className='flex flex-col items-center gap-3 px-6 py-6 mt-16 bg-gradient-to-br from-[#5f6fff] to-[#4c5fd5]'>
						<div className='relative'>
							<img className='w-16 h-16 rounded-full border-3 border-white shadow-lg' src={assets.admin_logo} alt='Logo' />
							<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white'></div>
						</div>
						<div className='text-center'>
							<p className='text-white font-bold text-lg'>Admin Panel</p>
							<p className='text-blue-100 text-xs'>Aarogya Hospital</p>
						</div>
					</div>
					<ul className='px-3 py-6 space-y-1'>

					<NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-[#5f6fff] text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<img src={assets.home_icon} alt='Home' className='w-5 h-5' />
								<p className='font-medium text-sm'>Dashboard</p>
							</>
						)}
					</NavLink>

					<NavLink to={'/all-appointment'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-[#5f6fff] text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<img src={assets.appointment_icon} alt='Appointments' className='w-5 h-5' />
								<p className='font-medium text-sm'>Appointments</p>
							</>
						)}
					</NavLink>

					<NavLink to={'/add-doctors'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-[#5f6fff] text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<img src={assets.add_icon} alt='Doctors' className='w-5 h-5' />
								<p className='font-medium text-sm'>Add Doctor</p>
							</>
						)}
					</NavLink>

					<NavLink to={'/all-doctorlist'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-[#5f6fff] text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<img src={assets.people_icon} alt='Doctors List' className='w-5 h-5' />
								<p className='font-medium text-sm'>Doctors List</p>
							</>
						)}
					</NavLink>

					<NavLink to={'/reports'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-[#5f6fff] text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
									<path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'/>
								</svg>
								<p className='font-medium text-sm'>Reports</p>
							</>
						)}
					</NavLink>

				</ul>
				</>
			}

			{
				dToken && <>
					<div className='flex flex-col items-center gap-3 px-6 py-6 mt-16 bg-gradient-to-br from-green-500 to-green-600'>
						<div className='relative'>
							<img className='w-16 h-16 rounded-full border-3 border-white shadow-lg' src={assets.doctor_icon} alt='Logo' />
							<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white'></div>
						</div>
						<div className='text-center'>
							<p className='text-white font-bold text-lg'>Doctor Panel</p>
							<p className='text-green-100 text-xs'>Aarogya Hospital</p>
						</div>
					</div>
					<ul className='px-3 py-6 space-y-1'>

					<NavLink to={'/doctor-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<img src={assets.home_icon} alt='Home' className='w-5 h-5' />
								<p className='font-medium text-sm'>Dashboard</p>
							</>
						)}
					</NavLink>

					<NavLink to={'/doctor-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<img src={assets.appointment_icon} alt='Appointments' className='w-5 h-5' />
								<p className='font-medium text-sm'>Appointments</p>
							</>
						)}
					</NavLink>

					<NavLink to={'/doctor-profile'} className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 ${isActive ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-50"}`}>
						{({ isActive }) => (
							<>
								<img src={assets.doctor_icon} alt='Profile' className='w-5 h-5' />
								<p className='font-medium text-sm'>Profile</p>
							</>
						)}
					</NavLink>

				</ul>
				</>
			}
		</div>
	);
}

export default Sidebar;
