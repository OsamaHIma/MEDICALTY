"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import { usePhoto } from "@/context/PhotoContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import { MdDescription ,MdOutlineFormatListNumbered} from "react-icons/md";
import { RiFileUserLine } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi";

import { toast } from "react-toastify";

const AddProductPage = () => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  useEffect(() => {
    if (session) {
      setToken(session.user.token);
    }
  }, [session]);

  const defaultProps = {
    productCode: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const { productCode, name, description, price, quantity, category } =
    formFields;

  const { uploadedPhoto } = usePhoto();

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultProps);
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formFields, image: uploadedPhoto }),
      });

      if (response.ok) {
        toast.success("Data successfully sent");
        resetFormFields();
      } else {
        toast.error("Failed to send data");
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
      <Header imageUploader headerText="Add new product" />
      <form className={`px-10 ${isValid} `} onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[52px] mb-20">
          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center !py-3"
              labelText="Product Code"
              placeHolder="Product Code - from the system"
              icon={<RiFileUserLine size={23} />}
              name="productCode"
              value={productCode}
              onChange={onChange}
              required
            />
            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center !py-3"
              labelText="Product Category"
              placeHolder="Choose Category"
              icon={<FaShoppingCart size={23} />}
              name="category"
              value={category}
              onChange={onChange}
              required
            />

            <Input
              ClassesForTheInput="h-11 "
              ClassesForTheLabel="h-12 !text-center w-[20%] !py-3"
              labelText="Product Name "
              placeHolder="Product Name"
              icon={<HiIdentification size={23} />}
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex flex-col gap-6 flex-1 md:w-full">
            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center !py-3"
              labelText="Product Price"
              placeHolder="Price"
              icon={<FaDollarSign size={23} />}
              name="price"
              value={price}
              onChange={onChange}
              type="number"
              min="0"
              required
            />

            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center !py-3"
              labelText="Product Quantity"
              placeHolder="Quantity"
              icon={<MdOutlineFormatListNumbered size={23} />}
              name="quantity"
              value={quantity}
              onChange={onChange}
              type="number"
              min="0"
              required
            />

            <Input
              ClassesForTheInput="h-12"
              ClassesForTheLabel="h-12 !text-center w-[20%] !py-3"
              labelText="Product Description"
              placeHolder="Description"
              icon={<MdDescription size={23} />}
              name="description"
              value={description}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="flex w-full justify-center">
          <Button
            type="submit"
            content="Add Product"
            filled
            additionalClasses="!py-3 !w-48"
          />
        </div>
      </form>
    </section>
  );
};

export default AddProductPage;
