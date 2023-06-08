"use client";
import { useState } from "react";
import { MdVisibilityOff, MdWavingHand, MdVisibility } from "react-icons/md";
import Link from "next/link";
import { toast } from "react-toastify";
import { signUpSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import Select from "react-select";
import Button from "@/components/Button";
import LoadingComponent from "@/components/Loading";

export default function Page() {
  const subscriptionDurationOptions = [
    { value: "free_trial", label: "Free Trial" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const subscriptionTypeOptions = [
    { value: "medical_center", label: "Medical Center" },
    { value: "doctor", label: "Doctor" },
    { value: "nurse", label: "Nurse" },
    { value: "physical_therapy", label: "Physical Therapy" },
  ];

  const countryOptions = [
    { value: "egypt", label: "Egypt" },
    { value: "jordan", label: "Jordan" },
    { value: "saudi", label: "Saudi" },
  ];
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    centerName: "",
    email: "",
    password: "",
    password_confirmation: "",
    country: "",
    subscriptionType: "",
    subscriptionDuration: "",
  });
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [country, setCountry] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [subscriptionDuration, setSubscriptionDuration] = useState("");

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
    const { name, value } = event.target;
    setCountry(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubscriptionTypeChange = (event) => {
    const { name, value } = event.target;
    setSubscriptionType(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubscriptionDurationChange = (event) => {
    const { name, value } = event.target;
    setSubscriptionDuration(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
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
          centerName: formData.centerName,
          password: formData.password,
          password: formData.password_confirmation,
          country: formData.country,
          subscriptionType: formData.subscriptionType,
          subscriptionDuration: formData.subscriptionDuration,
        },
        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    try {
      setLoading(true);
      console.log(formData);
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
    <div className="px-4 flex flex-col mt-24 gap-8 relative">
      <div className="gradient absolute w-96 h-96 bg-gradient-to-r from-green-300/25 to-blue-600/25 blur-[100px] left-[100px] -z-[1]" />

      <div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-300 to-green-500 text-transparent bg-clip-text">
          Welcome to Medicality!
          <MdWavingHand className="text-yellow-500 mx-2 text-3xl" />
        </h1>
        <h3 className="text-gray-500 text-sm mt-4 dark:text-gray-300">
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
          <label htmlFor="centerName" className="mb-4 text-md font-bold">
            Center Name
          </label>
          <input
            type="text"
            placeholder="Enter Your center name"
            id="centerName"
            name="centerName"
            value={formData.centerName}
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
          <label
            htmlFor="password_confirmation"
            className="mb-4 text-md font-bold"
          >
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
        <label htmlFor="countryOptions">Select Country</label>

        <Select
          options={countryOptions}
          id="country"
          name="country"
          value={country}
          isClearable
          isSearchable
          defaultValue={countryOptions[0]}
          // onChange={handleCountryChange}
        />
        <label htmlFor="subscriptionTypeOptions">Subscription Type</label>

        <Select
          options={subscriptionTypeOptions}
          id="subscriptionType"
          name="subscriptionType"
          value={subscriptionType}
          isClearable
          isSearchable
          defaultValue={subscriptionTypeOptions[0]}

          // onChange={handleSubscriptionTypeChange}
        />
        <label htmlFor="subscriptionDuration">Subscription Duration</label>
        <Select
          options={subscriptionDurationOptions}
          id="subscriptionDuration"
          name="subscriptionDuration"
          value={subscriptionDuration}
          isClearable={true}
          isSearchable={true}
          defaultValue={subscriptionDurationOptions[0]}

          // onChange={handleSubscriptionDurationChange}
        />
        {error && (
          <div className="text-xs  flex flex-col text-red-500 mx-4">
            {error.map((err, key) => {
              return <p key={key}>*{err}</p>;
            })}
          </div>
        )}
        <Button
          type="submit"
          content={loading ? <LoadingComponent /> : "Register"}
          className="bg-gradient-to-r from-green-300 to-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-md font-bold"
        />

        <div className="text-center">
          <span className="text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-500">
              Log in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
