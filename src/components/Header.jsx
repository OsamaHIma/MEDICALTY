import DragAndDrop from "./DragAndDrop";
import { SelectInput } from "./Input";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Header = ({
  headerText = "",
  chooseInput = false,
  chooseInputText = "",
  imageUploader = false,
}) => {
 

  
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchCustomersData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/customer`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             token:  token,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error ${response.status}`);
  //       }

  //       const { customer } = await response.json();
  //       setData(customer.map((customer) => customer.first_name));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   const fetchEmployeesData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             token:  token,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error ${response.status}`);
  //       }

  //       const { user } = await response.json();
  //       setData(user.map((user) => user.name));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   if (chooseInputText === "Choose Employee") {
  //     fetchEmployeesData();
  //     console.log(data);
  //   } else {
  //     fetchCustomersData();
  //     console.log(data);
  //   }
  // }, [token]);
  return (
    <section className="p-10">
      <div
        className={`items-center flex-wrap g-3 ${
          !headerText ? "md:flex justify-end" : "justify-between flex"
        }`}
      >
        <h1 className="text-xl md:text-3xl capitalize flex-1 text-slate-700 dark:text-slate-50">
          {headerText}
        </h1>
        {chooseInput && (
          <SelectInput
            labelText={chooseInputText}
            
            placeHolder="select"
            ClassesForTheDiv="flex-1"
            labelBgColor="bg-slate-800"
            options={data}
          />
        )}
      </div>
      {imageUploader && (
        <div className="flex justify-center items-center mt-28 mb-9">
          <DragAndDrop />
        </div>
      )}
    </section>
  );
};

export default Header;
