import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('aToken');
        const [statsRes, appointmentsRes] = await Promise.all([
          axios.get(`${backendUrl}/api/admin/dashboard-stats`, { headers: { Authorization: token } }),
          axios.get(`${backendUrl}/api/admin/appointments`, { headers: { Authorization: token } })
        ]);
        if (statsRes.data.success) setStats(statsRes.data.stats);
        if (appointmentsRes.data.success) setAppointments(appointmentsRes.data.appointments.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const chartOptions = {
    chart: { type: 'pie', height: 300, backgroundColor: 'transparent' },
    title: { text: 'Appointment Status', style: { fontSize: '16px', fontWeight: 'bold' } },
    plotOptions: {
      pie: {
        innerSize: '60%',
        dataLabels: { enabled: true, format: '{point.name}: {point.y}' }
      }
    },
    series: [{
      name: 'Appointments',
      data: [
        { name: 'Completed', y: stats?.completedAppointments || 0, color: '#10b981' },
        { name: 'Pending', y: stats?.pendingAppointments || 0, color: '#f59e0b' },
        { name: 'Cancelled', y: stats?.cancelledAppointments || 0, color: '#ef4444' }
      ]
    }]
  };

  const barChartOptions = {
    chart: { type: 'column', height: 300, backgroundColor: 'transparent' },
    title: { text: 'Overview', style: { fontSize: '16px', fontWeight: 'bold' } },
    xAxis: { categories: ['Appointments', 'Doctors'] },
    yAxis: { title: { text: 'Count' } },
    series: [{
      name: 'Total',
      data: [stats?.totalAppointments || 0, stats?.totalDoctors || 0],
      color: '#5f6fff'
    }]
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">Welcome back! Here's your overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#5f6fff]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button onClick={() => navigate('/add-doctors')} className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-[#5f6fff] to-[#4c5fd5] text-white rounded-lg hover:shadow-lg transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              <span className="font-medium">Add New Doctor</span>
            </button>
            <button onClick={() => navigate('/all-appointment')} className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span className="font-medium">View Appointments</span>
            </button>
            <button onClick={() => navigate('/all-doctorlist')} className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span className="font-medium">Manage Doctors</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-blue-100 text-xs md:text-sm font-medium mb-1">Total Appointments</p>
              <p className="text-2xl md:text-3xl font-bold">{stats?.totalAppointments || 0}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-green-100 text-xs md:text-sm font-medium mb-1">Completed</p>
              <p className="text-2xl md:text-3xl font-bold">{stats?.completedAppointments || 0}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-yellow-100 text-xs md:text-sm font-medium mb-1">Pending</p>
              <p className="text-2xl md:text-3xl font-bold">{stats?.pendingAppointments || 0}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-red-100 text-xs md:text-sm font-medium mb-1">Cancelled</p>
              <p className="text-2xl md:text-3xl font-bold">{stats?.cancelledAppointments || 0}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#5f6fff] to-[#4c5fd5] rounded-xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-blue-100 text-xs md:text-sm font-medium mb-1">Total Doctors</p>
              <p className="text-2xl md:text-3xl font-bold">{stats?.totalDoctors || 0}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-4 md:px-6 py-4 bg-gradient-to-r from-[#5f6fff] to-[#4c5fd5]">
          <h2 className="text-lg md:text-xl font-bold text-white">Recent Appointments</h2>
        </div>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((apt) => (
                  <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#5f6fff] to-[#4c5fd5] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {apt.userData?.name?.charAt(0) || 'P'}
                        </div>
                        <span className="font-medium text-gray-800 text-sm md:text-base">{apt.userData?.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base">{apt.docData?.name || 'N/A'}</td>
                    <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base">{apt.slotDate}</td>
                    <td className="px-4 md:px-6 py-4">
                      <span className="inline-flex items-center px-2 md:px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs md:text-sm font-medium">
                        {apt.slotTime}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(apt)}`}>
                        {getStatusText(apt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>No appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;