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
const RegisterDoctorPage = () => {
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
    department_id: "",
    specialty: "",
    username: "",
    name: "",
    ssn: "",
    phone: "",
    work_phone: "",
    email: "",
    password: "",
    work_email: "",
    job_description: "",
    abstract: "",
    full_brief: "",
    job_id: "",
    birth_date: "",
    experience_years: "",
    salary: "",
    gender: "",
    nationality: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const {
    center_id,
    department_id,
    specialty,
    username,
    name,
    ssn,
    phone,
    work_phone,
    email,
    password,
    work_email,
    job_description,
    abstract,
    full_brief,
    job_id,
    birth_date,
    experience_years,
    address,
    salary,
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
      const response = await fetch("/api/doctor/register", {
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
      <Header imageUploader headerText="Add New Doctor" />
      <form className={`${isValid}`} onSubmit={handleSubmit} noValidate>
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <Input
              labelText="center_id"
              name="center_id"
              value={center_id}
              onChange={onChange}
              icon={<FaUser />}
              type="number"
            />
            <Input
              labelText="department id"
              name="department_id"
              value={department_id}
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
              labelText="specialty"
              name="specialty"
              value={specialty}
              onChange={onChange}
              icon={<FaBriefcase />}
            />
            <Input
              labelText="salary"
              name="salary"
              value={salary}
              onChange={onChange}
              icon={<FaInfoCircle />}
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
              labelText="Work Phone Number"
              name="work_phone"
              value={work_phone}
              onChange={onChange}
              icon={<FaPhone />}
              type="tel"
            />

            <Input
              labelText="Social security number"
              name="ssn"
              value={ssn}
              onChange={onChange}
              icon={<FaBriefcase />}
              type="number"
            />
            <Input
              labelText="Job ID"
              name="job_id"
              value={job_id}
              onChange={onChange}
              icon={<FaBriefcase />}
              type="number"
            />
            <Input
              labelText="abstract"
              name="abstract"
              value={abstract}
              onChange={onChange}
              icon={<FaBriefcase />}
            />
            <Input
              labelText="password"
              name="password"
              value={password}
              onChange={onChange}
              icon={<FaKey />}
              type="password"
              minLength={8}
            />
            <SelectInput
              labelText="Nationality"
              options={countries}
              name="nationality"
              value={[
                {
                  value: nationality||"Select your nationality",
                  label: nationality||"Select your nationality",
                },
              ]}
              onChange={onSelectInputChange}
              isLoading={isCountriesLoading}
            />
            <SelectInput
              labelText="Gender"
              options={genderOptions}
              name="gender"
              value={[
                {
                  value: gender||"Select your gender",
                  label: gender||"Select your gender",
                },
              ]}
              onChange={onSelectInputChange}
              placeholder="Select gender"
            />
            <Input
              labelText="Years of Experience"
              name="experience_years"
              value={experience_years}
              onChange={onChange}
              icon={<FaUserTie />}
              type="number"
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
              labelText="Work Email"
              name="work_email"
              value={work_email}
              onChange={onChange}
              icon={<FaEnvelope />}
              type="email"
            />
        </div>

        <div className="flex flex-col gap-5">
          <Input
            labelText="Address"
            name="address"
            value={address}
            onChange={onChange}
            icon={<FaHome />}
          />
        </div>
        <div className="my-6 grid gap-6 lg:grid-cols-2">
          <Input
            labelText="full brief"
            name="full_brief"
            type="textarea"
            value={full_brief}
            onChange={onChange}
            icon={<FaInfoCircle />}
          />
          <Input
            labelText="job description"
            name="job_description"
            value={job_description}
            onChange={onChange}
            icon={<FaUserTie />}
            type="textarea"
          />
        </div>
        <div className="my-5 flex items-center justify-center gap-5">
          <Button content="Cancel" type="button" onClick={cancelFormSubmit} />
          <Button content="Add Doctor" type="submit" filled />
        </div>
      </form>
    </section>
  );
};

export default RegisterDoctorPage;
