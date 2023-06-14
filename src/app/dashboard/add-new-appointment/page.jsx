"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

import Header from "@/components/Header";
import { FaClock, FaUserAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { SelectInput, Input } from "@/components/Input";

const Appointment = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const [appointment, setAppointment] = useState({
    doctor: null,
    doctor_id: "",
    job_number: "",
    image: "",
    date: "",
    start_time: "",
    end_time: "",
  });
  const { uploadedImage } = usePhoto();

  const onChange = (selectedOption) => {
    setAppointment({ ...appointment, doctor: selectedOption });
  };

  const resetFormFields = () => {
    setAppointment({
      doctor: null,
      doctor_id: "",
      job_number: "",
      image: "",
      date: "",
      start_time: "",
      end_time: "",
    });
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...appointment, image: uploadedImage }),
      });

      if (response.ok) {
        toast.success("Appointment booked successfully");
        resetFormFields();
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };

  const [isValid, setIsValid] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !event.target.checkValidity() ||
      !uploadedImage ||
      !appointment.doctor
    ) {
      event.stopPropagation();
      setIsValid("not-validated");
      toast.error(
        "Please fill in all required fields including the image and doctor name"
      );
      return;
    }

    setIsValid("validated");
    handlePostRequest();
    resetFormFields();
  };

  const doctorOptions = [
    { value: "Dr. John Doe", label: "Dr. John Doe" },
    { value: "Dr. Jane Smith", label: "Dr. Jane Smith" },
    { value: "Dr. David Lee", label: "Dr. David Lee" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
    }),
  };

  return (
    <section>
      <Header imageUploader headerText="Book Appointment" />
      <form
        className={`px-10 flex flex-col gap-6 ${isValid}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-6">
          <SelectInput
            labelText="Select A Doctor"
            options={doctorOptions}
            value={appointment.doctor}
            onChange={onChange}
            styles={customStyles}
            icon={<FaUserAlt />}
          />
          <Input
            labelText="Doctor ID"
            placeHolder="Doctor ID"
            name="doctor_id"
            value={appointment.doctor_id}
            onChange={(e) =>
              setAppointment({ ...appointment, doctor_id: e.target.value })
            }
            icon={<FaUserAlt />}
          />
          <Input
            labelText="Job Number"
            placeHolder="Job Number"
            name="job_number"
            value={appointment.job_number}
            onChange={(e) =>
              setAppointment({ ...appointment, job_number: e.target.value })
            }
            icon={<HiOutlineMail />}
          />
          <Input
            labelText="Date"
            name="date"
            value={appointment.date}
            onChange={(e) =>
              setAppointment({ ...appointment, date: e.target.value })
            }
            type="date"
            icon={<HiOutlineMail />}
          />
          <div className="grid grid-cols-2 gap-6">
            <Input
              labelText="Start Time"
              name="start_time"
              value={appointment.start_time}
              onChange={(e) =>
                setAppointment({ ...appointment, start_time: e.target.value })
              }
              type="time"
              icon={<FaClock />}
            />
            <Input
              labelText="End Time"
              name="end_time"
              value={appointment.end_time}
              onChange={(e) =>
                setAppointment({ ...appointment, end_time: e.target.value })
              }
              type="time"
              icon={<FaClock />}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            content="Book Appointment"
            filled
            additionalClasses="w-full md:w-auto"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

export default Appointment;
