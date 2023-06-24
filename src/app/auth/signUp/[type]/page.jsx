"use client";
import { useEffect, useState } from "react";
import { MdVisibilityOff, MdWavingHand, MdVisibility } from "react-icons/md";
import { FaFacebook, FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { signUpSchema } from "@/schema/userSchema";
import LoadingComponent from "@/components/Loading";
import SelectInputNoLabel from "@/components/SelectInputNoLabel";
import { signIn, useSession } from "next-auth/react";
import Translate from "@/components/Translate";
import { FcGoogle } from "react-icons/fc";
import { useLanguage } from "@/context/LanguageContext";
import { useCountries } from "@/context/CountriesContext";
// Define the SignUpPage component
const SignUpPage = ({ params }) => {
  // Extract the type parameter from the props
  const { type } = params;
  // Define functions for handling Google and Facebook sign-in
  const handleGoogleSignIn = () => {
    signIn("google");
  };
  const handleFacebookSignIn = () => {
    signIn("facebook");
  };
  // Set up state variables
  const { selectedLanguage } = useLanguage();
  const { countries, isCountriesLoading } = useCountries();
  const [token, setToken] = useState("");
  const { data: session } = useSession();
  const [password_confirmation, setPassword_confirmation] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const defaultProps = {
    full_name: "",
    email: "",
    password: "",
    country: "",
    subscription_type: "",
    subscription_period: "",
  };
  const [formData, setFormData] = useState(defaultProps);
  const [passwordIcon, setPasswordIcon] = useState(false);
  // Define functions for handling changes to the form data
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value,
    }));
  };
  // Define function for handling form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if passwords match
    if (formData.password !== password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setError(null);
    try {
      // Validate the form data
      signUpSchema.validateSync(
        {
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          subscription_type: formData.subscription_type,
          subscription_period: formData.subscription_period,
        },
        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    try {
      setLoading(true);
      // Send a request to the server to register the user
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
          type === "admin" ? "center/admin" : type
        }/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error registering user.");
      }
      setLoading(false);
      toast.success("Registered successfully.");
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  };
  // Set the token when the session changes
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  // Render the component

  return (
    <section className="relative mt-20 flex flex-col gap-8 px-4">
      <div>
        <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-3xl font-bold text-transparent">
          <Translate>Welcome to</Translate> Medicality!
          <MdWavingHand className="mx-2 text-3xl text-yellow-500" />
        </h1>
        <h3 className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          <Translate> Start managing your hospital better.</Translate>
        </h3>
        <h1 className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          <Translate>You are signing up as a</Translate>{" "}
          <span className="text-xl font-semibold capitalize text-green-500">
            <Translate>{type}</Translate>
          </span>
          .
        </h1>
      </div>
      <div>
        <h1 className="mb-4 text-3xl  font-bold">
          <Translate>Sign up now!</Translate>
        </h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="full_name" className="text-md mb-4 font-bold">
                <Translate>Full Name</Translate>
              </label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full rounded-md px-4 py-2 focus:outline-gray-200 dark:bg-[#284062] dark:placeholder:text-slate-200"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-md mb-4 font-bold">
                <Translate>Email</Translate>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-md px-4 py-2 focus:outline-gray-200 dark:bg-slate-600 dark:placeholder:text-slate-200 ${
                  error && "border-red-500"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-md mb-4 font-bold">
                <Translate>Password</Translate>
              </label>
              <div className="relative w-full">
                <input
                  onChange={handleInputChange}
                  type={passwordIcon ? "text" : "password"}
                  value={formData.password}
                  placeholder="Enter Your Password"
                  name="password"
                  autoComplete="current-password"
                  className={`w-full rounded-md px-4 py-2 focus:outline-gray-200 dark:bg-[#284062] dark:placeholder:text-slate-200 ${
                    error && "border-red-500"
                  }`}
                />
                <button
                  type="button"
                  className={`absolute ${
                    selectedLanguage === "ar" ? "left-2" : "right-2"
                  } top-[50%] translate-y-[-50%] cursor-pointer`}
                  onClick={togglePasswordIcon}
                >
                  {passwordIcon ? (
                    <MdVisibility size={20} className="text-gray-500" />
                  ) : (
                    <MdVisibilityOff size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password_confirmation"
                className="text-md mb-4 font-bold"
              >
                <Translate>Confirm Password</Translate>
              </label>
              <input
                type={passwordIcon ? "text" : "password"}
                name="password_confirmation"
                id="password_confirmation"
                placeholder="confirm your password"
                value={password_confirmation}
                autoComplete="current-password"
                onChange={(event) =>
                  setPassword_confirmation(event.target.value)
                }
                required
                className={`w-full rounded-md px-4 py-2 focus:outline-gray-200 dark:bg-[#284062] dark:placeholder:text-slate-200 ${
                  error && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="country" className="text-md mb-4 font-bold">
                <Translate>Select Your Country</Translate>
              </label>
              <div>
                <SelectInputNoLabel
                  options={countries}
                  value={[
                    {
                      value: formData.country || "Select your country",
                      label: formData.country || "Select your country",
                    },
                  ]}
                  name="country"
                  onChange={handleSelectChange}
                  placeholder="Select country"
                  isLoading={isCountriesLoading}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="subscription_type"
                className="text-md mb-4 font-bold"
              >
                <Translate>Subscription Type</Translate>
              </label>
              <div>
                <SelectInputNoLabel
                  options={[{ value: "Basic", label: "Basic" }]}
                  name="subscription_type"
                  value={[
                    {
                      value:
                        formData.subscription_type ||
                        "Select subscription type",
                      label:
                        formData.subscription_type ||
                        "Select subscription type",
                    },
                  ]}
                  onChange={handleSelectChange}
                  placeholder="Select subscription type"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="subscription_period"
                className="text-md mb-4 font-bold"
              >
                <Translate>Subscription Duration</Translate>
              </label>
              <div>
                <SelectInputNoLabel
                  options={[
                    { value: "Free_trial", label: "Free trial" },
                    { value: "Month", label: "Month" },
                    { value: "Year", label: "Year" },
                  ]}
                  name="subscription_period"
                  value={[
                    {
                      value:
                        formData.subscription_period ||
                        "Select subscription period",
                      label:
                        formData.subscription_period.replace(/_/g, " ") ||
                        "Select subscription period",
                    },
                  ]}
                  onChange={handleSelectChange}
                  placeholder="Select subscription period"
                />
              </div>
            </div>
            {error && (
              <div className="mx-4 flex max-w-xs flex-col text-xs text-red-500">
                {error.map((err, key) => {
                  return (
                    <p key={key}>
                      *
                      <Translate>
                        {err === "[object Object]"
                          ? "Error while signing in please try again."
                          : err}
                      </Translate>
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-3 text-center">
            <Button
              type="submit"
              disabled={loading}
              icon={
                loading ? (
                  <LoadingComponent />
                ) : (
                  <FaUserPlus size={20} className="mr-2" />
                )
              }
              content="Sign Up"
            />
            <p className="text-xl">OR</p>
            <Button
              onClick={handleGoogleSignIn}
              content={"Sign Up with Google"}
              type="button"
              filled
              icon={<FcGoogle size={27} />}
              disabled={loading}
            />
            <Button
              onClick={handleFacebookSignIn}
              content={"Sign Up with Facebook"}
              type="button"
              disabled={loading}
              filled
              icon={<FaFacebook size={27} />}
            />
          </div>
        </form>
        <div className="my-4 text-center">
          <Translate>Already have an account?</Translate>{" "}
          <Link
            href="/auth/login"
            className="text-blue-500 underline-offset-4 hover:underline"
          >
            <Translate>Log in</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default SignUpPage;
