"use client";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";

import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { MdGroup, MdSupervisorAccount, MdMailOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "@/components/Button";
const MyAccount = () => {
  // State variables
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  // Input component
  const InputField = ({ label, placeholder, type = "text", defaultValue }) => {
    const [value, setValue] = useState(defaultValue);
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
            disabled={!isEditing}
          />
        </div>
      </div>
    );
  };
  // Fetch user data
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/${userId}`,
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
  // Set token and user on session change
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
      setUserId(session.user.user.id || 3);
      fetchUser();
    }
  }, [session]);
  // Update user state when user changes
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);
  // Update user state on field change
  const handleUpdateUser = (field, value) => {
    setUser((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  // Save changes to user data
  const handleSaveChanges = () => {
    console.log(updatedUser);
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
  // Profile picture editing
  // const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  // const handleProfilePictureEditClick = () => {
  //   setIsEditingProfilePicture(true);
  // };
  // Handle file drop for profile picture
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length) {
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setUpdatedUser((prevState) => ({
        ...prevState,
        image: imageUrl,
      }));
      // handleSaveChanges();
    } else {
      // Handle not accepted files here, show an error message
      toast.error("Invalid file type. Please upload an image.");
    }
    // setIsEditingProfilePicture(false);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { [`image/*`]: [] },
    maxFiles: 1,
  });
  // Fetch countries for nationality selection
  useEffect(() => {
    setLoading(true);
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryOptions = data.map((country) => ({
          value: country.cca3,
          label: country.name.common,
        }));
        setOptions(countryOptions);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);
  const SelectField = ({ label, options, defaultValue, ...rest }) => {
    const [selectedOption, setSelectedOption] = useState({});
    const [value, setValue] = useState(defaultValue);
    const handelSelectedOption = (option, { name }) => {
      setSelectedOption(option);
      setUpdatedUser((prevState) => ({
        ...prevState,
        [name]: option.value,
      }));
      console.log("selectedOption" + selectedOption);
    };
    return (
      <div className="mb-6 ">
        <label htmlFor={label} className="block mb-2">
          {label}
        </label>
        <Select
          options={options}
          value={selectedOption}
          placeholder="select"
          defaultInputValue={value}
          onChange={handelSelectedOption}
          className="w-full text-slate-700 "
          required
          isDisabled={!isEditing}
          {...rest}
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
            <div className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full cursor-pointer">
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
        <InputField
          label="Full name"
          placeholder="Enter your full name"
          defaultValue={user.fullName}
          onChange={(e) => handleUpdateUser("fullName", e.target.value)}
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          defaultValue={user.email}
          onChange={(e) => handleUpdateUser("email", e.target.value)}
        />
        <InputField
          label="@username"
          placeholder="Enter your username"
          defaultValue={user.username}
          onChange={(e) => handleUpdateUser("username", e.target.value)}
        />
        <InputField
          label="Date of birth"
          placeholder="DD/MM/YYYY"
          type="date"
          defaultValue={user.dateOfBirth}
          onChange={(e) => handleUpdateUser("dateOfBirth", e.target.value)}
        />
        <InputField
          label="National number"
          placeholder="Enter your national number"
          type="number"
          defaultValue={user.nationalNumber}
          onChange={(e) => handleUpdateUser("nationalNumber", e.target.value)}
        />
        <InputField
          label="Phone number"
          placeholder="Enter your phone number"
          type="tel"
          defaultValue={user.phoneNumber}
          onChange={(e) => handleUpdateUser("phoneNumber", e.target.value)}
        />
        <InputField
          label="Home address"
          placeholder="Enter your home address"
          defaultValue={user.homeAddress}
          onChange={(e) => handleUpdateUser("homeAddress", e.target.value)}
        />
        <InputField
          label="Height (cm)"
          placeholder="Enter your height in cm"
          type="number"
          defaultValue={user.height}
          onChange={(e) => handleUpdateUser("height", e.target.value)}
        />
        <InputField
          label="Weight (kg)"
          placeholder="Enter your weight in kg"
          type="number"
          defaultValue={user.weight}
          onChange={(e) => handleUpdateUser("weight", e.target.value)}
        />
        <SelectField
          label="Blood type"
          name="blood-type"
          defaultValue={user.blood_type}
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
          name="gender"
          defaultValue={user.gender}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <SelectField
          label="Nationality"
          isLoading={isLoading}
          name="nationality"
          options={options}
          defaultValue={user.country}
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <>
            <Button
              additionalClasses="!mr-4"
              onClick={() => setIsEditing(false)}
              content="Cancel"
            />

            <Button filled onClick={handleSaveChanges} content="Save Changes" />
          </>
        ) : (
          <Button
            filled
            onClick={() => setIsEditing(true)}
            content="Edit Information"
          />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
