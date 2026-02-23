import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast, Bounce, Zoom } from 'react-toastify';

const Login = () => {

	//creating state for doctors and admin login

	const [state, setState] = useState('Admin')
	const [showPassword, setShowPassword] = useState(false)

	//creating context for token

	const { setAToken, backendUrl } = useContext(AdminContext);
	const { setDToken } = useContext(DoctorContext);
	const navigate = useNavigate();

	//state for email and password

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//variable for onSubmit handler
	const handleSubmit = async (e) => {
		e.preventDefault();

		//api call from here

		try {
			if (state === 'Admin') {

				const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })

				if (data.success) {
					setAToken(data.token);
					localStorage.setItem('aToken', data.token);
					toast.success('Login Successfully Welcome Back');
					setTimeout(() => navigate('/admin-dashboard'), 500);

				} else {
					toast.error('Login Failed please fill valid details!');

				}

			} else {
				// Doctor login
				const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
				console.log('Doctor login response:', data);

				if (data.success) {
					setDToken(data.token);
					localStorage.setItem('dToken', data.token);
					toast.success('Login Successfully Welcome Doctor');
					setTimeout(() => navigate('/doctor-dashboard'), 500);
				} else {
					toast.error(data.message || 'Login Failed please fill valid details!');
				}
			}
		} catch (error) {
			console.error('Login error:', error);
			alert('Login error: ' + (error.response?.data?.message || error.message));
		}
	}
	return (
		<div>

			<form action=""
				onSubmit={handleSubmit}
				className='min-h-[80vh] flex items-center'>

				<div
					className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'

				>

					{/* main heading for doctor login and admin login */}

					<p
						className='text-2xl font-semibold m-auto'>
						<span className='text-[#5f6fff]'>
							{state}
						</span>
						Login
					</p>

					<div
						className='w-full'>
						<p>
							Email
						</p>

						<input
							type="email"
							required
							name='email'
							className='border border-[#dadada] rounded w-full p-2 mt-1'
							onChange={(e) => setEmail(e.target.value)}
							value={email}

						/>
					</div>

					<div
						className='w-full'>
						<p>
							Password
						</p>
						<div className='relative'>
							<input
								type={showPassword ? "text" : "password"}
								required
								className='border border-[#dadada] rounded w-full p-2 mt-1 pr-10'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								name='password'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
							>
								{showPassword ? (
									<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
									</svg>
								) : (
									<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
									</svg>
								)}
							</button>
						</div>
					</div>

					<div
						className='flex justify-center items-center m-auto'>
						<button
							className='bg-[#5f6fff] text-white px-35 py-3 cursor-pointer rounded'>
							Login
						</button>
					</div>


					{/* for switching login admin to doctor and doctor to admin */}
					{
						state === 'Admin' ?
							<p
								className='m-auto text-sm'>
								Login as
								 <span
									className='text-[#5f6fff] ml-1 cursor-pointer'
									onClick={() =>
										setState('Doctor')}>
									Doctor
								</span>
							</p>
							:
							<p
								className='m-auto text-sm'>
								Login as
								<span
									className='text-[#5f6fff] ml-1 cursor-pointer'
									onClick={() =>
										setState('Admin')}>
									Admin
								</span>
							</p>
					}
				</div>
			</form>
			{/* toastify container */}
			 
		</div>
	);
}

export default Login;
