import axios from "axios";
import React, { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    age: "",
    address: "",
    city: "",
    university: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3000/create", formData);
      console.log(response.data);
      setFormData("")
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="flex bg-white rounded-2xl shadow-xl w-[65vw] p-8 gap-10">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-blue-600 mb-2 text-center">Register</h2>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">University</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out 2s cursor-pointer text-white py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
