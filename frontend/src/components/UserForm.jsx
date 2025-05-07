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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  maidenName: yup.string().required("Maiden Name is required"),
  age: yup.number().positive("Age must be positive").integer("Age must be an integer").required("Age is required"),
  gender: yup.string().required("Gender is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  birthDate: yup.string().required("Birth Date is required"),
  image: yup.string().url("Invalid image URL").required("Image URL is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  height: yup.number().positive("Height must be positive").required("Height is required"),
  weight: yup.number().positive("Weight must be positive").required("Weight is required"),
  eyeColor: yup.string().required("Eye Color is required"),
  hair: yup.object().shape({
    color: yup.string().required("Hair Color is required"),
    type: yup.string().required("Hair Type is required"),
  }).required("Hair details are required"),
  domain: yup.string().required("Domain is required"),
  ip: yup.string().required("IP Address is required"),
  macAddress: yup.string().required("MAC Address is required"),
  university: yup.string().required("University is required"),
  address: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup.string().required("Postal Code is required"),
    country: yup.string().required("Country is required"),
    coordinates: yup.object().shape({
      lat: yup.number().required("Latitude is required"),
      lng: yup.number().required("Longitude is required"),
    }).required("Coordinates are required"),
  }).required("Address is required"),
  bank: yup.object().shape({
    cardExpire: yup.string().required("Card Expiry Date is required"),
    cardNumber: yup.string().required("Card Number is required"),
    cardType: yup.string().required("Card Type is required"),
    currency: yup.string().required("Currency is required"),
    iban: yup.string().required("IBAN is required"),
  }).required("Bank details are required"),
  company: yup.object().shape({
    department: yup.string().required("Department is required"),
    name: yup.string().required("Company Name is required"),
    title: yup.string().required("Job Title is required"),
    address: yup.object().shape({
      address: yup.string().required("Company Address is required"),
      city: yup.string().required("Company City is required"),
      state: yup.string().required("Company State is required"),
      postalCode: yup.string().required("Company Postal Code is required"),
      coordinates: yup.object().shape({
        lat: yup.number().required("Company Latitude is required"),
        lng: yup.number().required("Company Longitude is required"),
      }).required("Company Coordinates are required"),
    }).required("Company Address is required"),
  }).required("Company details are required"),
  ein: yup.string().required("EIN is required"),
  ssn: yup.string().required("SSN is required"),
  userAgent: yup.string().required("User Agent is required"),
  crypto: yup.object().shape({
    coin: yup.string().required("Crypto Coin is required"),
    wallet: yup.string().required("Crypto Wallet is required"),
    network: yup.string().required("Crypto Network is required"),
  }).required("Crypto details are required"),
  role: yup.string().required("Role is required"),
});

export default function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hair: { color: "", type: "" },
      address: { address: "", city: "", state: "", postalCode: "", country: "", coordinates: { lat: 0, lng: 0 } },
      bank: { cardExpire: "", cardNumber: "", cardType: "", currency: "", iban: "" },
      company: { department: "", name: "", title: "", address: { address: "", city: "", state: "", postalCode: "", coordinates: { lat: 0, lng: 0 } } },
      crypto: { coin: "", wallet: "", network: "" }
    }
  });

  const onSubmit = async (data) => {
    await axios.post("http://localhost:3000/create", data)
      .then((response) => {
        console.log("User created successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error creating the user:", error);
      })
    
  };


 const inputs = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Maiden Name", name: "maidenName", type: "text" },
  { label: "Age", name: "age", type: "number" },
  { label: "Gender", name: "gender", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone", name: "phone", type: "text" },
  { label: "Username", name: "username", type: "text" },
  { label: "Password", name: "password", type: "password" },
  { label: "Birth Date", name: "birthDate", type: "date" },
  { label: "Blood Group", name: "bloodGroup", type: "text" },
  { label: "Height", name: "height", type: "number" },
  { label: "Weight", name: "weight", type: "number" },
  { label: "Eye Color", name: "eyeColor", type: "text" },

  // Hair
  { label: "Hair Color", name: "hair.color", type: "text" },
  { label: "Hair Type", name: "hair.type", type: "text" },

  // Address
  { label: "Address", name: "address.address", type: "text" },
  { label: "City", name: "address.city", type: "text" },
  { label: "State", name: "address.state", type: "text" },
  { label: "Postal Code", name: "address.postalCode", type: "text" },
  { label: "Latitude", name: "address.coordinates.lat", type: "number" },
  { label: "Longitude", name: "address.coordinates.lng", type: "number" },

  // Bank
  { label: "Bank Card Expire", name: "bank.cardExpire", type: "text" },
  { label: "Bank Card Number", name: "bank.cardNumber", type: "text" },
  { label: "Bank Card Type", name: "bank.cardType", type: "text" },
  { label: "Bank Currency", name: "bank.currency", type: "text" },
  { label: "Bank IBAN", name: "bank.iban", type: "text" },

  // Company
  { label: "Company Name", name: "company.name", type: "text" },
  { label: "Company Department", name: "company.department", type: "text" },
  { label: "Company Title", name: "company.title", type: "text" },

  { label: "Company Address", name: "company.address.address", type: "text" },
  { label: "Company City", name: "company.address.city", type: "text" },
  { label: "Company State", name: "company.address.state", type: "text" },
  { label: "Company Postal Code", name: "company.address.postalCode", type: "text" },
  { label: "Company Latitude", name: "company.address.coordinates.lat", type: "number" },
  { label: "Company Longitude", name: "company.address.coordinates.lng", type: "number" },

  // Crypto
  { label: "Crypto Coin", name: "crypto.coin", type: "text" },
  { label: "Crypto Wallet", name: "crypto.wallet", type: "text" },
  { label: "Crypto Network", name: "crypto.network", type: "text" },

  // Other
  { label: "Domain", name: "domain", type: "text" },
  { label: "IP", name: "ip", type: "text" },
  { label: "MAC Address", name: "macAddress", type: "text" },
  { label: "University", name: "university", type: "text" },
  { label: "SSN", name: "ssn", type: "text" },
  { label: "EIN", name: "ein", type: "text" },
  { label: "User Agent", name: "userAgent", type: "text" },
  { label: "Role", name: "role", type: "text" },
];



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-6xl p-10">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">User Registration</h1>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="grid grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto p-2 pr-4"
        >
          {inputs.map((field) => (
            <div key={field.name} className="flex flex-col">
              <Label className="text-md font-semibold mb-1 text-gray-700">{field.label}</Label>
              <Input 
                type={field.type || "text"} 
                {...register(field.name)} 
                placeholder={`Enter ${field.label.toLowerCase()}`} 
              />
              {errors?.[field.name?.split('.')[0]] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name?.split('.')[0]]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Submit Button inside the form */}
          <div className="col-span-2 flex justify-center mt-6">
            <Button type="submit" className="w-full bg-blue-500  hover:bg-blue-600 text-white">Register</Button>
          </div>
        </form>
      </div>
      <div className="absolute top-5 left-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 bg-gradient-to-r from-blue-500  to-blue-600 text-white text-md tracking-tight font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
        <Link to="/" className="text-md flex items-center justify-center gap-1"> <IoIosArrowRoundBack  className="text-2xl"/>Go Back</Link>
</div>

    </div>
  );
}
