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
} from "react-icons/fa";
import { toast } from "react-toastify";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";

const RegisterDoctorPage = () => {
  const [countries, setCountries] = useState([]);
  const { uploadedPhoto } = usePhoto();
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryOptions = data.map((country) => ({
          value: country.cca3,
          label: country.name.common,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  // oldProps ={
  //   doctorImage: "",
  //   username: "",
  //   fullName: "",
  //   nationalId: "",
  //   jobTitle: "",
  //   shortBio: "",
  //   longBio: "",
  //   jobNumber: "",
  //   dateOfBirth: "",
  //   yearsOfExperience: "",
  //   expertise: {
  //     experienceNumber: "",
  //     experienceName: "",
  //     experienceWorkplace: "",
  //     experienceWorkplaceCountry: "",
  //     experienceStartDate: "",
  //     experienceEndDate: "",
  //     experienceCurrent: false,
  //   },
  //   phoneNumber: "",
  //   workPhoneNumber: "",
  //   email: "",
  //   workEmail: "",
  //   address: "",
  //   gender: "",
  //   nationality: "",
  // }
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

  const onExpertiseChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      expertise: { ...expertise, [name]: value },
    });
  };

  const onCurrentlyWorkingChange = (event) => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      currentlyWorking: event.target.value,
    }));
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
      toast.error("Please fill in all required fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };
  const cancelFormSubmit = () => {
    resetFormFields();
    setIsValid("");
  };

  return (
    <section className="px-10">
      <Header imageUploader headerText="Add New Doctor" />
      <form className={`${isValid}`} onSubmit={handleSubmit} noValidate>
        <div className=" my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Input
              labelText="center_id"
              name="center_id"
              value={center_id}
              onChange={onChange}
              icon={<FaUser />}
              required
            />
            <Input
              labelText="department id"
              name="department_id"
              value={department_id}
              onChange={onChange}
              icon={<FaUser />}
              required
            />
            <Input
              labelText="username"
              name="username"
              value={username}
              onChange={onChange}
              icon={<FaIdBadge />}
              required
            />
            <Input
              labelText="Full name"
              name="name"
              value={name}
              onChange={onChange}
              icon={<FaIdBadge />}
              required
            />
            <Input
              labelText="specialty"
              name="specialty"
              value={specialty}
              onChange={onChange}
              icon={<FaBriefcase />}
              required
            />
            <Input
              labelText="salary"
              name="salary"
              value={salary}
              onChange={onChange}
              icon={<FaInfoCircle />}
              required
            />

            <Input
              labelText="Date of Birth"
              name="birth_date"
              value={birth_date}
              onChange={onChange}
              icon={<FaBirthdayCake />}
              type="date"
              required
            />
            <Input
              labelText="Phone Number"
              name="phone"
              value={phone}
              onChange={onChange}
              icon={<FaPhone />}
              type="tel"
              required
            />
            <Input
              labelText="Work Phone Number"
              name="work_phone"
              value={work_phone}
              onChange={onChange}
              icon={<FaPhone />}
              type="tel"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              labelText="ssn"
              name="ssn"
              value={ssn}
              onChange={onChange}
              icon={<FaBriefcase />}
              type="number"
              required
            />
            <Input
              labelText="Job ID"
              name="job_id"
              value={job_id}
              onChange={onChange}
              icon={<FaBriefcase />}
              type="number"
              required
            />
            <Input
              labelText="abstract"
              name="abstract"
              value={abstract}
              onChange={onChange}
              icon={<FaBriefcase />}
              required
            />
            <Input
              labelText="password"
              name="password"
              value={password}
              onChange={onChange}
              icon={<FaBriefcase />}
              type="password"
              minLength={8}
            />
            <SelectInput
              labelText="Nationality"
              options={countries}
              name="nationality"
              value={nationality}
              onChange={(selectedOption) =>
                setFormFields({ ...formFields, nationality: selectedOption })
              }
              placeholder="Select nationality"
            />
            <SelectInput
              labelText="Gender"
              options={genderOptions}
              name="gender"
              value={gender}
              onChange={(selectedOption) =>
                setFormFields({ ...formFields, gender: selectedOption })
              }
              placeholder="Select gender"
              required
            />
            <Input
              labelText="Years of Experience"
              name="experience_years"
              value={experience_years}
              onChange={onChange}
              icon={<FaUserTie />}
              type="number"
              required
            />
            <Input
              labelText="Email"
              name="email"
              value={email}
              onChange={onChange}
              icon={<FaEnvelope />}
              type="email"
              required
            />
            <Input
              labelText="Work Email"
              name="work_email"
              value={work_email}
              onChange={onChange}
              icon={<FaEnvelope />}
              type="email"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Input
            labelText="Address"
            name="address"
            value={address}
            onChange={onChange}
            icon={<FaHome />}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <Input
            labelText="full brief"
            name="full_brief"
            type="textarea"
            value={full_brief}
            onChange={onChange}
            icon={<FaInfoCircle />}
            required
          />
          <Input
            labelText="job description"
            name="job_description"
            value={job_description}
            onChange={onChange}
            icon={<FaUserTie />}
            type="textarea"
            required
          />
        </div>
        <div className="flex items-center justify-center gap-5 my-5">
          <Button content="Add Doctor" type="submit" filled />
          <Button content="Cancel" type="button" onClick={cancelFormSubmit} />
        </div>
      </form>
    </section>
  );
};

export default RegisterDoctorPage;
