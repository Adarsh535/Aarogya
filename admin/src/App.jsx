import React, { useContext } from 'react'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AllAppointment from './pages/Admin/AllAppointment'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import Dashboard from './pages/Admin/Dashboard'
import ViewDoctor from './pages/Admin/ViewDoctor'
import EditDoctor from './pages/Admin/EditDoctor'
import AppointmentDetail from './pages/Admin/AppointmentDetail'
import Reports from './pages/Admin/Reports'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  
  return aToken || dToken ? (

    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      {/* navbar */}
      <Navbar />

      <div className='flex items-start'>
        {/* sidebar */}
        <Sidebar />

        {/* routed for all admin pages */}
        <div className='flex-1 ml-64 overflow-y-auto h-screen mt-16'>
        <Routes>
          <Route path="/" element={<></>} />
          
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointment />} />
          <Route path="/appointment/:id" element={<AppointmentDetail />} />
          <Route path="/add-doctors" element={<AddDoctor />} />
          <Route path="/all-doctorlist" element={<DoctorsList />} />
          <Route path="/view-doctor/:id" element={<ViewDoctor />} />
          <Route path="/edit-doctor/:id" element={<EditDoctor />} />
          <Route path="/reports" element={<Reports />} />
          
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
        </div>

      </div>
    </div>

  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
