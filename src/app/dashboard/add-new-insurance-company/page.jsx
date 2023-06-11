"use client";
import Button from "@/components/Button.tsx";
import Header from "@/components/Header";
import Input from "@/components/Input.tsx";
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

const InsruanceCompany = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
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
    description
  } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
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
          Authorization: `Bearer ${token}`,
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
      <div className="px-10 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className={`${isValid}`} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px]">
            <div className="flex flex-col gap-[23px] flex-1">
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
            </div>
            <div className="flex flex-col gap-[23px] mb-5 flex-1">
              <Input
                labelText="Official Email"
                placeHolder="Official Email for the company"
                name="officialEmail"
                value={officialEmail}
                onChange={onChange}
                icon={<FaEnvelope />}
                required
              />
              <Input
                labelText="Country"
                name="country"
                value={country}
                onChange={onChange}
                required
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
          </div>
          <div className="flex gap-7 flex-col mb-7">
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
          <Input
            labelText="Description"
            name="description"
            value={description}
            onChange={onChange}type="textarea"
            required
          />
          <div className="flex justify-between flex-wrap gap-3 !my-11">
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

export default InsruanceCompany;
