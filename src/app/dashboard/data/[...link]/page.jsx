"use client";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
import PropTypes from "prop-types";

import Button from "@/components/Button";
import DataGridComponent from "@/components/DataGrid";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const PagesDataGrid = ({ params }) => {
  const { link } = params;
  const endpointUrl = link.map((param) => `${param}`).join("");
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${endpointUrl}`;
  const apiUrl = "";
  console.log(endpointUrl);
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);
  const [rows, setRows] = useState([
    {
      // "logo": "data:image/https://example.com/logo.png",
      id: 1,
      name: "Example Center",
      username: "example_center",
      email: "d@1aexample.ccom",
      password: "password123",
      country: "US",
      userType: "center",
      subscription_type: "Basic",
      subscription_period: "Month",
      formal_email: "example@example.com",
      phone: "555-1234",
      formal_phone: "555-5678",
      website: "https://example.com",
      address1: "123 Main St",
      address2: "Apt 4",
      state: "CA",
      province: "California",
      zip_code: "90210",
      facebook: "https://www.facebook.com/example",
      instagram: "https://www.instagram.com/example",
      twitter: "https://www.twitter.com/example",
      snapchat: "https://www.snapchat.com/example",
      youtube: "https://www.youtube.com/channel/example",
    },
    {
      // "logo": "data:image/https://example.com/logo.png",
      id: 2,
      name: "Example Center",
      username: "example_center",
      email: "d@1aexample.ccom",
      password: "password123",
      country: "US",
      userType: "center",
      subscription_type: "Basic",
      subscription_period: "Month",
      formal_email: "example@example.com",
      phone: "555-1234",
      formal_phone: "555-5678",
      website: "https://example.com",
      address1: "123 Main St",
      address2: "Apt 4",
      state: "CA",
      province: "California",
      zip_code: "90210",
      facebook: "https://www.facebook.com/example",
      instagram: "https://www.instagram.com/example",
      twitter: "https://www.twitter.com/example",
      snapchat: "https://www.snapchat.com/example",
      youtube: "https://www.youtube.com/channel/example",
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
    "zip_code",
    "facebook",
    "instagram",
    "snapchat",
    "youtube",
    "password",
    "twitter",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
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
      }
    };

    fetchData();
  }, [apiUrl, token]);

  const handleDataGridUpdate = async (updatedData, id) => {
    try {
      const response = await axios.put(
        `${apiUrl}/${id}`,
        JSON.stringify(updatedData),
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
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
      `The field: "${headerName}" with the value: "${value}" updated to "${newValue}" successfully`
    );
  };

  const onRowDelete = async (e, row) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${apiUrl}/${row.id}`, {
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
            {endpointUrl}
          </h1>
          <div className="flex items-center justify-start gap-3">
            <Button
              content="Filter"
              filled
              bgColor="!bg-gray-300"
              fontColor="text-[#4a4a4a]"
              icon={<MdOutlineFilterAlt size={25} />}
            />
            <p className="text-sm text-gray-400">
              Total Number Of {endpointUrl} ({rows.length})
            </p>
          </div>
        </div>
        <Link href={`/dashboard/add-new-${endpointUrl}`}>
          <Button
            icon={<IoMdAdd />}
            content={`Add new ${endpointUrl}`}
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

// PagesDataGrid.propTypes = {
//   apiUrl: PropTypes.string.isRequired,
// };

export default PagesDataGrid;
