"use client";
import { useEffect, useState } from "react";
import { FaUser, FaUsers, FaCalendarAlt } from "react-icons/fa";
import Button from "@/components/Button";
import Header from "@/components/Header";
import {Input,SelectInput} from "@/components/Input";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ServiceRequests = () => {
 

  
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [isValid, setIsValid] = useState("");
  const defaultProps = {
    request_number: "",
    customer_name: "",
    request_address: "",
    service_details: "",
    appointment_order: "",
    notes: "",
    appointment_times: "",
    appointment_date: "",
    appointment_start_time: "",
    appointment_end_time: "",
    supervising_doctor_name: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const {
    request_number,
    customer_name,
    request_address,
    service_details,
    appointment_order,
    notes,
    appointment_times,
    appointment_date,
    appointment_start_time,
    appointment_end_time,
    supervising_doctor_name,
  } = formFields;
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      console.log(token);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
        setIsValid("");
      } else {
        toast.error("Failed to send data");
        setIsValid("");
      }
    } catch (error) {
      toast.error(`${error.name}: ${error.message}`);
    }
  };
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
      <Header headerText="Add New Service Request" imageUploader />

      <form
        className={`${isValid} px-10`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-20">
          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              labelText="Request Number"
              type="text"
              name="request_number"
              value={request_number}
              onChange={onChange}
            />
            <Input
              labelText="Customer Name"
              type="text"
              name="customer_name"
              value={customer_name}
              onChange={onChange}
              icon={<FaUser />}
            />
            <Input
              labelText="Request Address"
              type="text"
              name="request_address"
              value={request_address}
              onChange={onChange}
            />
            <Input
              labelText="Appointment Start Time"
              type="time"
              name="appointment_start_time"
              value={appointment_start_time}
              onChange={onChange}
            />
            <Input
              labelText="Appointment End Time"
              type="time"
              name="appointment_end_time"
              value={appointment_end_time}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              labelText="Appointment Order"
              type="text"
              name="appointment_order"
              value={appointment_order}
              onChange={onChange}
            />
            <Input
              labelText="Notes"
              type="text"
              name="notes"
              value={notes}
              onChange={onChange}
            />
            <SelectInput
              labelText="Appointment Times"
              
              name="appointment_times"
              value={appointment_times}
              onChange={onChange}
              options={[
                { value: "Any Time", label: "Any Time" },
                { value: "Morning", label: "Morning" },
                { value: "Afternoon", label: "Afternoon" },
                { value: "Evening", label: "Evening" },
              ]}
            />
            <Input
              labelText="Appointment Date"
              type="date"
              name="appointment_date"
              value={appointment_date}
              onChange={onChange}
              icon={<FaCalendarAlt />}
            />
            <Input
              labelText="Supervising Doctor Name"
              type="text"
              name="supervising_doctor_name"
              value={supervising_doctor_name}
              onChange={onChange}
              icon={<FaUser />}
            />
          </div>
        </div>
        <Input
          labelText="Service Details"
          type="textarea"
          name="service_details"
          value={service_details}
          onChange={onChange}
        />

        <Button
          content="Add Service Request"
          type="submit"
          filled
          additionalClasses="mt-8"
        />
      </form>
    </section>
  );
};

export default ServiceRequests;
