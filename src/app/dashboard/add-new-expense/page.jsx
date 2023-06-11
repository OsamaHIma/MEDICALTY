"use client";
import Button from "@/components/Button.tsx";
import Header from "@/components/Header";
import Input from "@/components/Input.tsx";
import { BsPerson, BsCalendar, BsFillPersonLinesFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Expense = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const defaultProps = {
    accounting_code: "",
    title: "",
    description: "",
    time: "",
    date: "",
    amount: "",
    attachment: "",
  };
  const [formFields, setFormFields] = useState(defaultProps);
  const { accounting_code, title, description, time, date, amount, attachment } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formFields),
      });

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
        headerText="Expense"
        chooseInput
        chooseInputText="Choose Employee"
        
      />
      <div className="px-10">
        <form className={`pb-7 ${isValid}`} onSubmit={handleSubmit} noValidate>
          <div className="flex gap-6 flex-col">
          <Input
            labelText="Accounting code"
            placeHolder="Accounting code"
            icon={<BsPerson />}
            name="accounting_code"
            value={accounting_code}
            onChange={onChange}
            type="number"
            required
          />

          <Input
            labelText="Title"
            placeHolder="Expense title"
            icon={<BsFillPersonLinesFill />}
            name="title"
            value={title}
            onChange={onChange}
            required
          />

          <Input
            labelText="Description"
            placeHolder="Expense description"
            type="textarea"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[23px] my-[23px]">
            <Input
              labelText="Time"
              icon={<BsCalendar />}
              name="time"
              value={time}
              onChange={onChange}
              type="time"
              required
            />

            <Input
              labelText="Date"
              icon={<BsCalendar />}
              name="date"
              value={date}
              onChange={onChange}
              type="date"
              required
            />

            <Input
              labelText="Amount"
              icon={<BsCalendar />}
              name="amount"
              value={amount}
              onChange={onChange}
              type="number"
              required
            />

            <Input
              labelText="Attachment"
              name="attachment"
              value={attachment}
              onChange={onChange}
              type="file"
              accept="image/*,video/*,.doc,.docx,.pdf"
            />
          </div>

          <div className="flex justify-between flex-wrap gap-3 my-11">
            <Button
              content="Cancel"
              additionalClasses="w-full md:w-auto"
              onClick={cancelFormSubmit}
              type="button"
            />

            <div className="saveBtns flex flex-wrap gap-2">
              <Button
                content="save and create another one"
                additionalClasses="w-full md:w-auto"
                type="submit"
              />

              <Button
                content="save now"
                filled
                additionalClasses="w-full md:w-auto"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Expense;