"use client";
import { useState } from "react";
import { MdVisibilityOff, MdWavingHand, MdVisibility } from "react-icons/md";
import Button from "@/components/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/Loading";
import { signUpSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Company_Name: "",
    password: "",
    password_confirmation: "",
    country: "",
    subscriptionType: "",
  });
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [country, setCountry] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");

  const togglePasswordIcon = () => {
    setPasswordIcon(!passwordIcon);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubscriptionTypeChange = (event) => {
    setSubscriptionType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setError(null);
    try {
      signUpSchema.validateSync(
        {
          name: formData.name,
          email: formData.email,
          Company_Name: formData.Company_Name,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          country: formData.country,
          subscriptionType: formData.subscriptionType,
        },

        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/access-tokens/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error registering user.");
      }
      setLoading(false);
      toast.success("registered successfully.");
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 flex flex-col mt-24 gap-8 reative">
      <div className="gradient absolute w-96 h-96 bg-gradient-to-r from-green-300/25 to-blue-600/25 blur-[100px] left-[100px] -z-[1]" />

      <div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-200 to-blue-500 text-transparent bg-clip-text">
          Welcome to Medicality!
          <MdWavingHand className="text-yellow-500 mx-2 text-3xl" />
        </h1>
        <h3 className="text-gray-500 text-sm mt-4">
          Start managing your hospital better.
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mb-3">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-4 text-md font-bold">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-4 text-md font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-4 text-md font-bold">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Enter Your Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 pr-10"
            />
            {passwordIcon ? (
              <MdVisibility
                onClick={togglePasswordIcon}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <MdVisibilityOff
                onClick={togglePasswordIcon}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password_confirmation" className="mb-4 text-md font-bold">
          Confirm Password

          </label>
          <div className="relative">
            <input
              type={passwordIcon ? "text" : "password"}
              placeholder="Confirm your password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 pr-10"
            />
            {passwordIcon ? (
              <MdVisibility
                onClick={togglePasswordIcon}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <MdVisibilityOff
                onClick={togglePasswordIcon}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="Company_Name" className="mb-4 text-md font-bold">
            Company Name
          </label>
          <input
            type="text"
            placeholder="Enter Your Company Name"
            id="Company_Name"
            name="Company_Name"
            value={formData.Company_Name}
            onChange={handleInputChange}
            className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="mb-4 text-md font-bold">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={handleCountryChange}
            className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
          >
            <option value="" disabled hidden>
              Select your country
            </option>
            <option value="USA">Egypt</option>
            <option value="Jordan">Jordan</option>
            <option value="Saudi">Saudi</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="subscriptionType" className="mb-4 text-md font-bold">
            Subscription Type
          </label>
          <select
            id="subscriptionType"
            name="subscriptionType"
            value={subscriptionType}
            onChange={handleSubscriptionTypeChange}
            className="px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2"
          >
            <option value="" disabled hidden>
              Select your subscription type
            </option>
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="free-trail">Free trail</option>
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>

        <Button
          type="submit"
          content={loading ? <LoadingComponent /> : "Register"}
          className="bg-gradient-to-r from-green-300 to-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-md font-bold"
        />

        <div className="text-center">
          <span className="text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Log in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
