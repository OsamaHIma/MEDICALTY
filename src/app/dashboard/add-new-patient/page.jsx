"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input, SelectInput } from "@/components/Input";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaIdBadge,
  FaInfoCircle,
  FaBriefcase,
  FaBirthdayCake,
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaKey,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useCountries } from "@/context/CountriesContext";
import { MdHeight, MdLineWeight } from "react-icons/md";
import { GiWeightScale } from "react-icons/gi";
const RegisterPatientPage = () => {
  const { countries, isCountriesLoading } = useCountries();

  const { uploadedPhoto } = usePhoto();
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const defaultProps = {
    center_id: "",
    insurance_company_id: "",
    name: "",
    username: "",
    birth_date: "",
    ssn: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    length: "",
    weight: "",
    bloodType: "",
    gender: "",
    nationality: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const {
    center_id,
    insurance_company_id,
    name,
    username,
    birth_date,
    ssn,
    phone,
    email,
    password,
    address,
    length,
    weight,
    bloodType,
    gender,
    nationality,
  } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSelectInputChange = ({ value }, { name }) => {
    setFormFields({ ...formFields, [name]: value });
  };
  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ ...formFields, image: uploadedPhoto }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
      } else {
        toast.error(`Failed to send data: ${data.message}`);
        console.error(data);
      }
    } catch (error) {
      toast.error(`${error.method}: ${error.message}`);
      console.error("Error:", error);
    }
  };

  const [isValid, setIsValid] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setIsValid("not-validated");
      toast.error("Please fill in all  fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };
  const cancelFormSubmit = () => {
    setFormFields(defaultProps);
    setIsValid("");
  };

  return (
    <section className="px-10">
      <Header imageUploader headerText="Add New Patient" />
      <form className={`${isValid}`} onSubmit={handleSubmit} noValidate>
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Input
            labelText="center_id"
            name="center_id"
            value={center_id}
            onChange={onChange}
            icon={<FaUser />}
            type="number"
          />
          <Input
            labelText="insurance company id"
            name="insurance_company_id"
            value={insurance_company_id}
            onChange={onChange}
            icon={<FaUser />}
            type="number"
          />
          <Input
            labelText="username"
            name="username"
            value={username}
            onChange={onChange}
            icon={<FaIdBadge />}
          />
          <Input
            labelText="Full name"
            name="name"
            value={name}
            onChange={onChange}
            icon={<FaIdBadge />}
          />

          <Input
            labelText="Date of Birth"
            name="birth_date"
            value={birth_date}
            onChange={onChange}
            icon={<FaBirthdayCake />}
            type="date"
          />
          <Input
            labelText="Phone Number"
            name="phone"
            value={phone}
            onChange={onChange}
            icon={<FaPhone />}
            type="tel"
          />
          <Input
            labelText="Email"
            name="email"
            value={email}
            onChange={onChange}
            icon={<FaEnvelope />}
            type="email"
          />

          <Input
            labelText="password"
            name="password"
            value={password}
            onChange={onChange}
            icon={<FaKey />}
            type="password"
          />
          <Input
            labelText="ssn"
            name="ssn"
            value={ssn}
            onChange={onChange}
            icon={<FaBriefcase />}
            type="number"
          />
          <Input
            labelText="weight"
            placeHolder="Your Weight in KG"
            name="weight"
            value={weight}
            onChange={onChange}
            icon={<GiWeightScale />}
            type="number"
          />
          <Input
            labelText="length"
            placeHolder="Your length in CM"
            name="length"
            value={length}
            onChange={onChange}
            icon={<MdHeight />}
            type="number"

          />

          <SelectInput
            labelText="Nationality"
            options={countries}
            name="nationality"
            value={[
              {
                value: nationality || "Select your nationality",
                label: nationality || "Select your nationality",
              },
            ]}
            onChange={onSelectInputChange}
            isLoading={isCountriesLoading}
          />
          <SelectInput
            labelText="blood Type"
            options={[
              { value: "A+", label: "A+" },
              { value: "A-", label: "A-" },
              { value: "B+", label: "B+" },
              { value: "B-", label: "B-" },
              { value: "O+", label: "O+" },
              { value: "O-", label: "O-" },
            ]}
            name="bloodType"
            value={[
              {
                value: bloodType || "Select your blood Type",
                label: bloodType || "Select your blood Type",
              },
            ]}
            onChange={onSelectInputChange}
          />
          <SelectInput
            labelText="Gender"
            options={genderOptions}
            name="gender"
            value={[
              {
                value: gender || "Select your gender",
                label: gender || "Select your gender",
              },
            ]}
            onChange={onSelectInputChange}
            placeholder="Select gender"
          />
        </div>
        <Input
          labelText="Address"
          name="address"
          value={address}
          onChange={onChange}
          icon={<FaHome />}
          type="textarea"
        />
        <div className="my-5 flex items-center justify-center gap-5">
          <Button content="Cancel" type="button" onClick={cancelFormSubmit} />
          <Button content="Add patient" type="submit" filled />
        </div>
      </form>
    </section>
  );
};

export default RegisterPatientPage;
