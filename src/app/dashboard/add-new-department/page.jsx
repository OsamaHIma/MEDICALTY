"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input, SelectInput } from "@/components/Input";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { MdDescription } from "react-icons/md";
import { RiFileUserLine } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";

import { toast } from "react-toastify";

const AddDepartment = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const defaultProps = {
    center_id: "",
    name: "",
    description: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const { center_id, name, description } = formFields;

  const { uploadedPhoto } = usePhoto();

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/center/admin/department/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formFields),
      });

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
      } else {
        toast.error("Failed to send data");
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };

  const [isValid, setIsValid] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      setIsValid("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };

  return (
    <section>
      <Header imageUploader headerText="Add new department" />
      <form
        className={`px-10 ${isValid}`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <Input
            ClassesForTheInput="h-12"
            ClassesForTheLabel="h-12 !text-center !py-3"
            labelText="center id"
            placeHolder="center id - from the system"
            icon={<RiFileUserLine size={23} />}
            name="center_id"
            value={center_id}
            onChange={onChange}
            type="number"
          />

          <Input
            ClassesForTheInput="h-11 "
            ClassesForTheLabel="h-12 !text-center w-[20%] !py-3"
            labelText="department Name "
            placeHolder="department Name"
            icon={<HiIdentification size={23} />}
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <Input
          labelText="department Description"
          icon={<MdDescription size={23} />}
          name="description"
          value={description}
          onChange={onChange}
          type="textarea"
        />
        <div className="flex w-full justify-center mt-5">
          <Button
            type="submit"
            content="Add department"
            filled
            additionalClasses="!py-3 !w-48"
          />
        </div>
      </form>
    </section>
  );
};

export default AddDepartment;
