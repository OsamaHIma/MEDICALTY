"use client";
import Dropzone from "react-dropzone";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { BsPerson, BsCalendar, BsFillPersonLinesFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { FaFile } from "react-icons/fa";

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
  const {
    accounting_code,
    title,
    description,
    time,
    date,
    amount,
    attachment,
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
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
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
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <Input
              labelText="Accounting code"
              placeHolder="Accounting code"
              icon={<BsPerson />}
              name="accounting_code"
              value={accounting_code}
              onChange={onChange}
              type="number"
            />

            <Input
              labelText="Title"
              placeHolder="Expense title"
              icon={<BsFillPersonLinesFill />}
              name="title"
              value={title}
              onChange={onChange}
            />

            <Input
              labelText="Time"
              icon={<BsCalendar />}
              name="time"
              value={time}
              onChange={onChange}
              type="time"
            />
            <Input
              labelText="Date"
              icon={<BsCalendar />}
              name="date"
              value={date}
              onChange={onChange}
              type="date"
            />
            <Input
              labelText="Amount"
              icon={<BsCalendar />}
              name="amount"
              value={amount}
              onChange={onChange}
              type="number"
            />

            <Input
              labelText="Description"
              placeHolder="Expense description"
              type="textarea"
              name="description"
              value={description}
              onChange={onChange}
            />
          </div>
          <div className="dropzone-container">
            <Dropzone
              onDrop={(acceptedFiles) => {
                setFormFields({
                  ...formFields,
                  attachment: acceptedFiles[0],
                });
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="dropzone flex h-36 items-center justify-center gap-3 border-2 border-dashed border-gray-400 p-5 text-center"
                >
                  <input {...getInputProps()} />

                  <FaFile className="text-green-300" size={25} />
                  <p>Drag and drop a file here, or click to select a file</p>
                </div>
              )}
            </Dropzone>
            {attachment && (
              <div className="attachment-preview">
                {attachment.type.includes("image") ? (
                  <img
                    src={URL.createObjectURL(attachment)}
                    alt="Attachment preview"
                  />
                ) : attachment.type.includes("video") ? (
                  <video
                    src={URL.createObjectURL(attachment)}
                    alt="Uploaded Video"
                    className="h-full w-full rounded-lg object-cover"
                    controls
                  />
                ) : (
                  <p>{attachment.name}</p>
                )}
              </div>
            )}
          </div>
          <div className="my-11 flex flex-wrap justify-between gap-3">
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
                onClick={cancelFormSubmit}
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
