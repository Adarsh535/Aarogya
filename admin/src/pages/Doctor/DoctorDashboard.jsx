import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, setDashData, backendUrl } = useContext(DoctorContext);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { dToken }
      });
      if (data.success) {
        setDashData(data.dashData);
      }
    } catch (error) {
      toast.error('Error fetching dashboard data');
    }
  };

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Doctor!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <img src={assets.earning_icon} alt="" className="w-12 h-12 mb-3" />
          <p className="text-3xl font-bold">₹{dashData.earnings}</p>
          <p className="text-blue-100 mt-1">Total Earnings</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <img src={assets.appointments_icon} alt="" className="w-12 h-12 mb-3" />
          <p className="text-3xl font-bold">{dashData.appointments}</p>
          <p className="text-green-100 mt-1">Total Appointments</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <img src={assets.patients_icon} alt="" className="w-12 h-12 mb-3" />
          <p className="text-3xl font-bold">{dashData.patients}</p>
          <p className="text-purple-100 mt-1">Total Patients</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Appointments</h2>
        <div className="space-y-3">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
              <img src={item.userData?.image || assets.patient_icon} alt="" className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.userData?.name}</p>
                <p className="text-sm text-gray-500">{item.slotDate} at {item.slotTime}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.cancelled ? 'bg-red-100 text-red-700' : 
                item.isCompleted ? 'bg-green-100 text-green-700' : 
                'bg-yellow-100 text-yellow-700'
              }`}>
                {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
