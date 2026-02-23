import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('aToken');
        const [statsRes, doctorsRes] = await Promise.all([
          axios.get(`${backendUrl}/api/admin/dashboard-stats`, { headers: { Authorization: token } }),
          axios.get(`${backendUrl}/api/admin/all-doctors`, { headers: { aToken: token } })
        ]);
        if (statsRes.data.success) setStats(statsRes.data.stats);
        if (doctorsRes.data.success) setDoctors(doctorsRes.data.doctors);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="text-xl text-gray-600">Loading...</div></div>;
  }

  const pieOptions = {
    chart: { type: 'pie', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Appointment Status Distribution', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b><br/>Count: {point.y}' },
    plotOptions: {
      pie: {
        innerSize: '50%',
        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y}', style: { fontSize: '13px' } }
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

  const columnOptions = {
    chart: { type: 'column', height: 350, backgroundColor: 'transparent' },
    title: { text: 'System Overview', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    xAxis: { categories: ['Total Appointments', 'Total Doctors'], labels: { style: { fontSize: '13px' } } },
    yAxis: { title: { text: 'Count', style: { fontSize: '13px' } } },
    tooltip: { valueSuffix: ' items' },
    plotOptions: { column: { dataLabels: { enabled: true } } },
    series: [{
      name: 'Count',
      data: [stats?.totalAppointments || 0, stats?.totalDoctors || 0],
      color: '#5f6fff'
    }]
  };

  const barOptions = {
    chart: { type: 'bar', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Appointment Status Breakdown', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    xAxis: { categories: ['Completed', 'Pending', 'Cancelled'], labels: { style: { fontSize: '13px' } } },
    yAxis: { title: { text: 'Number of Appointments', style: { fontSize: '13px' } } },
    tooltip: { valueSuffix: ' appointments' },
    plotOptions: { bar: { dataLabels: { enabled: true } } },
    series: [{
      name: 'Appointments',
      data: [
        { y: stats?.completedAppointments || 0, color: '#10b981' },
        { y: stats?.pendingAppointments || 0, color: '#f59e0b' },
        { y: stats?.cancelledAppointments || 0, color: '#ef4444' }
      ]
    }]
  };

  const areaOptions = {
    chart: { type: 'area', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Cumulative Statistics', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    xAxis: { categories: ['Doctors', 'Total Appointments', 'Completed', 'Pending', 'Cancelled'], labels: { style: { fontSize: '13px' } } },
    yAxis: { title: { text: 'Count', style: { fontSize: '13px' } } },
    tooltip: { shared: true, valueSuffix: ' items' },
    plotOptions: { area: { fillOpacity: 0.5 } },
    series: [{
      name: 'Statistics',
      data: [
        stats?.totalDoctors || 0,
        stats?.totalAppointments || 0,
        stats?.completedAppointments || 0,
        stats?.pendingAppointments || 0,
        stats?.cancelledAppointments || 0
      ],
      color: '#5f6fff'
    }]
  };

  const lineOptions = {
    chart: { type: 'line', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Appointment Trends', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    xAxis: { categories: ['Completed', 'Pending', 'Cancelled'], labels: { style: { fontSize: '13px' } } },
    yAxis: { title: { text: 'Count', style: { fontSize: '13px' } } },
    tooltip: { valueSuffix: ' appointments' },
    plotOptions: { line: { dataLabels: { enabled: true }, enableMouseTracking: true } },
    series: [{
      name: 'Appointments',
      data: [stats?.completedAppointments || 0, stats?.pendingAppointments || 0, stats?.cancelledAppointments || 0],
      color: '#5f6fff'
    }]
  };

  const splineOptions = {
    chart: { type: 'spline', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Smooth Appointment Analysis', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    xAxis: { categories: ['Completed', 'Pending', 'Cancelled'], labels: { style: { fontSize: '13px' } } },
    yAxis: { title: { text: 'Count', style: { fontSize: '13px' } } },
    tooltip: { valueSuffix: ' appointments' },
    plotOptions: { spline: { dataLabels: { enabled: true }, marker: { radius: 4 } } },
    series: [{
      name: 'Appointments',
      data: [stats?.completedAppointments || 0, stats?.pendingAppointments || 0, stats?.cancelledAppointments || 0],
      color: '#10b981'
    }]
  };

  const specialityCount = doctors.reduce((acc, doc) => {
    acc[doc.speciality] = (acc[doc.speciality] || 0) + 1;
    return acc;
  }, {});

  const doctorSpecialityOptions = {
    chart: { type: 'pie', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Doctors by Speciality', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b><br/>Count: {point.y}' },
    plotOptions: {
      pie: {
        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y}', style: { fontSize: '12px' } }
      }
    },
    series: [{
      name: 'Doctors',
      data: Object.entries(specialityCount).map(([name, y]) => ({ name, y }))
    }]
  };

  const doctorBarOptions = {
    chart: { type: 'column', height: 350, backgroundColor: 'transparent' },
    title: { text: 'Doctors Distribution by Speciality', style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937' } },
    xAxis: { categories: Object.keys(specialityCount), labels: { style: { fontSize: '12px' } } },
    yAxis: { title: { text: 'Number of Doctors', style: { fontSize: '13px' } } },
    tooltip: { valueSuffix: ' doctors' },
    plotOptions: { column: { dataLabels: { enabled: true }, colorByPoint: true } },
    series: [{
      name: 'Doctors',
      data: Object.values(specialityCount)
    }]
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">Comprehensive website statistics and insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Appointments</p>
              <p className="text-3xl font-bold">{stats?.totalAppointments || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Completed</p>
              <p className="text-3xl font-bold">{stats?.completedAppointments || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium mb-1">Pending</p>
              <p className="text-3xl font-bold">{stats?.pendingAppointments || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium mb-1">Cancelled</p>
              <p className="text-3xl font-bold">{stats?.cancelledAppointments || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={pieOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={columnOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={areaOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={lineOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={splineOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={doctorSpecialityOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <HighchartsReact highcharts={Highcharts} options={doctorBarOptions} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
