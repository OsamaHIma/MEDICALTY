"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input, SelectInput } from "@/components/Input";
import { useEffect, useState } from "react";
import {
  FaIdBadge,
  FaBriefcase,
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaRegBuilding,
  FaBuilding,
  FaFill,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useCountries } from "@/context/CountriesContext";
const AddClient = () => {
  const { countries, isCountriesLoading } = useCountries();

  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const defaultProps = {
    company_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    email_description: "",
    phone_description: "",
    address: "",
    address2: "",
    country: "",
    province: "",
    city: "",
    zip_code: "",
    web_site: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const {
    company_name,
    first_name,
    last_name,
    email,
    phone,
    email_description,
    phone_description,
    address,
    address2,
    country,
    province,
    city,
    zip_code,
    web_site,
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
      const response = await fetch("/api/center/client/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
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
      <Header headerText="Add New client" />
      <form className={`${isValid}`} onSubmit={handleSubmit} noValidate>
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <Input
            labelText="company name"
            name="company_name"
            value={company_name}
            onChange={onChange}
            icon={<FaBuilding />}
          />
          <Input
            labelText="first name"
            name="first_name"
            value={first_name}
            onChange={onChange}
            icon={<FaIdBadge />}
          />
          <Input
            labelText="last_ name"
            name="last_name"
            value={last_name}
            onChange={onChange}
            icon={<FaIdBadge />}
          />
          <Input
            labelText="Zip code"
            name="zip_code"
            value={zip_code}
            onChange={onChange}
            icon={<FaBriefcase />}
            type="number"
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
            labelText="email description"
            placeHolder="email description, work or home"
            name="email_description"
            value={email_description}
            onChange={onChange}
            icon={<FaFill />}
          />
          <Input
            labelText="phone description"
            name="phone_description"
            placeHolder="phone description, work or home"
            value={phone_description}
            onChange={onChange}
            icon={<FaFill />}
          />
          <Input
            labelText="province"
            name="province"
            value={province}
            onChange={onChange}
            icon={<FaUserTie />}
          />
          <SelectInput
            labelText="country"
            options={countries}
            name="country"
            value={[
              {
                value: country || "Select your country",
                label: country || "Select your country",
              },
            ]}
            onChange={onSelectInputChange}
            isLoading={isCountriesLoading}
          />
          <Input
            labelText="city"
            name="city"
            value={city}
            onChange={onChange}
            icon={<FaRegBuilding />}
          />
          <Input
            labelText="web_site"
            name="web_site"
            value={web_site}
            onChange={onChange}
            icon={<FaGlobe />}
            type="url"
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
          <Input
            labelText="Address"
            name="address2"
            value={address2}
            onChange={onChange}
            icon={<FaHome />}
          />
        </div>
        <div className="my-5 flex items-center justify-center gap-5">
          <Button content="Cancel" type="button" onClick={cancelFormSubmit} />
          <Button content="Add Client" type="submit" filled />
        </div>
      </form>
    </section>
  );
};

export default AddClient;
