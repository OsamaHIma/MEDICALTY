"use client";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Translate from "@/components/Translate";
import Button from "@/components/Button";
import DataGridComponent from "@/components/DataGrid";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const PagesDataGrid = ({ params }) => {
  const { link } = params;
  console.log(link[0]);
  const endpointUrl = link.map((param) => `${param}`).join("/");
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${endpointUrl}`;
  const { data: session } = useSession();
  const [token, setToken] = useState(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVkaWNhbHR5LnNwYWNlL2FwaS9jZW50ZXIvc2F2ZSIsImlhdCI6MTY4NzgwODgzMSwibmJmIjoxNjg3ODA4ODMxLCJqdGkiOiJoU3hpTXFiaDhhRzJBZjlaIiwic3ViIjoiMTciLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0.IsTsOugmpOZzuF0CwyelwU4k-3kj-ss6BOt863oqfIc"
  );
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Loading...",
      username: "Loading...",
      email: "Loading...",
      password: "Loading...",
      country: "Loading...",
      userRole: "Loading...",
      subscription_type: "Loading...",
      subscription_period: "Loading...",
      formal_email: "Loading...",
      phone: "Loading...",
      formal_phone: "Loading...",
      website: "Loading...",
      address1: "Loading...",
      address2: "Loading...",
    },
  ]);

  const [keys, setKeys] = useState([
    "id",
    "name",
    "username",
    "phone",
    "formal_phone",
    "website",
    "subscription_type",
    "subscription_period",
    "email",
    "formal_email",
    "state",
    "country",
    "province",
    "address1",
    "address2",
  ]);

  const [columns, setColumns] = useState([
    {
      field: "rowNumber",
      headerName: "",
      renderCell: (params) => <div>{params.id}.</div>,
      sortable: false,
      filterable: false,
    },
  ]);

  const fetchData = async () => {
    // setLoading(false);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const { data } = await response.json();

      // Set the keys based on the first item of the data array
      setKeys(Object.keys(data[0]));

      // Set the rows based on the data array
      setRows(data.map((item) => ({ ...item, id: item.id })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDataGridUpdate = async (updatedData, id) => {
    try {
      const response = await axios.post(
        `${url}/${id}`,
        JSON.stringify(updatedData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { token: token }
      );
    } catch (error) {
      toast.error(`Error updating the data: ${error}`);
      console.error(`Error updating the data: ${error}`);
    }
  };

  const handleCellEditCommit = (params, event) => {
    const {
      id,
      value,
      field,
      row,
      colDef: { headerName },
    } = params;

    const newValue = event.target.value;

    if (value === newValue || newValue === "") return;

    const updatedData = {
      ...row,
      [field]: newValue,
    };

    handleDataGridUpdate(updatedData, id);

    toast.success(
      `The field: "${headerName}" with the value of: "${value}" updated to "${newValue}" successfully`
    );
  };

  const onRowDelete = async (e, row) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${url}/${row.id}`, {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      console.log(response.status);
    } catch (error) {
      console.error(`Error deleting the row: ${error}`);
    }
  };

  useEffect(() => {
    if (keys.length === 0) return;
    const headerNames = keys.map((key) =>
      key
        .split(/(?=[A-Z])|_/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
    // Create the columns based on the keys and header names
    const newColumns = headerNames.map((headerName, index) => ({
      originalField: keys[index],
      field: keys[index],
      headerName: headerName,
      width: 170,
      headerClassName: "datagrid-header capitalize",
      cellClassName: "datagrid-cell",
      editable: true,
    }));
    newColumns.unshift(columns[0]);
    newColumns.push({
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onRowDelete(e, params.row)}
            content="Delete"
            bgColor="!bg-red-500/30"
            fontColor="!text-red-500"
            filled
            fontWeight="!font-bold"
          />
        );
      },
    });
    setColumns(newColumns);
  }, [keys]);

  return (
    <section className="px-8 pb-7">
      <div className="my-3 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-semibold capitalize dark:text-slate-100">
            <Translate>{link[0]}</Translate>
          </h1>
          <div className="flex items-center justify-start gap-3">
            <p className="text-sm text-gray-400 ">
              <Translate>Total Number Of </Translate>{" "}
              <Translate >{link[0]}</Translate> ({rows.length})
            </p>
          </div>
        </div>
        <Link href={`/dashboard/add-new-${link[0]}`}>
          <Button
            icon={<IoMdAdd />}
            content={`Add new ${link[0]}`}
            filled
            additionalClasses="mt-3 md:mt-0 w-full md:w-auto"
          />
        </Link>
      </div>

      <DataGridComponent
        rows={rows}
        columns={columns}
        onCellEditStop={handleCellEditCommit}
      />
    </section>
  );
};

export default PagesDataGrid;
