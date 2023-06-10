"use client";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaEnvelope,
  FaUserAlt,
} from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { MdGroup, MdSupervisorAccount, MdMailOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "@/components/Button";

const InputField = ({ label, placeholder, type = "text" }) => {
  const [value, setValue] = useState("");

  return (
    <div className="mb-6">
      <label htmlFor={label} className="block mb-2">
        {label}
      </label>
      <div className="border-b-2 border-green-200 dark:border-slate-700 pt-2 pb-3">
        <input
          type={type}
          id={label}
          className={`w-full bg-transparent border-none focus:outline-none ${
            value && "pt-2"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

const MyAccount = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/${user.id}`,
        {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const { user } = await response.json();
      setUser(user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
      setUser(session.user.user);
    }
  }, [session]);
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleUpdateUser = (field, value) => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("img", updatedUser);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setIsEditing(false);
        toast.success(data.massage);
      })
      .catch((error) => {
        toast.error(`Failed to update user information. ${error.massage}`);
        console.log(error);
      });
  };
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const handleProfilePictureEditClick = () => {
    setIsEditingProfilePicture(true);
  };
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length) {
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setUpdatedUser((prevState) => ({
        ...prevState,
        image: imageUrl,
      }));
      console.log(updatedUser);
      handleSaveChanges();
    } else {
      // Handle not accepted files here, show an error message
      toast.error("Invalid file type. Please upload an image.");
    }
    setIsEditingProfilePicture(false);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.first.org/data/v1/countries"
        ,{
          headers:{
            "method": "GET",
            
          }
        }
      );
      const data= await response.json();
      console.log(data);
      // const options = data.map((country) => ({
      //   value: country,
      //   label: country.country,
      // }));
      // setOptions(options);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const SelectField = ({ label, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
      <div className="mb-6 ">
        <label htmlFor={label} className="block mb-2">
          {label}
        </label>
        <Select
          options={options}
          value={selectedOption}
          onChange={(option) => setSelectedOption(option)}
          className="w-full text-slate-700 "
          isLoading={isLoading}
          // theme={(theme) => ({
          //   ...theme,
          //   colors: {
          //     ...theme.colors,
          //     primary25: `${theme === "light" ? "#B2F5EA" : "#4A5568"}`,
          //     primary: `${theme === "light" ? "#34D399" : "#CBD5E0"}`,
          //   },
          // })}
        />
      </div>
    );
  };
  return (
    <div className="container px-10 py-12">
      <h1 className="text-3xl font-bold mb-6">Account Information</h1>
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 relative" {...getRootProps()}>
          <input {...getInputProps()} />
          {updatedUser.image ? (
            <img
              src={updatedUser.image}
              alt={updatedUser.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex justify-center items-center text-gray-500 font-bold text-xl">
              {updatedUser?.name && (
                <div className="w-full h-full bg-gray-200 rounded-full flex justify-center items-center text-gray-500 font-bold text-xl">
                  {updatedUser.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
          {isEditing && (
            <div
              className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full cursor-pointer"
              onClick={handleProfilePictureEditClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-white"
              >
                <path d="M12 20v-6m0-4V4M4 8l16 0m-8 12l0-6"></path>
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <p className="px-4 w-full rounded-tr-md rounded-tl-md bg-green-50 dark:bg-slate-800 dark:text-slate-200 focus:outline-gray-200 py-2 text-gray-500">
            <MdMailOutline
              size={24}
              className="inline-block mr-2 text-green-500"
            />
            {user.email}
          </p>
          {user.type === "admin" ? (
            <p className="px-4 w-full bg-green-50 dark:bg-slate-800 dark:text-slate-200 focus:outline-gray-200 py-2 text-gray-500">
              <MdSupervisorAccount
                size={24}
                className="inline-block mr-2 text-green-500"
              />
              Admin
            </p>
          ) : (
            <p className="px-4 w-full bg-green-50 dark:bg-slate-800 dark:text-slate-200 focus:outline-gray-200 py-2 text-gray-500">
              <MdGroup size={24} className="inline-block mr-2 text-green-500" />
              Employee
            </p>
          )}
        </div>
      </div>
      <h3 className="py-2 w-full rounded-md dark:text-slate-200 font-bold mb-4">
        Personal Information:
      </h3>
      <div className="grid gap-8 lg:grid-cols-2">
        <InputField label="Full name" placeholder="Enter your full name" />
        <InputField label="Email" placeholder="Enter your email" type="email" />
        <InputField label="@username" placeholder="Enter your username" />
        <InputField label="Name" placeholder="Enter your name" />
        <InputField
          label="Date of birth"
          placeholder="DD/MM/YYYY"
          type="date"
        />
        <InputField
          label="National number"
          placeholder="Enter your national number"
          type="number"
        />
        <InputField
          label="Phone number"
          placeholder="Enter your phone number"
          type="tel"
        />
        <InputField
          label="Home address"
          placeholder="Enter your home address"
        />
        <InputField
          label="Height (cm)"
          placeholder="Enter your height in cm"
          type="number"
        />
        <InputField
          label="Weight (kg)"
          placeholder="Enter your weight in kg"
          type="number"
        />
        <SelectField
          label="Blood type"
          options={[
            { value: "A+", label: "A+" },
            { value: "A-", label: "A-" },
            { value: "B+", label: "B+" },
            { value: "B-", label: "B-" },
            { value: "O+", label: "O+" },
            { value: "O-", label: "O-" },
          ]}
        />
        <SelectField
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <SelectField label="Nationality" options={options} />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <>
            <Button
              additionalClasses="!mr-4"
              onClick={() => setIsEditing(false)}
              content="Cancel"
            />

            <Button
              buttonType="filled"
              onClick={handleSaveChanges}
              content="Save Changes"
            />
          </>
        ) : (
          <Button
            buttonType="filled"
            onClick={() => setIsEditing(true)}
            content="Edit Information"
          />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
