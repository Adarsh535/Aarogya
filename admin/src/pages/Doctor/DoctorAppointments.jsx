import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, setAppointments, backendUrl } = useContext(DoctorContext);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { dToken }
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error('Error fetching appointments');
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success('Appointment completed');
        getAppointments();
      }
    } catch (error) {
      toast.error('Error completing appointment');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success('Appointment cancelled');
        getAppointments();
      }
    } catch (error) {
      toast.error('Error cancelling appointment');
    }
  };

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-500 mt-1">Manage your patient appointments</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#5f6fff] to-[#4c5fd5] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={apt.userData?.image || assets.patient_icon} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium text-gray-800">{apt.userData?.name}</p>
                        <p className="text-xs text-gray-500">{apt.userData?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{apt.slotDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-medium">
                      {apt.slotTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">₹{apt.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.cancelled ? 'bg-red-100 text-red-700' :
                      apt.isCompleted ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {apt.cancelled ? 'Cancelled' : apt.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {!apt.cancelled && !apt.isCompleted && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => completeAppointment(apt._id)}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => cancelAppointment(apt._id)}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
