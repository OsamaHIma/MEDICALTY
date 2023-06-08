"use client";
import { AiOutlineAlert } from "react-icons/ai";

function Error() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-red-500">
        Something Went Wrong
      </h2>
      <p className="text-base text-gray-500">
        We&apos;re sorry, but something went wrong. Please try again later.
      </p>
      <AiOutlineAlert className="mx-auto my-4" />
    </div>
  );
}

export default Error;
