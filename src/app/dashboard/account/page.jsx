"use client";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { MdSupervisorAccount, MdMailOutline } from "react-icons/md";
import Button from "@/components/Button";
import { useCountries } from "@/context/CountriesContext";
import SelectInputNoLabel from "@/components/SelectInputNoLabel";
import { FaPlus } from "react-icons/fa";
// Input component
const InputField = ({
  label,
  type = "text",
  name,
  value,
  disabled,
  onChange,
}) => {
  return (
    <div className="mb-6">
      <label className="mb-2 block capitalize">{label}</label>
      <div className="border-b-2 border-green-200 pb-3 pt-2 dark:border-slate-700">
        <input
          name={name}
          id={value}
          className={`w-full border-none bg-transparent ${
            disabled && "!select-none text-gray-400"
          } focus:outline-none`}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
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
    userRole: "center",
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
    event.preventDefault();
    event.stopPropagation();
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/${user.userRole}/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(user),
      }
    )
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
        <div
          className="relative h-20 w-20 cursor-pointer"
          {...getRootProps()}
          title="Upload your photo"
        >
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
          {!isEditing && (
            <FaPlus
              size={30}
              className="absolute bottom-0 right-0 z-10 cursor-pointer rounded-full bg-green-500 p-1"
            />
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
          <p className="w-full bg-green-50 px-4 py-2 text-gray-500 focus:outline-gray-200 dark:bg-slate-800 dark:text-slate-200">
            <MdSupervisorAccount
              size={24}
              className="mr-2 inline-block text-green-500"
            />
            {user.userRole}
          </p>
        </div>
      </div>
      <h3 className="mb-4 w-full rounded-md py-2 font-bold dark:text-slate-200">
        Personal Information:
      </h3>
      <div className="grid gap-8 lg:grid-cols-2">
        {Object.entries(user)
          .filter(
            ([fieldKey]) =>
              !["country", "nationality", "image", "gender"].includes(fieldKey)
          )
          .map(([fieldKey, value], index) => {
            const label = fieldKey.replace(/_/g, " ");
            const placeholder = `Enter your ${fieldKey.replace(/_/g, " ")}`;
            return (
              <InputField
                key={index}
                label={label}
                placeholder={placeholder}
                value={user[fieldKey]}
                onChange={onChangeInput}
                disabled={!isEditing}
                name={fieldKey}
              />
            );
          })}

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
