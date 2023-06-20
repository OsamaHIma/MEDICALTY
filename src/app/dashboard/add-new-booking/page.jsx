"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  GiDoctorFace,
  GiClockwork,
  GiCalendar,
  GiCheckeredFlag,
} from "react-icons/gi";
import { MdTextFields } from "react-icons/md";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { uploadedPhoto, setUploadedPhoto } = usePhoto();

  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const defaultProps = {
    doctor: "",
    doctor_id: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    title: "",
    service_description: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const {
    doctor,
    doctor_id,
    date,
    timeFrom,
    timeTo,
    title,
    service_description,
  } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
    setUploadedPhoto(null);
  };

  const handlePostRequest = async () => {
    try {
      // const formData = new FormData();
      // formData.append("doctor", doctor);
      // formData.append("doctor_id", doctor_id);
      // formData.append("date", date);
      // formData.append("timeFrom", timeFrom);
      // formData.append("timeTo", timeTo);
      // formData.append("image", uploadedPhoto);

      const response = await fetch("/api/patient/bookingRequest", {
        method: "POST",
        headers: {
          token: token,
        },
        body: { ...formData, image: uploadedPhoto },
      });

      if (response.ok) {
        toast.success("Appointment successfully booked");
        resetFormFields();
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };

  const [isValid, setIsValid] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity() || !uploadedPhoto) {
      setIsValid("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }

    setIsValid("validated");
    handlePostRequest();
  };

  return (
    <section>
      <Header
        headerText="Booking an appointment"
        imageUploader
        chooseInput
        chooseInputText="Choose a Doctor"
      />
      <form
        className={`px-10 ${isValid}`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <Input
            id="title"
            name="title"
            labelText="Disease or illness name"
            value={title}
            onChange={onChange}
            icon={<MdTextFields size={23} />}
          />
          <Input
            id="doctor"
            name="doctor"
            labelText="Doctor's Name"
            placeholder="Enter Doctor's Name"
            value={doctor}
            onChange={onChange}
            icon={<GiDoctorFace size={23} />}
          />
          <Input
            id="doctor_id"
            name="doctor_id"
            labelText="Doctor's ID"
            placeholder="Enter Doctor's ID"
            value={doctor_id}
            onChange={onChange}
            icon={<GiCheckeredFlag size={23} />}
          />
          <Input
            id="date"
            name="date"
            labelText="Date"
            placeholder="Enter Date"
            value={date}
            onChange={onChange}
            type="date"
            icon={<GiCalendar size={23} />}
          />
          <Input
            id="timeFrom"
            name="timeFrom"
            labelText="Time From"
            placeholder="Enter Time From"
            value={timeFrom}
            onChange={onChange}
            type="time"
            icon={<GiClockwork size={23} />}
          />
          <Input
            id="timeTo"
            name="timeTo"
            labelText="Time To"
            placeholder="Enter Time To"
            value={timeTo}
            onChange={onChange}
            type="time"
            icon={<GiClockwork size={23} />}
          />
        </div>
        <Input
          id="service_description"
          name="service_description"
          labelText="Service description"
          placeHolder="Write the illness or the disease in full detail"
          value={service_description}
          onChange={onChange}
          type="textarea"
          icon={<GiClockwork size={23} />}
          ClassesForTheDiv="!mb-5"
        />
        <Button content="Book Appointment" filled />
      </form>
    </section>
  );
};

export default BookingPage;
