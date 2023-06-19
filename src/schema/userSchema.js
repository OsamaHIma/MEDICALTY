import { object, string } from "yup";

export const loginUserSchema = object().shape({
  email: string()
    .email("Please enter a valid email address.")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address."
    ),
  password: string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
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
    .min(8, "Password should be at least 8 characters long."),
  country: string().required("Please select your country."),
  subscription_type: string().oneOf(
    ["Basic", "Premium"],
    "Please select a subscription type."
  ),
  subscription_period: string().oneOf(
    ["Free_trial", "Month", "Year"],
    "Please select a subscription period."
  ),
});
