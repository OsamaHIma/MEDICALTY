"use client";
import Button from "@/components/Button";

import Header from "@/components/Header";
import { Input, SelectInput } from "@/components/Input";
import { useCountries } from "@/context/CountriesContext";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FaBuilding,
  FaGlobe,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapPin,
  FaPhone,
  FaSnapchat,
  FaTwitter,
  FaUserAlt,
  FaYoutube,
} from "react-icons/fa";
import { toast } from "react-toastify";

const InsuranceCompany = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const { countries, isCountriesLoading } = useCountries();
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const { uploadedPhoto } = usePhoto();
  const defaultProps = {
    companyName: "",
    company_id: "",
    phoneNumber: "",
    phoneNumber2: "",
    website: "",
    email: "",
    officialEmail: "",
    country: "",
    address1: "",
    address2: "",
    county: "",
    stateName: "",
    zipCode: "",
    facebook_link: "",
    twitter_link: "",
    youtube_link: "",
    instagram_link: "",
    snapChat_link: "",
    description: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);

  const {
    companyName,
    company_id,
    phoneNumber,
    phoneNumber2,
    website,
    email,
    officialEmail,
    stateName,
    country,
    county,
    address1,
    address2,
    zipCode,
    facebook_link,
    instagram_link,
    snapChat_link,
    youtube_link,
    twitter_link,
    description,
  } = formFields;
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const onSelectInputChange = ({ value }, { name }) => {
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ ...formFields, image: uploadedPhoto }),
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        toast.success("Data sent successfully");
        console.log({ ...formFields, image: uploadedPhoto });
        resetFormFields();
      } else {
        toast.error(`Failed to send the data: ${data.message}`);
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
    if (!event.target.checkValidity() || !uploadedPhoto) {
      event.stopPropagation();
      setIsValid("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };
  return (
    <section>
      <Header
        headerText="Add New Insurance company"
        // chooseInput
        // chooseInputText="Choose Employee"
        imageUploader
      />
      <div className="flex flex-col gap-6 px-10">
        <form onSubmit={handleSubmit} className={`${isValid}`} noValidate>
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <Input
              labelText="Company Name"
              icon={<FaBuilding />}
              name="companyName"
              value={companyName}
              onChange={onChange}
              required
            />
            <Input
              labelText="Company ID"
              icon={<FaUserAlt />}
              name="company_id"
              value={company_id}
              onChange={onChange}
              type="number"
              required
            />
            <Input
              labelText="Phone number"
              icon={<FaPhone />}
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              required
              type="tel"
            />
            <Input
              labelText="Phone number 2"
              icon={<FaPhone />}
              name="phoneNumber2"
              value={phoneNumber2}
              onChange={onChange}
              type="tel"
            />
            <Input
              labelText="Website"
              icon={<FaGlobe />}
              name="website"
              value={website}
              onChange={onChange}
              type="url"
            />
            <Input
              labelText="Email"
              icon={<FaEnvelope />}
              name="email"
              value={email}
              onChange={onChange}
              type="email"
            />

            <Input
              labelText="Official Email"
              placeHolder="Official Email for the company"
              name="officialEmail"
              value={officialEmail}
              onChange={onChange}
              icon={<FaEnvelope />}
              required
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
              placeholder="Select country"
              isLoading={isCountriesLoading}
            />
            <Input
              labelText="Address 1"
              name="address1"
              value={address1}
              icon={<FaMapPin />}
              onChange={onChange}
              required
            />
            <Input
              labelText="Address 2"
              name="address2"
              icon={<FaMapPin />}
              value={address2}
              onChange={onChange}
              required
            />
            <Input
              labelText="State Name"
              name="stateName"
              value={stateName}
              onChange={onChange}
              required
            />
            <Input
              labelText="County"
              name="county"
              value={county}
              onChange={onChange}
              required
            />
            <Input
              labelText="Zip code"
              name="zipCode"
              value={zipCode}
              onChange={onChange}
              type="number"
              required
            />
          </div>
          <Input
            labelText="Description"
            name="description"
            value={description}
            onChange={onChange}
            type="textarea"
            required
          />
          <div className="mb-7 flex flex-col gap-7 mt-6">
            <Input
              name="twitter_link"
              value={twitter_link}
              onChange={onChange}
              labelText="Twitter Link"
              placeHolder="company twitter link"
              icon={<FaTwitter />}
              type="url"
            />
            <Input
              name="snapChat_link"
              value={snapChat_link}
              onChange={onChange}
              labelText="Snapchat Link"
              placeHolder="Snapchat link to client"
              icon={<FaSnapchat />}
              type="url"
            />
            <Input
              name="facebook_link"
              value={facebook_link}
              onChange={onChange}
              labelText="Facebook Link"
              placeHolder="Facebook link"
              icon={<FaFacebook />}
              type="url"
            />
            <Input
              name="youtube_link"
              value={youtube_link}
              onChange={onChange}
              labelText="Youtube Link"
              placeHolder="Youtube link"
              icon={<FaYoutube />}
              type="url"
            />
            <Input
              name="instagram_link"
              value={instagram_link}
              onChange={onChange}
              labelText="instagram Link"
              placeHolder="instagram link"
              icon={<FaInstagram />}
              type="url"
            />
          </div>
          <div className="!my-11 flex flex-wrap justify-between gap-3">
            <Button
              content="Cancel"
              additionalClasses="w-full md:w-auto"
              type="button"
            />
            <div className="saveBtns flex flex-wrap gap-2">
              <Button
                content="save an create another one"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
              <Button
                content="save now"
                filled
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InsuranceCompany;
