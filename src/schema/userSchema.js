import { object, string } from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const loginUserSchema = object().shape({
  email: string()
    .email("Please enter a valid email address.")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address."
    ),
  password: string().required("No password provided."),
  user_type: string().required("Please Select your Specialty."),
});

export const signUpSchema = object().shape({
  full_name: string()
    .required("Please enter your name.")
    .matches(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "Please enter a valid name."
    ),
  email: string()
    .email("Please enter a valid email address.")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address."
    ),
  password: string()
    .required("Please enter a password.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
    ),
  country: string().required("Please select your country."),
  subscription_type: string().required("Please select a subscription type."),
  subscription_period: string().required(
    "Please select a subscription period."
  ),
});
