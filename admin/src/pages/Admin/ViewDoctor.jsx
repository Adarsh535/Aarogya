import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

const ViewDoctor = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { backendUrl, aToken } = useContext(AdminContext);
	const [doctor, setDoctor] = useState(null);

	useEffect(() => {
		const fetchDoctor = async () => {
			try {
				const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } });
				if (data.success) {
					const doc = data.doctors.find(d => d._id === id);
					setDoctor(doc);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (aToken) fetchDoctor();
	}, [aToken, id, backendUrl]);

	if (!doctor) return <div className='p-8'>Loading...</div>;

	return (
		<div className='p-8'>
			<button onClick={() => navigate('/all-doctorlist')} className='mb-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600'>
				← Back to List
			</button>
			<div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
				<div className='bg-gradient-to-r from-[#5f6fff] to-[#1126e6] px-8 py-6'>
					<h2 className='text-2xl font-bold text-white'>Doctor Profile</h2>
				</div>
				<div className='p-8'>
					<div className='flex flex-col md:flex-row gap-8'>
						<div className='flex-shrink-0'>
							<img src={doctor.image} alt={doctor.name} className='w-48 h-48 rounded-lg object-cover border-4 border-[#5f6fff]' />
						</div>
						<div className='flex-1 space-y-4'>
							<div>
								<h3 className='text-3xl font-bold text-gray-800'>{doctor.name}</h3>
								<p className='text-xl text-[#5f6fff] font-semibold'>{doctor.speciality}</p>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div>
									<p className='text-sm text-gray-500'>Email</p>
									<p className='text-gray-800 font-medium'>{doctor.email}</p>
								</div>
								<div>
									<p className='text-sm text-gray-500'>Phone</p>
									<p className='text-gray-800 font-medium'>{doctor.phone}</p>
								</div>
								<div>
									<p className='text-sm text-gray-500'>Degree</p>
									<p className='text-gray-800 font-medium'>{doctor.degree}</p>
								</div>
								<div>
									<p className='text-sm text-gray-500'>Experience</p>
									<p className='text-gray-800 font-medium'>{doctor.experiance}</p>
								</div>
								<div>
									<p className='text-sm text-gray-500'>Consultation Fee</p>
									<p className='text-gray-800 font-bold text-lg'>₹{doctor.fees}</p>
								</div>
							</div>
							<div>
								<p className='text-sm text-gray-500'>Address</p>
								<p className='text-gray-800'>{doctor.address.line1}, {doctor.address.line2}</p>
							</div>
							<div>
								<p className='text-sm text-gray-500'>About</p>
								<p className='text-gray-700 leading-relaxed'>{doctor.about}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewDoctor;
