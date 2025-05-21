import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
// import { set } from "date-fns";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  maidenName: yup.string().required("Maiden Name is required"),
  age: yup.number().positive().integer().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(6).required("Password is required"),
  birthDate: yup.string().required("Birth Date is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  height: yup.number().positive().required("Height is required"),
  weight: yup.number().positive().required("Weight is required"),
  eyeColor: yup.string().required("Eye Color is required"),
  hair: yup.object().shape({
    color: yup.string().required("Hair Color is required"),
    type: yup.string().required("Hair Type is required"),
  }),
  domain: yup.string().required("Domain is required"),
  ip: yup.string().required("IP Address is required"),
  macAddress: yup.string().required("MAC Address is required"),
  university: yup.string().required("University is required"),
  address: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup.string().required("Postal Code is required"),
    // country: yup.string().required("Country is required"),
    coordinates: yup.object().shape({
      lat: yup.number().required("Latitude is required"),
      lng: yup.number().required("Longitude is required"),
    }),
  }),
  bank: yup.object().shape({
    cardExpire: yup.string().required("Card Expiry Date is required"),
    cardNumber: yup.string().required("Card Number is required"),
    cardType: yup.string().required("Card Type is required"),
    currency: yup.string().required("Currency is required"),
    iban: yup.string().required("IBAN is required"),
  }),
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
      }),
    }),
  }),
  ein: yup.string().required("EIN is required"),
  ssn: yup.string().required("SSN is required"),
  userAgent: yup.string().required("User Agent is required"),
  crypto: yup.object().shape({
    coin: yup.string().required("Crypto Coin is required"),
    wallet: yup.string().required("Crypto Wallet is required"),
    network: yup.string().required("Crypto Network is required"),
  }),
  role: yup.string().required("Role is required"),
});

export default function UserForm({ mode = "create" }) {
  const { userId } = useParams();
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hair: { color: "", type: "" },
      address: {
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        coordinates: { lat: 0, lng: 0 },
      },
      bank: {
        cardExpire: "",
        cardNumber: "",
        cardType: "",
        currency: "",
        iban: "",
      },
      company: {
        department: "",
        name: "",
        title: "",
        address: {
          address: "",
          city: "",
          state: "",
          postalCode: "",
          coordinates: { lat: 0, lng: 0 },
        },
      },
      crypto: { coin: "", wallet: "", network: "" },
    },
  });

  const getNestedError = (name) => {
    return name.split(".").reduce((obj, key) => obj?.[key], errors)?.message;
  };

  useEffect(() => {
    if (mode !== "create") {
      const fetchUser = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`http://localhost:3000/user/${userId}`);
          reset(res.data);
          if (res.data.image) setExistingImage(res.data.image);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, [userId, mode, reset]);

  const onSubmit = async (data) => {
    if (mode === "view") return;
  
    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      formData.append("data", JSON.stringify(data));
  
      if (mode === "create") {
        await axios.post("http://localhost:3000/create", formData);
        alert("User created successfully!");
        navigate("/users"); 
        await axios.put(`http://localhost:3000/user/${userId}`, formData);
        alert("User updated successfully!");
      }
    } catch (err) {
      console.error("Operation failed:", err);
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="flex flex-col items-center gap-4">
        <CircularProgress size={60} />
        <p className="text-lg font-medium text-gray-700">
          {mode === "view" ? "Loading user details..." : 
           mode === "edit" ? "Loading user data for editing..." : 
           "Preparing registration form..."}
        </p>
      </div>
    </div>
  );
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log("Selected image:", file);
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
    {
      label: "Password",
      name: "password",
      type: "password",
      disabled: mode === "edit",
    },
    { label: "Birth Date", name: "birthDate", type: "date" },
    { label: "Blood Group", name: "bloodGroup", type: "text" },
    { label: "Height", name: "height", type: "number" },
    { label: "Weight", name: "weight", type: "number" },
    { label: "Eye Color", name: "eyeColor", type: "text" },
    { label: "Hair Color", name: "hair.color", type: "text" },
    { label: "Hair Type", name: "hair.type", type: "text" },
    { label: "Address", name: "address.address", type: "text" },
    { label: "City", name: "address.city", type: "text" },
    { label: "State", name: "address.state", type: "text" },
    { label: "Postal Code", name: "address.postalCode", type: "text" },
    { label: "Latitude", name: "address.coordinates.lat", type: "number" },
    { label: "Longitude", name: "address.coordinates.lng", type: "number" },
    { label: "Bank Card Expire", name: "bank.cardExpire", type: "text" },
    { label: "Bank Card Number", name: "bank.cardNumber", type: "text" },
    { label: "Bank Card Type", name: "bank.cardType", type: "text" },
    { label: "Bank Currency", name: "bank.currency", type: "text" },
    { label: "Bank IBAN", name: "bank.iban", type: "text" },
    { label: "Company Name", name: "company.name", type: "text" },
    { label: "Company Department", name: "company.department", type: "text" },
    { label: "Company Title", name: "company.title", type: "text" },
    { label: "Company Address", name: "company.address.address", type: "text" },
    { label: "Company City", name: "company.address.city", type: "text" },
    { label: "Company State", name: "company.address.state", type: "text" },
    {
      label: "Company Postal Code",
      name: "company.address.postalCode",
      type: "text",
    },
    {
      label: "Company Latitude",
      name: "company.address.coordinates.lat",
      type: "number",
    },
    {
      label: "Company Longitude",
      name: "company.address.coordinates.lng",
      type: "number",
    },
    { label: "Crypto Coin", name: "crypto.coin", type: "text" },
    { label: "Crypto Wallet", name: "crypto.wallet", type: "text" },
    { label: "Crypto Network", name: "crypto.network", type: "text" },
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
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          {mode === "view"
            ? "User Details"
            : mode === "edit"
            ? "Edit User"
            : "User Registration"}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto p-2 pr-4"
        >
          <div className="col-span-2 flex flex-col items-center mt-2 mb-4 gap-4">
            <Label className="text-md font-semibold text-gray-700">
              Profile Image
            </Label>
            {existingImage || image ? (
              <img
                src={image ? URL.createObjectURL(image) : existingImage}
                alt="Preview"
                className="w-42 h-42 rounded-full object-cover shadow-md border border-gray-300 hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-42 h-42 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border">
                No Image
              </div>
            )}
            {mode !== "view" && (
              <Input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-fit"
              />
            )}
          </div>
          {inputs.map((field) => (
            <div key={field.name} className="flex flex-col">
              <Label className="text-md font-semibold mb-1 text-gray-700">
                {field.label}
              </Label>
              <Input
                type={field.type || "text"}
                {...register(field.name)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                disabled={mode === "view"}
                className={
                  mode === "view" ? "bg-gray-100 cursor-not-allowed" : ""
                }
              />
              {getNestedError(field.name) && (
                <p className="text-red-500 text-sm">
                  {getNestedError(field.name)}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-center gap-4 mt-6">
            {mode !== "view" && (
              <button
                type="submit"
                className="w-full bg-blue-500 cursor-pointer rounded-xl py-2 hover:bg-blue-600 text-white"
              >
                {mode === "edit" ? "Update User" : "Register User"}
              </button>
            )}
            <Link
              to={mode === "create" ? "/" : "/users"}
              className="w-full bg-gray-500 text-center cursor-pointer rounded-xl py-2 hover:bg-gray-600 text-white"
            >
              {mode === "view" ? "Back to List" : "Cancel"}
            </Link>
          </div>
        </form>
      </div>

      <div className="absolute top-5 left-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-md tracking-tight font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
        <Link
          to={mode === "create" ? "/" : "/users"}
          className="text-md flex items-center justify-center gap-1"
        >
          <IoIosArrowRoundBack className="text-2xl" />
          {mode === "view" ? "Back to List" : "Go Back"}
        </Link>
      </div>
    </div>
  );
}
