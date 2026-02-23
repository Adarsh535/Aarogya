import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem('aToken');
        const { data } = await axios.get(`${backendUrl}/api/admin/appointment/${id}`, {
          headers: { Authorization: token }
        });
        if (data.success) {
          console.log('Appointment Data:', data.appointment);
          console.log('User Data:', data.appointment.userData);
          setAppointment(data.appointment);
        }
      } catch (error) {
        toast.error('Error fetching appointment details');
      }
    };
    fetchAppointment();
  }, [id]);

  if (!appointment) return <div className="p-6">Loading...</div>;

  const { userData, docData } = appointment;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Appointment Details</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-[#5f6fff]">Patient Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5f6fff] to-[#4c5fd5] flex items-center justify-center text-white text-2xl font-bold">
                  {userData?.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <p className="font-bold text-lg">{userData?.name || 'N/A'}</p>
                  <p className="text-gray-500">{userData?.email || 'N/A'}</p>
                </div>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium text-gray-600">Phone:</span>
                <span>{userData?.phone !== 0 ? userData?.phone : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium text-gray-600">Gender:</span>
                <span>{userData?.gender !== 'Not Selected' ? userData?.gender : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium text-gray-600">DOB:</span>
                <span>{userData?.dob !== 'Not Selected' ? userData?.dob : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-600">Address:</span>
                <span className="text-right">{userData?.address?.line1 && userData?.address?.line1 !== '' ? userData?.address?.line1 : 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-[#5f6fff]">Doctor Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <img src={docData?.image} alt="" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-lg">{docData?.name || 'N/A'}</p>
                  <p className="text-gray-500">{docData?.speciality || 'N/A'}</p>
                </div>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium text-gray-600">Degree:</span>
                <span>{docData?.degree || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium text-gray-600">Experience:</span>
                <span>{docData?.experiance || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-600">Fees:</span>
                <span className="font-semibold">₹{docData?.fees || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4 text-[#5f6fff]">Appointment Details</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Date:</span>
              <span className="font-semibold">{appointment.slotDate}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Time:</span>
              <span className="font-semibold">{appointment.slotTime}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Amount:</span>
              <span className="font-semibold text-green-600">₹{appointment.amount}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Payment:</span>
              <span className={appointment.payment ? 'text-green-600' : 'text-red-600'}>
                {appointment.payment ? 'Paid' : 'Pending'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Status:</span>
              <span className={`font-semibold ${appointment.cancelled ? 'text-red-600' : appointment.isCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                {appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Pending'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium text-gray-600">Booked On:</span>
              <span>{new Date(appointment.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
