"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input, SelectInput } from "@/components/Input";
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

const AddNewCenter = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const { uploadedPhoto } = usePhoto();
  const defaultProps = {
    name: "",
    username: "",
    phone: "",
    formal_phone: "",
    website: "",
    subscription_type: "",
    subscription_period: "",
    email: "",
    formal_email: "",
    country: "",
    address1: "",
    address2: "",
    province: "",
    state: "",
    zip_code: "",
    facebook: "",
    twitter: "",
    youtube: "",
    instagram: "",
    snapchat: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);

  const {
    name,
    username,
    phone,
    formal_phone,
    website,
    subscription_type,
    subscription_period,
    email,
    formal_email,
    state,
    country,
    province,
    address1,
    address2,
    zip_code,
    facebook,
    instagram,
    snapchat,
    youtube,
    password,
    twitter,
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
    console.log(formFields);
    try {
      const response = await fetch("/api/center/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formFields),
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        toast.success("Data sent successfully");
        // resetFormFields();
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
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setIsValid("not-validated");
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };
  return (
    <section>
      <Header headerText="Add New Center" imageUploader />
      <div className="flex flex-col gap-6 px-10">
        <form onSubmit={handleSubmit} className={`${isValid}`} noValidate>
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <Input
              labelText="Center Name"
              icon={<FaBuilding />}
              name="name"
              value={name}
              onChange={onChange}
              required
            />
            <Input
              labelText="user Name"
              icon={<FaUserAlt />}
              name="username"
              value={username}
              onChange={onChange}
              required
            />
            <Input
              labelText="Phone number"
              icon={<FaPhone />}
              name="phone"
              value={phone}
              onChange={onChange}
              required
              type="tel"
            />
            <Input
              labelText="Phone number 2"
              icon={<FaPhone />}
              name="formal_phone"
              value={formal_phone}
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
              labelText="password"
              name="password"
              value={password}
              onChange={onChange}
              type="password"
              required
            />
            <SelectInput
              labelText="subscription type"
              options={[{ value: "Basic", label: "Basic" }]}
              name="subscription_type"
              value={[
                {
                  value: subscription_type || "Select subscription type",
                  label: subscription_type,
                },
              ]}
              onChange={onSelectInputChange}
              placeholder="Select subscription type"
              required
            />

            <Input
              labelText="Formal Email"
              placeHolder="Formal Email for the center"
              name="formal_email"
              value={formal_email}
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
              name="state"
              value={state}
              onChange={onChange}
              required
            />
            <Input
              labelText="province"
              name="province"
              value={province}
              onChange={onChange}
              required
            />
            <Input
              labelText="Zip code"
              name="zip_code"
              value={zip_code}
              onChange={onChange}
              type="number"
              required
            />
            <SelectInput
              labelText="subscription period "
              options={[
                { value: "Free_trail", label: "Free trail" },
                { value: "Month", label: "Month" },
                { value: "Year", label: "Year" },
              ]}
              name="subscription_period"
              value={[
                {
                  value: subscription_period,

                  label: subscription_period,
                },
              ]}
              onChange={onSelectInputChange}
              required
            />
          </div>

          <div className="flex flex-col gap-7">
            <Input
              name="twitter"
              value={twitter}
              onChange={onChange}
              labelText="Twitter Link"
              placeHolder="customer twitter link"
              icon={<FaTwitter />}
              type="url"
            />
            <Input
              name="snapchat"
              value={snapchat}
              onChange={onChange}
              labelText="snapchat Link"
              placeHolder="snapchat link to client"
              icon={<FaSnapchat />}
              type="url"
            />
            <Input
              name="facebook"
              value={facebook}
              onChange={onChange}
              labelText="Facebook Link"
              placeHolder="Facebook link"
              icon={<FaFacebook />}
              type="url"
            />
            <Input
              name="youtube"
              value={youtube}
              onChange={onChange}
              labelText="Youtube Link"
              placeHolder="Youtube link"
              icon={<FaYoutube />}
              type="url"
            />
            <Input
              name="instagram"
              value={instagram}
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
              onClick={resetFormFields}
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

export default AddNewCenter;
