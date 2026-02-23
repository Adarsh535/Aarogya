import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('aToken');
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { Authorization: token }
      });
      if (data.success) setAppointments(data.appointments);
    } catch (error) {
      toast.error('Error fetching appointments');
    }
  };

  const updateStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem('aToken');
      const { data } = await axios.post(`${backendUrl}/api/admin/update-appointment`, 
        { appointmentId, status },
        { headers: { Authorization: token } }
      );
      if (data.success) {
        toast.success('Status updated');
        fetchAppointments();
      }
    } catch (error) {
      toast.error('Error updating status');
    }
  };



  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusClass = (apt) => {
    if (apt.cancelled) return 'bg-red-100 text-red-700';
    if (apt.isCompleted) return 'bg-green-100 text-green-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const getStatusText = (apt) => {
    if (apt.cancelled) return 'Cancelled';
    if (apt.isCompleted) return 'Completed';
    return 'Pending';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Appointments</h1>
        <p className="text-gray-500 mt-1">Manage and track all patient appointments</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#5f6fff] to-[#4c5fd5] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5f6fff] to-[#4c5fd5] flex items-center justify-center text-white font-semibold">
                        {apt.userData?.name?.charAt(0) || 'P'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{apt.userData?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{apt.userData?.email || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{apt.docData?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-700">{apt.slotDate}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
                      {apt.slotTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">₹{apt.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(apt)}`}>
                      {getStatusText(apt)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/appointment/${apt._id}`)}
                        className="px-3 py-1.5 bg-[#5f6fff] text-white rounded-lg text-sm font-medium hover:bg-[#4c5fd5] transition-colors"
                      >
                        View
                      </button>
                      {!apt.cancelled && !apt.isCompleted && (
                        <select
                          onChange={(e) => updateStatus(apt._id, e.target.value)}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent"
                        >
                          <option value="">Update</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}

export default AllAppointment;
