import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const DoctorsList = () => {
	const { backendUrl, aToken } = useContext(AdminContext);
	const navigate = useNavigate();
	const [doctors, setDoctors] = useState([]);
	const [filteredDoctors, setFilteredDoctors] = useState([]);
	const [filterSpeciality, setFilterSpeciality] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const specialities = ['All', 'General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'];

	const fetchDoctors = async () => {
		try {
			const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } });
			if (data.success) {
				setDoctors(data.doctors);
				setFilteredDoctors(data.doctors);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (aToken) fetchDoctors();
	}, [aToken]);

	useEffect(() => {
		let filtered = doctors;
		if (filterSpeciality !== 'All') {
			filtered = filtered.filter(doc => doc.speciality === filterSpeciality);
		}
		if (searchQuery) {
			filtered = filtered.filter(doc =>
				doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				doc.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		setFilteredDoctors(filtered);
		setCurrentPage(1);
	}, [filterSpeciality, doctors, searchQuery]);

	const handleView = (id) => navigate(`/view-doctor/${id}`);
	const handleEdit = (id) => navigate(`/edit-doctor/${id}`);

	const handleDelete = async (id) => {
		const result = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!'
		});

		if (result.isConfirmed) {
			try {
				const { data } = await axios.post(backendUrl + '/api/admin/delete-doctor', { id }, { headers: { aToken } });
				if (data.success) {
					toast.success(data.message);
					fetchDoctors();
				} else {
					toast.error(data.message);
				}
			} catch (error) {
				toast.error('Failed to delete doctor');
			}
		}
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

	return (
		<div className='p-8'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold text-gray-800'>All Doctors ({filteredDoctors.length})</h1>
			</div>

			<div className='flex gap-4 mb-6 flex-wrap'>
				<input
					type="text"
					placeholder="Search by name, email, speciality..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff] max-w-md'
				/>
				<select
					value={filterSpeciality}
					onChange={(e) => setFilterSpeciality(e.target.value)}
					className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]'
				>
					{specialities.map((spec, i) => <option key={i} value={spec}>{spec}</option>)}
				</select>
			</div>

			<div className='bg-white rounded-lg shadow-md overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='bg-gradient-to-r from-[#5f6fff] to-[#4c5fd5] text-white'>
							<tr>
								<th className='px-6 py-4 text-left text-sm font-semibold'>Image</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>Name</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>Speciality</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>Degree</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>Experience</th>
								<th className='px-6 py-4 text-left text-sm font-semibold'>Fee</th>
								<th className='px-6 py-4 text-center text-sm font-semibold'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentDoctors.map((doctor) => (
								<tr key={doctor._id} className='border-b hover:bg-gray-50 transition-colors'>
									<td className='px-6 py-4'>
										<img src={doctor.image} alt={doctor.name} className='w-12 h-12 rounded-full object-cover' />
									</td>
									<td className='px-6 py-4 font-medium text-gray-800'>{doctor.name}</td>
									<td className='px-6 py-4'>
										<span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>{doctor.speciality}</span>
									</td>
									<td className='px-6 py-4 text-gray-600'>{doctor.degree}</td>
									<td className='px-6 py-4 text-gray-600'>{doctor.experiance}</td>
									<td className='px-6 py-4 font-semibold text-gray-700'>₹{doctor.fees}</td>
									<td className='px-6 py-4'>
										<div className='flex gap-2 justify-center'>
											<button onClick={() => handleView(doctor._id)} className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all text-sm'>View</button>
											<button onClick={() => handleEdit(doctor._id)} className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all text-sm'>Edit</button>
											<button onClick={() => handleDelete(doctor._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all text-sm'>Delete</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className='flex justify-between items-center mt-6'>
				<div className='text-gray-600'>
					Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDoctors.length)} of {filteredDoctors.length} entries
				</div>
				<div className='flex gap-2'>
					<button
						onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						Previous
					</button>
					{[...Array(totalPages)].map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentPage(i + 1)}
							className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-[#5f6fff] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
						>
							{i + 1}
						</button>
					))}
					<button
						onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
						className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default DoctorsList;
