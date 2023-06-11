"use client";
import { useEffect, useState } from "react";
import { FaUser, FaUsers, FaCalendarAlt } from "react-icons/fa";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Employees = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [isValid, setIsValid] = useState("");
  const defaultProps = {
    employee_number: "",
    name: "",
    username: "",
    hourly_salary: "",
    total_salary: "",
    date_of_birth: "",
    department_name: "",
    work_schedule: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const {
    employee_number,
    name,
    username,
    hourly_salary,
    total_salary,
    date_of_birth,
    department_name,
    work_schedule,
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
      <Header headerText="Add New Employee" imageUploader />

      <form
        className={`${isValid} px-10`}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <div className="flex flex-row gap-12 flex-wrap justify-between mb-20">
          <div className="flex flex-col gap-6 flex-1">
            <div className="grid grid-cols-1 gap-[52px] md:grid-cols-2 md:gap-3">
              <Input
                labelText="Employee Number"
                type="text"
                name="employee_number"
                value={employee_number}
                onChange={onChange}
                icon={<FaUser />}
              />
              <Input
                labelText="Name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                icon={<FaUser />}
              />
              <Input
                labelText="Username"
                name="username"
                value={username}
                onChange={onChange}
                icon={<FaUsers />}
                type="text"
              />
              <Input
                name="hourly_salary"
                value={hourly_salary}
                onChange={onChange}
                labelText="Hourly Salary"
                placeholder="Hourly Salary"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 gap-[52px] md:grid-cols-2 md:gap-3">
              <Input
                name="total_salary"
                value={total_salary}
                onChange={onChange}
                labelText="Total Salary"
                placeholder="Total Salary"
                type="number"
              />
              <Input
                name="date_of_birth"
                value={date_of_birth}
                onChange={onChange}
                labelText="Date of Birth"
                placeholder="Date of Birth"
                type="date"
                icon={<FaCalendarAlt />}
              />
              <Input
                name="department_name"
                value={department_name}
                onChange={onChange}
                labelText="Department Name"
                placeholder="Department Name"
                type="select"
                options={[
                  { value: "Department A", label: "Department A" },
                  { value: "Department B", label: "Department B" },
                ]}
              />
              <Input
                name="work_schedule"
                value={work_schedule}
                onChange={onChange}
                labelText="Work Schedule"
                placeholder="Work Schedule"
                type="select"
                options={[
                  { value: "Any Time", label: "Any Time" },
                  { value: "Morning", label: "Morning" },
                  { value: "Afternoon", label: "Afternoon" },
                  { value: "Evening", label: "Evening" },
                ]}
              />
            </div>
          </div>
        </div>

        <Button content="Add Employee" type="submit" filled />
      </form>
    </section>
  );
};

export default Employees;
