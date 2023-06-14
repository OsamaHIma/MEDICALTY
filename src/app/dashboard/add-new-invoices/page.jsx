"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import {Input,SelectInput} from "@/components/Input";
import { useEffect, useState } from "react";
import PagesDataGrid from "@/components/PagesDataGrid";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { MdPayment, MdTextFields } from "react-icons/md";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Invoices = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const defaultProps = {
    order_id: "",
    company_logo: "",
    pay_to: "",
    title: "",
    date: "",
    payment_due: "",
    items: "",
    show_all_amounts: "",
    discount: "",
    tax: "",
    message: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const {
    order_id,
    company_logo,
    pay_to,
    title,
    date,
    payment_due,
    items,
    show_all_amounts,
    discount,
    tax,
    message,
  } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };
  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

      scheme;
      Copy;
      const data = await response.json();

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
      } else {
        toast.error(`Failed to send data: ${data.message}`);
        console.error(data);
      }
    } catch (error) {
      toast.error(`${error.method}: ${error.message}`);
      console.error("Error:", error);
    }
  };

  const [isValid, setIsValid] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setIsValid("not-validated");
      toast.error("Please fill in all required fields");
      return;
    }

    Copy;
    setIsValid("validated");
    handlePostRequest();
  };
  const cancelFormSubmit = () => {
    resetFormFields();
    setIsValid("");
  };
  return (
    <section>
      <Header
        headerText="Invoices"
        chooseInput
        chooseInputText="Choose Employee"
      />
      <div className="px-10 flex flex-col gap-6">
        <form className={`pb-7 ${isValid}`} onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[52px] mb-5 md:mb-[52px]">
            <div className="flex flex-col gap-[23px] flex-1">
              <Input
                labelText="Invoice Number"
                icon={<FaUserAlt />}
                name="order_id"
                value={order_id}
                onChange={onChange}
                type="number"
                required
              />
              <SelectInput
                labelText="Pay To"
                icon={<MdPayment />}
                name="pay_to"
                value={pay_to}
                onChange={onChange}
                
                required
              />
              <Input
                labelText="Invoice Title"
                name="title"
                value={title}
                onChange={onChange}
                required
              />
              <Input
                labelText="Invoice Date"
                placeHolder="Date of transmission"
                name="date"
                value={date}
                onChange={onChange}
                icon={<FaCalendarAlt />}
                type="date"
                required
              />
              <SelectInput
                labelText="Payment Due"
                name="payment_due"
                value={payment_due}
                onChange={onChange}
                
                options={[
                  { value: "10%", label: "10%" },
                  { value: "20%", label: "20%" },
                  { value: "25%", label: "25%" },
                  { value: "30%", label: "30%" },
                  { value: "40%", label: "40%" },
                  { value: "45%", label: "45%" },
                  { value: "50%", label: "50%" },
                  { value: "60%", label: "60%" },
                  { value: "75%", label: "75%" },
                  { value: "100%", label: "100%" },
                ]}
                required
              />
            </div>
            <div className="flex flex-col gap-[23px] flex-1">
              <Input
                labelText="Items"
                name="items"
                value={items}
                onChange={onChange}
                icon={<MdTextFields />}
                type="textarea"
                required
              />
              {/* <Input
                labelText="Show All Amounts"
                name="show_all_amounts"
                value={show_all_amounts}
                onChange={onChange}
                type="checkbox"
              /> */}
              <Input
                labelText="Discount"
                name="discount"
                value={discount}
                onChange={onChange}
                type="number"
              />
              <SelectInput
                labelText="Tax"
                name="tax"
                value={tax}
                onChange={onChange}
                
                options={[
                  { value: "0%", label: "0%" },
                  { value: "5%", label: "5%" },
                  { value: "10%", label: "10%" },
                  { value: "15%", label: "15%" },
                  { value: "20%", label: "20%" },
                  { value: "25%", label: "25%" },
                  { value: "30%", label: "30%" },
                ]}
              />
              <Input
                labelText="Message"
                name="message"
                value={message}
                onChange={onChange}
                type="textarea"
              />
            </div>
          </div>
          <div className="flex items-center">
            <Button type="submit" content="Submit" filled />
            <Button
              type="button"
              content="Cancel"
              onClick={cancelFormSubmit}
              additionalClasses="ml-3"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Invoices;
