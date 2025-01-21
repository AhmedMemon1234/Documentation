'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    address: '',
    image: '',
    createdAt: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, image: event.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile saved!');
  };

  const handleDelete = () => {
    localStorage.removeItem('profile');
    setProfile({
      name: '',
      email: '',
      bio: '',
      phone: '',
      address: '',
      image: '',
      createdAt: new Date().toLocaleDateString(),
    });
    alert('Profile deleted!');
  };

  const handleReset = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      name: '',
      email: '',
      bio: '',
      phone: '',
      address: '',
    }));
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-white text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Profile</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
            <label className="block text-sm font-semibold mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
            />
            {profile.image && (
              <img
                src={profile.image}
                alt="Profile"
                className="mt-4 w-32 h-32 rounded-full object-cover mx-auto"
              />
            )}
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mb-4"
            />
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mb-4"
            />
            <label className="block text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mb-4"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2 mb-4"
          />
          <label className="block text-sm font-semibold mb-2">Shipping Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-semibold">Account Created On</label>
          <p className="bg-gray-700 text-white rounded-md px-3 py-2 mt-2">
            {profile.createdAt}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md w-full md:w-auto"
          >
            Save
          </button>
          <button
            onClick={handleReset}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-md w-full md:w-auto"
          >
            Reset
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md w-full md:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
