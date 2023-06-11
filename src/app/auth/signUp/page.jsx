"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdVisibilityOff, MdWavingHand, MdVisibility } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
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
  const [InputValues, setInputValues] = useState({
    country: {},
    subscriptionType: {},
    subscriptionDuration: {},
  });

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

  const handleSelectChange = (selectedOption, { name }) => {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: selectedOption,
    }));
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value,
    }));
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
    <section className="px-4 flex flex-col mt-20 gap-8 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-500 text-transparent bg-clip-text">
          Welcome to Medicality!
          <MdWavingHand className="text-yellow-500 mx-2 text-3xl" />
        </h1>
        <h3 className="text-gray-500 text-sm mt-4 dark:text-gray-300">
          Start managing your hospital better.
        </h3>
      </motion.div>
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          viewport={{ once: true }}
          className="text-3xl font-bold  mb-4"
        >
          Sign up
        </motion.h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <motion.label
                htmlFor="name"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Name
              </motion.label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <motion.label
                htmlFor="centerName"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Center Name
              </motion.label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                type="text"
                name="centerName"
                id="centerName"
                value={formData.centerName}
                onChange={handleInputChange}
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <motion.label
                htmlFor="email"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Email
              </motion.label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col relative">
              <motion.label
                htmlFor="password"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Password
              </motion.label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
                type={passwordIcon ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
                type="button"
                className="absolute cursor-pointer top-[50%] translate-y-[-50%] right-2"
                onClick={togglePasswordIcon}
              >
                {passwordIcon ? (
                  <MdVisibility size={20} className="text-gray-600" />
                ) : (
                  <MdVisibilityOff size={20} className="text-gray-600" />
                )}
              </motion.button>
            </div>

            <div className="flex flex-col">
              <motion.label
                htmlFor="password_confirmation"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Confirm Password
              </motion.label>
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                viewport={{ once: true }}
                type={passwordIcon ? "text" : "password"}
                name="password_confirmation"
                id="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <motion.label
                htmlFor="country"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Country
              </motion.label>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Select
                  options={countries}
                  value={InputValues.country}
                  name="country"
                  onChange={handleSelectChange}
                  placeholder="Select country"
                  className="mt-1 dark:text-slate-800"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "0.5rem",
                      borderColor: error?.country
                        ? "red"
                        : provided.borderColor,
                    }),
                  }}
                />
                {error?.country && (
                  <p className="text-red-500 mt-1">{error.country}</p>
                )}
              </motion.div>
            </div>

            <div className="flex flex-col">
              <motion.label
                htmlFor="subscriptionType"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Subscription Type
              </motion.label>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Select
                  options={subscriptionTypeOptions}
                  value={InputValues?.subscriptionType}
                  name="subscriptionType"
                  onChange={handleSelectChange}
                  placeholder="Select subscription type"
                  className="mt-1 dark:text-slate-800"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "0.5rem",
                      borderColor: error?.subscriptionType
                        ? "red"
                        : provided.borderColor,
                    }),
                  }}
                />
                {error?.subscriptionType && (
                  <p className="text-red-500 mt-1">{error.subscriptionType}</p>
                )}
              </motion.div>
            </div>

            <div className="flex flex-col">
              <motion.label
                htmlFor="subscriptionDuration"
                className=" font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                viewport={{ once: true }}
              >
                Subscription Duration
              </motion.label>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Select
                  options={subscriptionDurationOptions}
                  value={InputValues?.subscriptionDuration}
                  name="subscriptionDuration"
                  onChange={handleSelectChange}
                  placeholder="Select subscription duration"
                  className="mt-1 dark:text-slate-800"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "0.5rem",
                      borderColor: error?.subscriptionDuration
                        ? "red"
                        : provided.borderColor,
                    }),
                  }}
                />
              </motion.div>
            </div>
            {error && (
              <div className="text-xs  flex flex-col text-red-500 mx-4">
                {error.map((err, key) => {
                  return <p key={key}>*{err}</p>;
                })}
              </div>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                content={
                  loading ? (
                    <LoadingComponent />
                  ) : (
                    <div className="flex items-center">
                      <FaUserPlus size={20} className="mr-2" />
                      Sign up
                    </div>
                  )
                }
              />
            </div>

            <div className="text-center my-4">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-500 hover:underline underline-offset-4"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
