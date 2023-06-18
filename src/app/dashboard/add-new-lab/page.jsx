"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { HiIdentification, HiUserCircle } from "react-icons/hi";

import { toast } from "react-toastify";
import { FaBuilding, FaGlobe, FaKey, FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const AddLap = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const defaultProps = {
    center_id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    address: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const {
    center_id,
    name,
    username,
    email,
    password,
    phone,
    website,
    address,
  } = formFields;

  const { uploadedPhoto } = usePhoto();

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/center/admin/lab/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formFields),
      });

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
      } else {
        toast.error("Failed to send data");
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };

  const [isValid, setIsValid] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      setIsValid("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };

  return (
    <section>
      <Header imageUploader headerText="Add new lab" />
      <form
        className={`px-10 ${isValid}`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-3">
          <div className="flex flex-col gap-4">
            <Input
              labelText="center id"
              placeHolder="center id - from the system"
              icon={<FaBuilding size={23} />}
              name="center_id"
              value={center_id}
              onChange={onChange}
              type="number"
            />

            <Input
              labelText="lab Name"
              placeHolder="lab Name"
              icon={<HiIdentification size={23} />}
              name="name"
              value={name}
              onChange={onChange}
            />
            <Input
              labelText="username"
              icon={<HiUserCircle size={23} />}
              name="username"
              value={username}
              onChange={onChange}
            />
            <Input
              labelText="email"
              placeHolder="email - from the system"
              icon={<MdEmail size={23} />}
              name="email"
              value={email}
              onChange={onChange}
              type="email"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              labelText="password"
              icon={<FaKey size={23} />}
              name="password"
              value={password}
              onChange={onChange}
              type="password"
              required
            />
            <Input
              labelText="phone number"
              icon={<FaPhone size={23} />}
              name="phone"
              value={phone}
              onChange={onChange}
              type="tel"
            />
            <Input
              labelText="website"
              icon={<FaGlobe size={23} />}
              name="website"
              value={website}
              onChange={onChange}
              type="url"
            />
            <Input
              labelText="address"
              icon={<FaUser size={23} />}
              name="address"
              value={address}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="flex w-full justify-center mt-5">
          <Button
            type="submit"
            content="Add lab"
            filled
            additionalClasses="!py-3 !w-48"
          />
        </div>
      </form>
    </section>
  );
};

export default AddLap;
