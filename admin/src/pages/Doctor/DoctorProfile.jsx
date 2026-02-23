import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, backendUrl } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { dToken }
      });
      if (data.success) {
        setProfileData(data.profileData);
      }
    } catch (error) {
      toast.error('Error fetching profile');
    }
  };

  const updateProfile = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`,
        {
          fees: profileData.fees,
          address: profileData.address,
          available: profileData.available
        },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success('Profile updated');
        setIsEdit(false);
        getProfileData();
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
        <div className="flex items-start gap-8">
          <img src={profileData.image} alt="" className="w-40 h-40 rounded-xl object-cover shadow-md" />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {profileData.degree}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {profileData.speciality}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {profileData.experiance} Experience
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-800 font-medium">{profileData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-800 font-medium">{profileData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">About</p>
                <p className="text-gray-700">{profileData.about}</p>
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium w-32">Consultation Fee:</label>
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    className="border rounded-lg px-3 py-2 w-32"
                  />
                ) : (
                  <p className="text-gray-800 font-semibold">₹{profileData.fees}</p>
                )}
              </div>

              <div className="flex items-start gap-4">
                <label className="text-gray-700 font-medium w-32">Address:</label>
                {isEdit ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={profileData.address.line1}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      value={profileData.address.line2}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder="Address Line 2"
                    />
                  </div>
                ) : (
                  <div className="text-gray-800">
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium w-32">Available:</label>
                {isEdit ? (
                  <input
                    type="checkbox"
                    checked={profileData.available}
                    onChange={(e) => setProfileData(prev => ({ ...prev, available: e.target.checked }))}
                    className="w-5 h-5"
                  />
                ) : (
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    profileData.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {profileData.available ? 'Available' : 'Not Available'}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {isEdit ? (
                <>
                  <button
                    onClick={updateProfile}
                    className="px-6 py-2 bg-[#5f6fff] text-white rounded-lg hover:bg-[#4c5fd5]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => { setIsEdit(false); getProfileData(); }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 bg-[#5f6fff] text-white rounded-lg hover:bg-[#4c5fd5]"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
