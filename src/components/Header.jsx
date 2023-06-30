import DragAndDrop from "./DragAndDrop";
import { SelectInput } from "./Input";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Translate from "@/components/Translate";

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
  //   const fetchDoctorsData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_API_URL}/doctors/all`,
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

  //       const { doctors } = await response.json();
  //       setData(doctors.map((doctor) => doctor.name));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   // const fetchEmployeesData = async () => {
  //   //   try {
  //   //     const response = await fetch(
  //   //       `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user`,
  //   //       {
  //   //         method: "GET",
  //   //         headers: {
  //   //           "Content-Type": "application/json",
  //   //           token:  token,
  //   //         },
  //   //       }
  //   //     );

  //   //     if (!response.ok) {
  //   //       throw new Error(`HTTP error ${response.status}`);
  //   //     }

  //   //     const { user } = await response.json();
  //   //     setData(user.map((user) => user.name));
  //   //   } catch (error) {
  //   //     console.error("Error fetching data:", error);
  //   //   }
  //   // };
  //   if (chooseInputText === "Choose Employee") {
  //     fetchEmployeesData();
  //     console.log(data);
  //   } else {
  //     fetchDoctorsData();
  //     console.log(data);
  //   }
  // }, [token]);
  return (
    <section className="p-10">
      <div
        className={`g-3 flex-wrap items-center ${
          !headerText ? "justify-end md:flex" : "flex justify-between"
        }`}
      >
        <h1 className="flex-1 text-xl capitalize text-slate-700 dark:text-slate-50 md:text-3xl">
          <Translate>{headerText}</Translate>
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
        <div className="mb-9 mt-28 flex items-center justify-center">
          <DragAndDrop />
        </div>
      )}
    </section>
  );
};

export default Header;
