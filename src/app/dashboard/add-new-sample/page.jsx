"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { MdDescription } from "react-icons/md";
import { RiFileUserLine } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";

import { toast } from "react-toastify";

const AddSample = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const defaultProps = {
    lab_id: "",
    doctor_id: "",
    patient_id: "",
    reply_id: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const { lab_id, doctor_id, patient_id, reply_id } = formFields;

  const { uploadedPhoto } = usePhoto();

  const onChange = (event) => {
    const { doctor_id, value } = event.target;
    setFormFields({ ...formFields, [doctor_id]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/lab/addSample", {
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
      toast.error(`${error.doctor_id}: ${error.message}`);
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
      <Header imageUploader headerText="Add new sample" />
      <form
        className={`px-10 ${isValid}`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <Input
            labelText="lab id"
            placeHolder="lab id - from the system"
            icon={<RiFileUserLine size={23} />}
            name="lab_id"
            value={lab_id}
            onChange={onChange}
            type="number"
          />

          <Input
            labelText="Doctor ID"
            icon={<HiIdentification size={23} />}
            name="doctor_id"
            value={doctor_id}
            onChange={onChange}
            type="number"
          />

          <Input
            labelText="patient ID"
            icon={<MdDescription size={23} />}
            name="patient_id"
            value={patient_id}
            onChange={onChange}
            type="number"
          />
          <Input
            labelText="reply ID"
            icon={<MdDescription size={23} />}
            name="reply_id"
            value={reply_id}
            onChange={onChange}
            type="number"
          />
        </div>

        <div className="mt-5 flex w-full justify-center">
          <Button
            type="submit"
            content="Add sample"
            filled
            additionalClasses="!py-3 !w-48"
          />
        </div>
      </form>
    </section>
  );
};

export default AddSample;
