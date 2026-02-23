import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddDoctor = () => {

	const navigate = useNavigate()

	//stoting image file state variable

	const [docImg, setDocImg] = useState(false)

	//state variable for personal details
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [experience, setExperience] = useState('1 Year')
	const [fee, setFee] = useState('')
	const [about, setAbout] = useState('')
	const [speciality, setSpeciality] = useState('General physician')
	const [degree, setDegree] = useState('')
	const [address1, setAddress1] = useState('')
	const [address2, setAddress2] = useState('')

	//get backed ulr and admin token
	const { backendUrl, aToken } = useContext(AdminContext)

	//onsubmit handker
	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			if (!docImg) {
				return toast.error("Image not selected")
			}
			//formdata
			const formData = new FormData()

			formData.append('image', docImg)
			formData.append('name', name)
			formData.append('email', email)
			formData.append('password', password)
			formData.append('phone', phone)
			formData.append('experiance', experience)
			formData.append('fees', Number(fee))
			formData.append('about', about)
			formData.append('speciality', speciality)
			formData.append('degree', degree)
			formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

			//console.log(formData)

			formData.forEach((value, key) => {
				console.log(`${key}:${value}`)
			})

			//api call for save data in database
			const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
			//condition for data access
			if(data.success){
				toast.success(data.message)
				navigate('/all-doctorlist')
			}else{
				toast.error(data.message)
			}
		} catch (error) {

		}
	}

	return (
		<div className='p-8'>
			<form onSubmit={handleSubmit} className='max-w-5xl mx-auto'>
				<div className='bg-white rounded-lg shadow-md overflow-hidden'>
					<div className='bg-gradient-to-r from-[#5f6fff] to-[#1126e6] px-8 py-6'>
						<h2 className='text-2xl font-bold text-white'>Add New Doctor</h2>
						<p className='text-blue-100 mt-1'>Fill in the doctor's information</p>
					</div>

					<div className='px-8 py-8'>
						<div className='flex flex-col items-center mb-8'>
							<label htmlFor="doc-img" className='cursor-pointer'>
								<div className='relative'>
									<img className='w-32 h-32 rounded-full object-cover border-4 border-[#5f6fff]' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
									<div className='absolute bottom-0 right-0 bg-[#5f6fff] rounded-full p-2'>
										<svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
										</svg>
									</div>
								</div>
							</label>
							<input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept='image/*' />
							<p className='text-gray-500 mt-3 text-sm'>Upload Doctor Picture</p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Doctor Name</label>
								<input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='Enter name' required />
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
								<input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='Enter email' required />
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
								<input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='Enter password' required />
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Phone Number</label>
								<input onChange={(e) => setPhone(e.target.value)} value={phone} type="tel" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='1234567890' required />
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Speciality</label>
								<select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent'>
									<option value="General physician">General physician</option>
									<option value="Gynecologist">Gynecologist</option>
									<option value="Dermatologist">Dermatologist</option>
									<option value="Pediatricians">Pediatricians</option>
									<option value="Neurologist">Neurologist</option>
									<option value="Gastroenterologist">Gastroenterologist</option>
								</select>
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Education</label>
								<input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='Enter degree' required />
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Experience</label>
								<select onChange={(e) => setExperience(e.target.value)} value={experience} className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent'>
									<option value="1">1 Year</option>
									<option value="2">2 Years</option>
									<option value="3">3 Years</option>
									<option value="4">4 Years</option>
									<option value="5">5 Years</option>
									<option value="6">6 Years</option>
									<option value="7">7 Years</option>
									<option value="8">8 Years</option>
									<option value="9">9 Years</option>
									<option value="10">10 Years</option>
								</select>
							</div>

							<div>
								<label className='block text-sm font-semibold text-gray-700 mb-2'>Consultation Fee</label>
								<input onChange={(e) => setFee(e.target.value)} value={fee} type="number" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='Enter fee' required />
							</div>
						</div>

						<div className='mt-6'>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Address Line 1</label>
							<input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='Enter address line 1' required />
						</div>

						<div className='mt-4'>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>Address Line 2</label>
							<input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent' placeholder='Enter address line 2' required />
						</div>

						<div className='mt-6'>
							<label className='block text-sm font-semibold text-gray-700 mb-2'>About Doctor</label>
							<textarea onChange={(e) => setAbout(e.target.value)} value={about} rows={4} className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent resize-none' placeholder='Write about the doctor...' required />
						</div>

						<div className='mt-8 flex justify-end'>
							<button type='submit' className='bg-gradient-to-r from-[#5f6fff] to-[#1126e6] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105'>Add Doctor</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddDoctor;
