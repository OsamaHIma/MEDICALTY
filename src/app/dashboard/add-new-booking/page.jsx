"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import {Input} from "@/components/Input";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  GiDoctorFace,
  GiClockwork,
  GiCalendar,
  GiCheckeredFlag,
} from "react-icons/gi";
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
    doctorID: "",
    date: "",
    timeFrom: "",
    timeTo: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const { doctor, doctorID, date, timeFrom, timeTo } = formFields;

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
      const formData = new FormData();
      formData.append("doctor", doctor);
      formData.append("doctorID", doctorID);
      formData.append("date", date);
      formData.append("timeFrom", timeFrom);
      formData.append("timeTo", timeTo);
      formData.append("image", uploadedPhoto);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-14">
          <Input
            id="doctor"
            name="doctor"
            labelText="Doctor's Name"
            placeholder="Enter Doctor's Name"
            value={doctor}
            onChange={onChange}
            required
            icon={<GiDoctorFace size={23} />}
          />
          <Input
            id="doctorID"
            name="doctorID"
            labelText="Doctor's ID"
            placeholder="Enter Doctor's ID"
            value={doctorID}
            onChange={onChange}
            required
            icon={<GiCheckeredFlag size={23} />}
          />
          <Input
            id="date"
            name="date"
            labelText="Date"
            placeholder="Enter Date"
            value={date}
            onChange={onChange}
            required
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
            required
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
            required
            type="time"
            icon={<GiClockwork size={23} />}
          />
        </div>
        <Button content="Book Appointment" filled />
      </form>
    </section>
  );
};

export default BookingPage;
