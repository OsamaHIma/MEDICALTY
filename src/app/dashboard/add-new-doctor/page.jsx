"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
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

const RegisterDoctorPage = () => {
  const [countries, setCountries] = useState([]);

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
  const [formFields, setFormFields] = useState({
    doctorImage: "",
    username: "",
    fullName: "",
    nationalId: "",
    jobTitle: "",
    shortBio: "",
    longBio: "",
    jobNumber: "",
    dateOfBirth: "",
    yearsOfExperience: "",
    expertise: {
      experienceNumber: "",
      experienceName: "",
      experienceWorkplace: "",
      experienceWorkplaceCountry: "",
      experienceStartDate: "",
      experienceEndDate: "",
      experienceCurrent: false,
    },
    phoneNumber: "",
    workPhoneNumber: "",
    email: "",
    workEmail: "",
    address: "",
    gender: "",
    nationality: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onExpertiseChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      expertise: { ...formFields.expertise, [name]: value },
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
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
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
              labelText="Username"
              name="username"
              value={formFields.username}
              onChange={onChange}
              icon={<FaUser />}
              required
            />
            <Input
              labelText="Full Name"
              name="fullName"
              value={formFields.fullName}
              onChange={onChange}
              icon={<FaUser />}
              required
            />
            <Input
              labelText="National ID"
              name="nationalId"
              value={formFields.nationalId}
              onChange={onChange}
              icon={<FaIdBadge />}
              required
            />
            <Input
              labelText="Job Title"
              name="jobTitle"
              value={formFields.jobTitle}
              onChange={onChange}
              icon={<FaBriefcase />}
              required
            />
            <Input
              labelText="Short Bio"
              name="shortBio"
              value={formFields.shortBio}
              onChange={onChange}
              icon={<FaInfoCircle />}
              required
            />
            <Input
              labelText="Long Bio"
              name="longBio"
              type="textarea"
              value={formFields.longBio}
              onChange={onChange}
              icon={<FaInfoCircle />}
              required
            />
            <Input
              labelText="Job Number"
              name="jobNumber"
              value={formFields.jobNumber}
              onChange={onChange}
              icon={<FaBriefcase />}
              type="number"
              required
            />
            <Input
              labelText="Date of Birth"
              name="dateOfBirth"
              value={formFields.dateOfBirth}
              onChange={onChange}
              icon={<FaBirthdayCake />}
              type="date"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              labelText="Nationality"
              options={countries}
              type="select"
              name="nationality"
              value={formFields.nationality}
              onChange={(selectedOption) =>
                setFormFields({ ...formFields, nationality: selectedOption })
              }
              placeholder="Select nationality"
            />
            <Input
              labelText="Gender"
              options={genderOptions}
              type="select"
              name="gender"
              value={formFields.gender}
              onChange={(selectedOption) =>
                setFormFields({ ...formFields, gender: selectedOption })
              }
              placeholder="Select gender"
              required
            />
            <Input
              labelText="Years of Experience"
              name="yearsOfExperience"
              value={formFields.yearsOfExperience}
              onChange={onChange}
              icon={<FaUserTie />}
              type="number"
              required
            />
            <div className="flex flex-col gap-4">
              <label className="text-lg font-medium text-gray-500">
                Expertise
              </label>
              <div className="flex flex-col gap-4">
                <Input
                  labelText="Number of Years"
                  name="experienceNumber"
                  value={formFields.expertise.experienceNumber}
                  onChange={onExpertiseChange}
                  type="number"
                  required
                />
                <Input
                  labelText="Name of Expertise"
                  name="experienceName"
                  value={formFields.expertise.experienceName}
                  onChange={onExpertiseChange}
                  required
                />
                <Input
                  labelText="Workplace Name"
                  name="experienceWorkplace"
                  value={formFields.expertise.experienceWorkplace}
                  onChange={onExpertiseChange}
                  required
                />
                <Input
                  labelText="Workplace Country"
                  options={countries}
                  type="select"
                  name="experienceWorkplaceCountry"
                  value={formFields.expertise.experienceWorkplaceCountry}
                  onChange={(selectedOption) =>
                    setFormFields({
                      ...formFields,
                      expertise: {
                        ...formFields.expertise,
                        experienceWorkplaceCountry: selectedOption,
                      },
                    })
                  }
                  placeholder="Select country"
                />
                <Input
                  labelText="Start Date"
                  name="experienceStartDate"
                  value={formFields.expertise.experienceStartDate}
                  onChange={onExpertiseChange}
                  type="date"
                  required
                />
                <Input
                  labelText="End Date"
                  name="experienceEndDate"
                  value={formFields.expertise.experienceEndDate}
                  onChange={onExpertiseChange}
                  type="date"
                />
                <div className="flex items-center gap-4">
                  <label className="text-lg font-medium">
                    Are you currently working there?
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="yes flex items-center gap-2">
                      <label htmlFor="yes">Yes</label>
                      <input
                        type="radio"
                        name="currentlyWorking"
                        id="yes"
                        value="yes"
                        checked={formFields.currentlyWorking === "yes"}
                        onChange={onCurrentlyWorkingChange}
                        className="needs-validation h-5 w-5 text-brand-500 transition duration-150 ease-in-out"
                        required
                      />
                    </div>
                    <div className="no flex items-center gap-2">
                      <label htmlFor="no">No</label>
                      <input
                        type="radio"
                        name="currentlyWorking"
                        id="no"
                        value="no"
                        checked={formFields.currentlyWorking === "no"}
                        onChange={onCurrentlyWorkingChange}
                        className="needs-validation h-5 w-5 text-brand-500 transition duration-150 ease-in-out"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Input
            labelText="Phone Number"
            name="phoneNumber"
            value={formFields.phoneNumber}
            onChange={onChange}
            icon={<FaPhone />}
            type="tel"
            required
          />
          <Input
            labelText="Work Phone Number"
            name="workPhoneNumber"
            value={formFields.workPhoneNumber}
            onChange={onChange}
            icon={<FaPhone />}
            type="tel"
            required
          />
          <Input
            labelText="Email"
            name="email"
            value={formFields.email}
            onChange={onChange}
            icon={<FaEnvelope />}
            type="email"
            required
          />
          <Input
            labelText="Work Email"
            name="workEmail"
            value={formFields.workEmail}
            onChange={onChange}
            icon={<FaEnvelope />}
            type="email"
            required
          />
          <Input
            labelText="Address"
            name="address"
            value={formFields.address}
            onChange={onChange}
            icon={<FaHome />}
            required
          />
        </div>
        <div className="flex items-center justify-center my-5">
          <Button content="Add Doctor" type="submit" filled />
          <Button content="Cancel" type="button" onClick={cancelFormSubmit} />
        </div>
      </form>
    </section>
  );
};

export default RegisterDoctorPage;
