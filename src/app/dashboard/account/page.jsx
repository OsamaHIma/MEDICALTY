"use client";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";

import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { MdGroup, MdSupervisorAccount, MdMailOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import { useCountries } from "@/context/CountriesContext";
import SelectInputNoLabel from "@/components/SelectInputNoLabel";

const MyAccount = () => {
  // State variables
  const { countries, isCountriesLoading } = useCountries();
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    // "logo": "data:image/https://example.com/logo.png",
    name: "Example Center",
    username: "example_center",
    email: "d@1aexample.ccom",
    password: "password123",
    country: "US",
    subscription_type: "Basic",
    subscription_period: "Month",
    formal_email: "example@example.com",
    phone: "555-1234",
    formal_phone: "555-5678",
    website: "https://example.com",
    address1: "123 Main St",
    address2: "Apt 4",
    state: "CA",
    province: "California",
    zip_code: "90210",
    facebook: "https://www.facebook.com/example",
    instagram: "https://www.instagram.com/example",
    twitter: "https://www.twitter.com/example",
    snapchat: "https://www.snapchat.com/example",
    youtube: "https://www.youtube.com/channel/example",
  });
  const [isEditing, setIsEditing] = useState(false);
  const onChangeInput = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  // Input component
  const InputField = ({ label, placeholder, type = "text", value }) => {
    return (
      <div className="mb-6">
        <label htmlFor={label} className="mb-2 block capitalize">
          {label}
        </label>
        <div className="border-b-2 border-green-200 pb-3 pt-2 dark:border-slate-700">
          <input
            type={type}
            id={value}
            className={`w-full border-none bg-transparent  focus:outline-none`}
            placeholder={placeholder}
            value={value}
            onChange={onChangeInput}
            disabled={!isEditing}
          />
        </div>
      </div>
    );
  };

  // Set token and user on session change
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  // Save changes to user data
  const handleSaveChanges = () => {
    console.log(user);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(user),
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
  const onSelectInputChange = ({ value }, { name }) => {
    setUser({ ...user, [name]: value });
  };
  // Handle file drop for profile picture
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length) {
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setUser((prevState) => ({
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
  return (
    <div className="container px-10 py-12">
      <h1 className="mb-6 text-3xl font-bold">Account Information</h1>
      <div className="mb-8 flex items-center space-x-4">
        <div className="relative h-20 w-20" {...getRootProps()}>
          <input {...getInputProps()} />
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-500">
              {user?.name && (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-500">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
          {isEditing && (
            <div className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-green-500 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M12 20v-6m0-4V4M4 8l16 0m-8 12l0-6"></path>
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold">{user.name}</h2>
          <p className="w-full rounded-tl-md rounded-tr-md bg-green-50 px-4 py-2 text-gray-500 focus:outline-gray-200 dark:bg-slate-800 dark:text-slate-200">
            <MdMailOutline
              size={24}
              className="mr-2 inline-block text-green-500"
            />
            {user.email}
          </p>
          {user.type === "admin" ? (
            <p className="w-full bg-green-50 px-4 py-2 text-gray-500 focus:outline-gray-200 dark:bg-slate-800 dark:text-slate-200">
              <MdSupervisorAccount
                size={24}
                className="mr-2 inline-block text-green-500"
              />
              Admin
            </p>
          ) : (
            <p className="w-full bg-green-50 px-4 py-2 text-gray-500 focus:outline-gray-200 dark:bg-slate-800 dark:text-slate-200">
              <MdGroup size={24} className="mr-2 inline-block text-green-500" />
              Employee
            </p>
          )}
        </div>
      </div>
      <h3 className="mb-4 w-full rounded-md py-2 font-bold dark:text-slate-200">
        Personal Information:
      </h3>
      <div className="grid gap-8 lg:grid-cols-2">
        {Object.entries(user)
          .filter(
            ([key]) =>
              !["country", "nationality", "image", "gender"].includes(key)
          )
          .map(([key, value]) => {
            const label = key.replace(/_/g, " ");
            const placeholder = `Enter your ${key.replace(/_/g, " ")}`;
            return (
              <InputField
                key={key}
                label={label}
                placeholder={placeholder}
                value={user[key]}
              />
            );
          })}
        {/* <InputField
          label="Full name"
          placeholder="Enter your full name"
          value={user.fullName}
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={user.email}
        />
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={user.username}
        />
        <InputField
          label="Date of birth"
          placeholder="DD/MM/YYYY"
          type="date"
          value={user.dateOfBirth}
        />
        <InputField
          label="National number"
          placeholder="Enter your national number"
          type="number"
          value={user.nationalNumber}
        />
        <InputField
          label="Phone number"
          placeholder="Enter your phone number"
          type="tel"
          value={user.phoneNumber}
        />
        <InputField
          label="Home address"
          placeholder="Enter your home address"
          value={user.homeAddress}
        />
        <InputField
          label="Height (cm)"
          placeholder="Enter your height in cm"
          type="number"
          value={user.height}
        />
        <InputField
          label="Weight (kg)"
          placeholder="Enter your weight in kg"
          type="number"
          value={user.weight}
        /> */}
        <div className="mb-6 ">
          <label htmlFor="blood_type" className="mb-2 block">
            Blood type
          </label>
          <SelectInputNoLabel
            onChange={onSelectInputChange}
            isDisabled={!isEditing}
            name="blood_type"
            value={[
              {
                value: user.blood_type || "Select your blood type",
                label: user.blood_type || "Select your blood type",
              },
            ]}
            options={[
              { value: "A+", label: "A+" },
              { value: "A-", label: "A-" },
              { value: "B+", label: "B+" },
              { value: "B-", label: "B-" },
              { value: "O+", label: "O+" },
              { value: "O-", label: "O-" },
            ]}
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="gender" className="mb-2 block">
            Gender
          </label>
          <SelectInputNoLabel
            onChange={onSelectInputChange}
            isDisabled={!isEditing}
            label="Gender"
            name="gender"
            value={[
              {
                value: user.gender || "Select your gender",
                label: user.gender || "Select your gender",
              },
            ]}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="nationality" className="mb-2 block">
            Nationality
          </label>
          <SelectInputNoLabel
            onChange={onSelectInputChange}
            isDisabled={!isEditing}
            isLoading={isCountriesLoading}
            name="nationality"
            options={countries}
            value={[
              {
                value: user.nationality || "Select your nationality",
                label: user.nationality || "Select your nationality",
              },
            ]}
          />
        </div>
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
