"use client";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Button from "@/components/Button";

import Header from "@/components/Header";
import {Input} from "@/components/Input";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Customer = () => {

  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const [isValid, setIsValid] = useState("");
  const defaultProps = {
    customer_number: "",
    customer_title: "",
    first_name: "",
    last_name: "",
    company_name: "",
    phone_number: "",
    phone_number_type: "",
    email: "",
    email_type: "",
    website: "",
    location_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const {
    customer_number,
    customer_title,
    first_name,
    last_name,
    company_name,
    phone_number,
    phone_number_type,
    email,
    email_type,
    website,
    location_name,
    address_line_1,
    address_line_2,
    city,
    state,
    postal_code,
    country,
  } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      console.log(token);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
        setIsValid("");
      } else {
        toast.error("Failed to send data");
        setIsValid("");
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };

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
      <Header headerText="Add New Customer" />

      <form
        className={`${isValid} px-10`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-20">
          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              labelText="Customer Number"
              name="customer_number"
              value={customer_number}
              onChange={onChange}
              type="tel"
            />
            <div className="grid grid-cols-1 gap-[52px] md:grid-cols-2 md:gap-3">
              <Input
                labelText="Customer Title"
                name="customer_title"
                value={customer_title}
                onChange={onChange}
              />
              <Input
                labelText="First Name"
                name="first_name"
                value={first_name}
                onChange={onChange}
                icon={<FaUser />}
              />
            </div>
            <Input
              labelText="Last Name"
              name="last_name"
              value={last_name}
              onChange={onChange}
              icon={<FaUser />}
            />
            <Input
              labelText="Company Name"
              name="company_name"
              value={company_name}
              onChange={onChange}
              icon={<FaBuilding />}
            />
            <Input
              labelText="Phone Number"
              name="phone_number"
              value={phone_number}
              onChange={onChange}
              type="tel"
              icon={<FaPhone />}
            />
            <Input
              labelText="Phone Number Type"
              name="phone_number_type"
              value={phone_number_type}
              onChange={onChange}
            />
            <Input
              labelText="Email"
              name="email"
              value={email}
              onChange={onChange}
              type="email"
              icon={<FaEnvelope />}
            />
            <Input
              labelText="Email Type"
              name="email_type"
              value={email_type}
              onChange={onChange}
            />
          </div>

          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              labelText="Website"
              name="website"
              value={website}
              type="ulr"
              onChange={onChange}
              icon={<FaGlobe />}
            />
            <Input
              labelText="Location Name"
              name="location_name"
              value={location_name}
              onChange={onChange}
              icon={<FaMapMarkerAlt />}
            />
            <Input
              labelText="Address Line 1"
              name="address_line_1"
              value={address_line_1}
              onChange={onChange}
            />
            <Input
              labelText="Address Line 2"
              name="address_line_2"
              value={address_line_2}
              onChange={onChange}
            />
            <Input
              labelText="City"
              name="city"
              value={city}
              onChange={onChange}
            />
            <Input
              labelText="State"
              name="state"
              value={state}
              onChange={onChange}
            />
            <Input
              labelText="Postal Code"
              name="postal_code"
              value={postal_code}
              onChange={onChange}
              type="number"
            />
            <Input
              labelText="Country"
              name="country"
              value={country}
              onChange={onChange}
            />
          </div>
        </div>

        <Button content="Add Customer" />
      </form>
    </section>
  );
};
export default Customer;
