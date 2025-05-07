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

// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// export default function UserForm() {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (

//     <div className="p-20 bg-zinc-200 ">
//       <div className="space-y-4 bg-zinc-100 p-10 rounded-2xl shadow-zinc-600 shadow-md">
//       <h1 className="text-3xl font-semibold tracking-tight text-blue-600 mb-2 text-center"> 
//       User Form
//     </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-zinc-100 p-6  grid grid-cols-2 gap-4">
//       {/* Basic Info */}
//       <div>
//         <Label className={`mb-2`}>First Name</Label>
//         <Input {...register("firstName")} />
//       </div>

//       <div>
//         <Label>Last Name</Label>
//         <Input {...register("lastName")} />
//       </div>

//       <div>
//         <Label>Maiden Name</Label>
//         <Input {...register("maidenName")} />
//       </div>

//       <div>
//         <Label>Age</Label>
//         <Input type="number" {...register("age")} />
//       </div>

//       <div>
//         <Label>Gender</Label>
//         <Input {...register("gender")} />
//       </div>

//       <div>
//         <Label>Email</Label>
//         <Input type="email" {...register("email")} />
//       </div>

//       <div>
//         <Label>Phone</Label>
//         <Input {...register("phone")} />
//       </div>

//       <div>
//         <Label>Username</Label>
//         <Input {...register("username")} />
//       </div>

//       <div>
//         <Label>Password</Label>
//         <Input type="password" {...register("password")} />
//       </div>

//       <div>
//         <Label>Birth Date</Label>
//         <Input type="date" {...register("birthDate")} />
//       </div>

//       <div>
//         <Label>Image URL</Label>
//         <Input {...register("image")} />
//       </div>

//       <div>
//         <Label>Blood Group</Label>
//         <Input {...register("bloodGroup")} />
//       </div>

//       <div>
//         <Label>Height</Label>
//         <Input type="number" step="0.01" {...register("height")} />
//       </div>

//       <div>
//         <Label>Weight</Label>
//         <Input type="number" step="0.01" {...register("weight")} />
//       </div>

//       <div>
//         <Label>Eye Color</Label>
//         <Input {...register("eyeColor")} />
//       </div>

//       {/* Hair */}
//       <div>
//         <Label>Hair Color</Label>
//         <Input {...register("hair.color")} />
//       </div>

//       <div>
//         <Label>Hair Type</Label>
//         <Input {...register("hair.type")} />
//       </div>

//       {/* Address */}
//       <div>
//         <Label>Address</Label>
//         <Input {...register("address.address")} />
//       </div>

//       <div>
//         <Label>City</Label>
//         <Input {...register("address.city")} />
//       </div>

//       <div>
//         <Label>State</Label>
//         <Input {...register("address.state")} />
//       </div>

//       <div>
//         <Label>State Code</Label>
//         <Input {...register("address.stateCode")} />
//       </div>

//       <div>
//         <Label>Postal Code</Label>
//         <Input {...register("address.postalCode")} />
//       </div>

//       <div>
//         <Label>Country</Label>
//         <Input {...register("address.country")} />
//       </div>

//       <div>
//         <Label>Latitude</Label>
//         <Input type="number" step="0.00001" {...register("address.coordinates.lat")} />
//       </div>

//       <div>
//         <Label>Longitude</Label>
//         <Input type="number" step="0.00001" {...register("address.coordinates.lng")} />
//       </div>

//       <div>
//         <Label>IP Address</Label>
//         <Input {...register("ip")} />
//       </div>

//       <div>
//         <Label>MAC Address</Label>
//         <Input {...register("macAddress")} />
//       </div>

//       <div>
//         <Label>University</Label>
//         <Input {...register("university")} />
//       </div>

//       {/* Bank */}
//       <div>
//         <Label>Bank Card Expire</Label>
//         <Input {...register("bank.cardExpire")} />
//       </div>

//       <div>
//         <Label>Bank Card Number</Label>
//         <Input {...register("bank.cardNumber")} />
//       </div>

//       <div>
//         <Label>Bank Card Type</Label>
//         <Input {...register("bank.cardType")} />
//       </div>

//       <div>
//         <Label>Bank Currency</Label>
//         <Input {...register("bank.currency")} />
//       </div>

//       <div>
//         <Label>IBAN</Label>
//         <Input {...register("bank.iban")} />
//       </div>

//       {/* Company */}
//       <div>
//         <Label>Company Department</Label>
//         <Input {...register("company.department")} />
//       </div>

//       <div>
//         <Label>Company Name</Label>
//         <Input {...register("company.name")} />
//       </div>

//       <div>
//         <Label>Company Title</Label>
//         <Input {...register("company.title")} />
//       </div>

//       {/* Company Address */}
//       <div>
//         <Label>Company Address</Label>
//         <Input {...register("company.address.address")} />
//       </div>

//       <div>
//         <Label>Company City</Label>
//         <Input {...register("company.address.city")} />
//       </div>

//       <div>
//         <Label>Company State</Label>
//         <Input {...register("company.address.state")} />
//       </div>

//       <div>
//         <Label>Company State Code</Label>
//         <Input {...register("company.address.stateCode")} />
//       </div>

//       <div>
//         <Label>Company Postal Code</Label>
//         <Input {...register("company.address.postalCode")} />
//       </div>

//       <div>
//         <Label>Company Country</Label>
//         <Input {...register("company.address.country")} />
//       </div>

//       <div>
//         <Label>Company Latitude</Label>
//         <Input type="number" step="0.00001" {...register("company.address.coordinates.lat")} />
//       </div>

//       <div>
//         <Label>Company Longitude</Label>
//         <Input type="number" step="0.00001" {...register("company.address.coordinates.lng")} />
//       </div>

//       {/* Other Info */}
//       <div>
//         <Label>EIN</Label>
//         <Input {...register("ein")} />
//       </div>

//       <div>
//         <Label>SSN</Label>
//         <Input {...register("ssn")} />
//       </div>

//       <div>
//         <Label>User Agent</Label>
//         <Input {...register("userAgent")} />
//       </div>

//       {/* Crypto */}
//       <div>
//         <Label>Crypto Coin</Label>
//         <Input {...register("crypto.coin")} />
//       </div>

//       <div>
//         <Label>Crypto Wallet</Label>
//         <Input {...register("crypto.wallet")} />
//       </div>

//       <div>
//         <Label>Crypto Network</Label>
//         <Input {...register("crypto.network")} />
//       </div>

//       {/* Role */}
//       <div>
//         <Label>Role</Label>
//         <Input {...register("role")} />
//       </div>

    
     
//     </form>
//       {/* Submit */}
//       <Button type="submit" className="bg-blue-500 w-full hover:bg-blue-600 transition-colors ease-in-out 2s cursor-pointer text-white py-2 rounded font-semibold">
//         Submit
//       </Button>
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl p-10">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          User Registration
        </h1>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="grid grid-cols-2 gap-6 max-h-[600px] overflow-y-auto p-2 pr-4"
        >
          {/* First Name */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">First Name</Label>
            <Input {...register("firstName")} placeholder="Enter your first name" />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Last Name</Label>
            <Input {...register("lastName")} placeholder="Enter your last name" />
          </div>

          {/* Maiden Name */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Maiden Name</Label>
            <Input {...register("maidenName")} placeholder="Enter your maiden name" />
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Age</Label>
            <Input type="number" {...register("age")} placeholder="Enter your age" />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Gender</Label>
            <Input {...register("gender")} placeholder="Enter your gender" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Email</Label>
            <Input type="email" {...register("email")} placeholder="Enter your email" />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Phone</Label>
            <Input type="tel" {...register("phone")} placeholder="Enter your phone number" />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Username</Label>
            <Input {...register("username")} placeholder="Enter your username" />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Password</Label>
            <Input type="password" {...register("password")} placeholder="Enter your password" />
          </div>

          {/* Birth Date */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Birth Date</Label>
            <Input type="date" {...register("birthDate")} />
          </div>

          {/* Image URL */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Image URL</Label>
            <Input {...register("image")} placeholder="Enter image URL" />
          </div>

          {/* Blood Group */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Blood Group</Label>
            <Input {...register("bloodGroup")} placeholder="Enter blood group" />
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Height (in cm)</Label>
            <Input type="number" {...register("height")} placeholder="Enter height" />
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Weight (in kg)</Label>
            <Input type="number" {...register("weight")} placeholder="Enter weight" />
          </div>

          {/* Eye Color */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Eye Color</Label>
            <Input {...register("eyeColor")} placeholder="Enter eye color" />
          </div>

          {/* Hair Color */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Hair Color</Label>
            <Input {...register("hairColor")} placeholder="Enter hair color" />
          </div>

          {/* Domain */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Domain</Label>
            <Input {...register("domain")} placeholder="Enter your domain" />
          </div>

          {/* IP Address */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">IP Address</Label>
            <Input {...register("ip")} placeholder="Enter your IP address" />
          </div>

          {/* University */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">University</Label>
            <Input {...register("university")} placeholder="Enter university name" />
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Company Name</Label>
            <Input {...register("companyName")} placeholder="Enter company name" />
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Department</Label>
            <Input {...register("department")} placeholder="Enter department" />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Address</Label>
            <Input {...register("address")} placeholder="Enter address" />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <Label className="text-md font-semibold mb-1 text-gray-700">Role</Label>
            <Input {...register("role")} placeholder="Enter role" />
          </div>
        </form>

        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
