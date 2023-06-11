import { object, string, } from "yup";

export const loginUserSchema = object().shape({
  email: string().email().required("Please Enter Email"),
  password: string()
    .required("No password provided.")
    .min(6, "Password is too short - should be 6 chars minimum."),
});

export const signUpSchema = object().shape({
  name: string().required("Please Enter Your Name"),
  centerName: string().required("Please Enter Your Center Name"),
  email: string().email().required("Please Enter Email"),
  password: string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  country: string().required("Please Enter Your Country Name"),
  subscriptionType: string().oneOf(
    ["medical_center", "doctor", "nurse", "physical_therapy"],
    "Please Select a Subscription Type"
  ),
  subscriptionDuration: string().oneOf(
    ["free_trial", "monthly", "yearly"],
    "Please Select a Subscription Duration"
  ),
});