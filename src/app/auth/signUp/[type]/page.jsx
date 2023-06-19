"use client";
import { useEffect, useState } from "react";
import { MdVisibilityOff, MdWavingHand, MdVisibility } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import LoadingComponent from "@/components/Loading";
import SelectInputNoLabel from "@/components/SelectInputNoLabel";
import { useSession } from "next-auth/react";

const defaultProps = {
  name: "",
  centerName: "",
  email: "",
  password: "",
  password_confirmation: "",
  country: "",
  subscriptionType: "",
  subscriptionDuration: "",
};
const doctorProps = {
  center_id: "",
  department_id: "",
  specialty: "",
  username: "",
  name: "",
  ssn: "",
  phone: "",
  work_phone: "",
  email: "",
  work_email: "",
  job_description: "",
  abstract: "",
  full_brief: "",
  job_id: "",
  birth_date: "",
  experience_years: "",
  salary: "",
  gender: "",
  nationality: "",
};
const centerProps = {
  name: "",
  username: "",
  phone: "",
  formal_phone: "",
  website: "",
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
};

const getInitialFormData = (type) => {
  switch (type) {
    case "center":
      return defaultProps;
      break;
    case "doctor":
      return doctorProps;
      break;
    // case "nurse":
    //   return nurseProps || defaultProps;
    //   break;
    // case "patient":
    //   return patientProps || defaultProps;
    //   break;
    // case "pharmacy":
    //   return pharmacyProps || defaultProps;
    //   break;
    // case "hospital":
    //   return hospitalProps || defaultProps;
    //   break;
    case "center":
      return centerProps;
      break;
    default:
      defaultProps;
      break;
  }
};

const SignUpPage = ({ params }) => {
  const { type } = params;
  const [token, setToken] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [countries, setCountries] = useState([]);
  const [password_confirmation, setPassword_confirmation] = useState("");

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

  const [formData, setFormData] = useState(getInitialFormData(type));

  const [passwordIcon, setPasswordIcon] = useState(false);
  const [InputValues, setInputValues] = useState({
    country: {},
    subscription_period: "",
    subscription_type: "",
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

    // if (formData.password !== password_confirmation) {
    //   toast.error("Passwords do not match.");
    //   return;
    // }

    setError(null);
    try {
      setLoading(true);
      console.log(formData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
          userType === "admin" ? "center/admin" : userType
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
      toast.success("registered successfully.");
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.message);
    }
  };
  const renderMedicalCenterInputs = () => {
    return (
      <>
        {Object.keys(centerProps).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="font-medium">
              {key.replace("_", " ")}
            </label>
            <input
              type={key === "password" ? "password" : "text"}
              name={key}
              id={key}
              value={formData[key]}
              onChange={handleInputChange}
              required
              className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                error && "border-red-500"
              }`}
            />
          </div>
        ))}
      </>
    );
  };

  const renderDoctorInputs = () => {
    return (
      <>
        {Object.keys(doctorProps).map((key) => {
          let type = "text";
          if (key === "password") {
            type = "password";
          } else if (key === "birth_date") {
            type = "date";
          } else if (key === "email") {
            type = "email";
          }
          return (
            <div key={key} className="flex flex-col">
              <label
                htmlFor={key}
                className="mb-4 text-md font-bold capitalize"
              >
                {key.replace("_", " ")}
              </label>
              <input
                type={type}
                name={key}
                id={key}
                value={formData[key]}
                // value={key}
                onChange={handleInputChange}
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />
            </div>
          );
        })}
      </>
    );
  };
  return (
    <section className="px-4 flex flex-col mt-20 gap-8 relative">
      <div>
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-500 text-transparent bg-clip-text">
          Welcome to Medicality!
          <MdWavingHand className="text-yellow-500 mx-2 text-3xl" />
        </h1>
        <h3 className="text-gray-500 text-sm mt-4 dark:text-gray-300">
          Start managing your hospital better.
        </h3>
        <h1 className="text-gray-500 text-sm mt-4 dark:text-gray-300">
          You are singing up as a{" "}
          <span className="text-green-500 capitalize text-xl font-semibold">
            {type}
          </span>
          .
        </h1>
      </div>
      <div>
        <h1 className="text-3xl font-bold  mb-4">Sign up</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-4">
            {type === "center" && renderMedicalCenterInputs()}
            {type === "doctor" && renderDoctorInputs()}
            {type === "nurse" && renderNurseInputs()}

            <div className="flex flex-col relative">
              <label htmlFor="password" className=" font-medium">
                Password
              </label>
              <input
                type={passwordIcon ? "text" : "password"}
                name="password"
                id="password"
                // value={formData.password}
                onChange={handleInputChange}
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />

              <button
                type="button"
                className="absolute cursor-pointer top-[65%] translate-y-[-50%] right-2"
                onClick={togglePasswordIcon}
              >
                {passwordIcon ? (
                  <MdVisibility size={20} className="text-gray-500" />
                ) : (
                  <MdVisibilityOff size={20} className="text-gray-500" />
                )}
              </button>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password_confirmation" className=" font-medium">
                Confirm Password
              </label>
              <input
                type={passwordIcon ? "text" : "password"}
                name="password_confirmation"
                id="password_confirmation"
                value={password_confirmation}
                onChange={(event) =>
                  setPassword_confirmation(event.target.value)
                }
                required
                className={`px-4 w-full rounded-md dark:bg-slate-800 dark:placeholder:text-slate-200 focus:outline-gray-200 py-2 ${
                  error && "border-red-500"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="country" className=" font-medium">
                Country
              </label>
              <div>
                <SelectInputNoLabel
                  options={countries}
                  value={InputValues.country}
                  name="country"
                  onChange={handleSelectChange}
                  placeholder="Select country"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="subscription_type" className=" font-medium">
                Subscription Duration
              </label>
              <div>
                <SelectInputNoLabel
                  options={[{ value: "Basic", label: "Basic" }]}
                  name="subscription_type"
                  value={[
                    {
                      value:
                        InputValues.subscription_type ||
                        "Select subscription type",
                      label: InputValues.subscription_type,
                    },
                  ]}
                  onChange={handleSelectChange}
                  placeholder="Select subscription type"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="subscription_period" className="font-medium">
                Subscription Period
              </label>
              <div>
                <SelectInputNoLabel
                  options={[
                    { value: "Free_trail", label: "Free trail" },
                    { value: "Month", label: "Month" },
                    { value: "Year", label: "Year" },
                  ]}
                  name="subscription_period"
                  value={[
                    {
                      value:
                        InputValues.subscription_period ||
                        "Select subscription period",
                      label: InputValues.subscription_period,
                    },
                  ]}
                  onChange={handleSelectChange}
                  placeholder="Select subscription period"
                />
              </div>
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
};
export default SignUpPage;
