"use client";
import PaypalExpressCheckout from "paypal-rest-sdk";
import { useState } from "react";

let paypalInstance = {};

const monthlyPlan = {
  product_id: "monthly",
  name: "Monthly Plan",
  description: "Monthly Subscription",
  type: "recurring",
  payment_definitions: [
    {
      name: "Monthly Plan",
      type: "REGULAR",
      frequency_interval: "1",
      frequency: "MONTH",
      cycles: "0",
      amount: {
        value: "7",
        currency: "USD",
      },
    },
  ],
};

const yearlyPlan = {
  product_id: "yearly",
  name: "Yearly Plan",
  description: "Yearly Subscription",
  type: "recurring",
  payment_definitions: [
    {
      name: "Yearly Plan",
      type: "REGULAR",
      frequency_interval: "1",
      frequency: "YEAR",
      cycles: "0",
      amount: {
        value: "30",
        currency: "USD",
      },
    },
  ],
};

const initializePaypalSDK = () => {
  PaypalExpressCheckout.configure({
    mode: "sandbox",
    client_id: `${process.env.PAYPAL_CLIENT_ID}`,
    client_secret: `${process.env.PAYPAL_CLIENT_SECRET}`,
  });
  paypalInstance = PaypalExpressCheckout;
};

const Paypal = () => {
  const [res, setRes] = useState(null);

  const subscribe = async () => {
    const subscription = await paypalInstance.billingPlans.create(monthlyPlan);
    res.redirect(subscription.links[1].href);
  };

  initializePaypalSDK();

  return <button onClick={() => setRes(subscribe)}>Subscribe Monthly</button>;
};

export default Paypal;
