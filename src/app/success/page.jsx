"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { BsBagCheckFill } from "react-icons/bs";
import { playFireWorks } from "@/lib/fireWorks";
import Stripe from "stripe";

const Success = async ({ params, searchParams: { session_id } }) => {
  useEffect(() => {
    playFireWorks();
  }, []);
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // const session = await stripe.checkout.sessions.retrieve(session_id, {
  //   apiKey: process.env.STRIPE_SECRET_KEY,
     
  // });
  // const customer = await stripe.customers.retrieve(session.customer, {
  //   apiKey: process.env.STRIPE_SECRET_KEY,
  // });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 px-4 dark:bg-slate-800 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-md flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center">
          <BsBagCheckFill className="text-center text-7xl text-green-500" />

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-green-100">
            Thank you for your subscription!
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Check your email{" "}
            {/* <span className="font-bold text-green-400">
              {customer && customer.email}
            </span>{" "} */}
            inbox for more details, or your phone{" "}
            {/* <span className="font-bold text-green-400">
              {customer && customer.phone}
            </span>{" "} */}
            .
          </p>
        </div>
        <div>
          <p className="mt-8 text-center text-base text-gray-500 dark:text-gray-300">
            If you have any questions please email:
            <a
              className="ml-1 text-green-500 hover:text-green-600"
              href="mailto:support@medicalty.com"
            >
              support@medicalty.com
            </a>
          </p>
        </div>
        <div className="text-center">
          <Link href="/">
            <Button content="Back to the home page" filled />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
