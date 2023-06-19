"use client";

import { useEffect, useState } from "react";
import {
  MdVisibilityOff as VisibilityOffIcon,
  MdRemoveRedEye as RemoveRedEyeIcon,
  MdWavingHand as WavingHandIcon,
} from "react-icons/md";
import Button from "@/components/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginUserSchema } from "@/schema/userSchema";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Loading from "@/components/Loading";
import Translate from "@/components/Translate.tsx";
import SelectInputNoLabel from "@/components/SelectInputNoLabel";
import { FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const LoginPage = () => {
  // Define state variables
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRememberedUser, setIsRememberedUser] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});
  const { selectedLanguage } = useLanguage();
  const router = useRouter();
  // Define functions
  const togglePasswordIcon = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleGoogleLogin = async () => {
    signIn("google", {
      callbackUrl: `/dashboard`,
    });
  };
  const handleFacebookSignIn = () => {
    signIn("facebook", {
      callbackUrl: `/dashboard`,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      loginUserSchema.validateSync(
        {
          email: email,
          password: password,
        },
        { abortEarly: false }
      );
    } catch (error) {
      setError(error.errors);
      return;
    }
    setIsLoading(true);
    const user = await signIn("credentials", {
      email,
      password,
      userType,
    });
    if (!user.error) {
      handleRememberUser();
      router.push(`/dashboard`);
    } else {
      setError([user.error]);
      setIsLoading(false);
    }
  };
  const handleRememberUser = () => {
    if (isRememberedUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, password, userType, selectedOption })
      );
    } else {
      localStorage.removeItem("user");
    }
  };
  const handelSelectedOption = (option) => {
    setUserType(option.value);
    setSelectedOption(option);
  };
  useEffect(() => {
    // Check if there is a remembered user in local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    // Set state variables based on remembered user
    setIsRememberedUser(true);
    setEmail(user.email);
    setPassword(user.password);
    setUserType(user.userType);
    setSelectedOption(user.selectedOption);
  }, []);
  // Render the component
  return (
    <div className="mt-32 flex flex-col gap-8 px-4">
      <div className="">
        <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-3xl font-bold text-transparent">
          <Translate>Welcome Back!</Translate>
          <WavingHandIcon className="mx-2 text-3xl text-yellow-500" />
        </h1>
        <h3 className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          <Translate>Start managing your hospital better.</Translate>
        </h3>
      </div>

      <form className="flex flex-col gap-8" autoComplete="on">
        <div className="mb-2 flex flex-col">
          <label htmlFor="select" className="text-md mb-4 font-bold ">
            <Translate>Select your Specialty:</Translate>
          </label>
          <SelectInputNoLabel
            id="select"
            options={[
              { value: "patient", label: "Patient" },
              { value: "doctor", label: "Doctor" },
              { value: "nurse", label: "Nurse" },
              { value: "center", label: "Center" },
              { value: "department", label: "Department" },
              { value: "admin", label: "Admin" },
              { value: "lab", label: "Lab" },
            ]}
            value={selectedOption}
            placeholder="select"
            onChange={handelSelectedOption}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-md mb-4 font-bold ">
            <Translate>Your Email:</Translate>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            id="email"
            className={`w-full rounded-md px-4 py-2 focus:outline-gray-200 dark:bg-slate-800 dark:placeholder:text-slate-200 ${
              error && "border-red-500"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-md mb-4 font-bold">
            <Translate>Password:</Translate>
          </label>
          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={isShowPassword ? "text" : "password"}
              value={password}
              placeholder="Enter Your Password"
              id="password"
              autoComplete="current-password"
              className={`w-full rounded-md px-4 py-2 focus:outline-gray-200 dark:bg-slate-800 dark:placeholder:text-slate-200 ${
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
              {isShowPassword ? (
                <RemoveRedEyeIcon size={20} className="text-gray-500" />
              ) : (
                <VisibilityOffIcon size={20} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="mx-4  flex flex-col text-xs text-red-500">
            {error.map((err, key) => {
              return <p key={key}>*{err}</p>;
            })}
          </div>
        )}
        <div className="flex h-full w-full items-center  justify-between">
          <div className="flex items-center justify-center gap-1">
            <label htmlFor="remember-me" className=" text-xs text-gray-400 ">
              <Translate>Remember me:</Translate>
            </label>
            <div className="relative flex items-center ">
              <input
                onChange={(e) => setIsRememberedUser(e.target.checked)}
                type="checkbox"
                checked={isRememberedUser}
                id="remember-me"
                className="relative w-full border-none outline-none"
              />
            </div>
          </div>
          <h3 className="text-xs text-green-400 ">
            <Link
              href="/auth/forgot-password"
              className="text-blue-500 underline-offset-4 hover:underline"
            >
              <Translate>Forgot password?</Translate>
            </Link>
          </h3>
        </div>

        <div className="flex flex-col gap-5 text-center">
          <Button
            onClick={handleLogin}
            content={loading ? <Loading /> : "Login"}
          />
          <p className="text-xl">OR</p>
          <Button
            onClick={handleGoogleLogin}
            content={"Sign In with Google"}
            type="button"
            filled
            icon={<FcGoogle size={27} />}
          />
          <Button
            onClick={handleFacebookSignIn}
            content={"Sign Up with Facebook"}
            type="button"
            filled
            icon={<FaFacebook size={27} />}
          />
        </div>
      </form>
      <p className="relative bottom-0 mb-4 text-center text-gray-400">
        <Translate>You do not have an account yet?</Translate>{" "}
        <Link
          className="text-blue-500 underline-offset-4 hover:underline"
          href="/auth/type-of-user"
        >
          <Translate>Sign Up Now!</Translate>
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
