// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { IoIosArrowBack } from "react-icons/io";
// import { Link, useParams } from "react-router";
// export default function RegisterForm() {
//   const { userId } = useParams(); // get id from url
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     gender: "",
//     birthDate: "",
//     age: "",
//     address: "",
//     city: "",
//     university: "",
//     password: "",
//   });

//   useEffect(() => {
//     if (userId) {
//       fetchUserDetails();
//     }
//   }, [userId]);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/user/${userId}`);
//       setFormData(response.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (userId) {
//         await axios.put(`http://localhost:3000/user/${id}`, formData);
//       } else {
//         await axios.post("http://localhost:3000/create", formData);
//       }
//       window.location.href = "/";
//     } catch (error) {
//       console.error("There was an error submitting the form:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
//       <Link
//         to="/"
//         className="absolute top-5 left-6 flex items-center gap-2 
//              px-4 py-2 rounded-lg border 
//              border-blue-500 
//              bg-gradient-to-r from-blue-500 to-blue-600 
//              text-white text-md tracking-tight font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 "
//       >
//         <IoIosArrowBack className="text-lg" />
//         Go Back
//       </Link>
//       <div className="flex bg-white rounded-2xl shadow-xl w-[65vw] p-8 gap-10">
//         <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
//           <h2 className="text-3xl font-semibold tracking-tight text-blue-600 mb-2 text-center">
//             Register
//           </h2>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               >
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="birthDate"
//                 value={formData.birthDate}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">
//                 University
//               </label>
//               <input
//                 type="text"
//                 name="university"
//                 value={formData.university}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded outline-none active:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-400 transition duration-200 ease-in-out"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="mt-4 bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out 2s cursor-pointer text-white py-2 rounded font-semibold"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 max-w-md mx-auto">
      {/* First Name */}
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" {...register("firstName")} placeholder="First Name" />
      </div>

      {/* Last Name */}
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" {...register("lastName")} placeholder="Last Name" />
      </div>

      {/* Maiden Name */}
      <div>
        <Label htmlFor="maidenName">Maiden Name</Label>
        <Input id="maidenName" {...register("maidenName")} placeholder="Maiden Name" />
      </div>

      {/* Age */}
      <div>
        <Label htmlFor="age">Age</Label>
        <Input id="age" type="number" {...register("age")} placeholder="Age" />
      </div>

      {/* Gender */}
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" {...register("gender")} placeholder="Gender" />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} placeholder="Email" />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} placeholder="Phone" />
      </div>

      {/* Username */}
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register("username")} placeholder="Username" />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} placeholder="Password" />
      </div>

      {/* Birth Date */}
      <div>
        <Label htmlFor="birthDate">Birth Date</Label>
        <Input id="birthDate" type="date" {...register("birthDate")} />
      </div>

      {/* Blood Group */}
      <div>
        <Label htmlFor="bloodGroup">Blood Group</Label>
        <Input id="bloodGroup" {...register("bloodGroup")} placeholder="Blood Group" />
      </div>

      {/* Role */}
      <div>
        <Label htmlFor="role">Role</Label>
        <Input id="role" {...register("role")} placeholder="Role" />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
}
