import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import Select, { GroupBase } from "react-select";
import { Translate } from "translate-easy";

type Option = {
  label: string;
  value: string;
};
type selectProps = {
  upperCase?: boolean;
  rounded?: string;
  inputBgColor?: string;
  labelBgColor?: string;
  labelText: string;
  placeHolder?: string;
  required?: boolean;
  ClassesForTheDiv?: string;
  ClassesForTheLabel?: string;
  ClassesForTheInput?: string;
  options?: readonly (Option | GroupBase<Option>)[];
  rest?: Record<string, any>;
};
type InputProps = {
  upperCase?: boolean;
  rounded?: string;
  inputBgColor?: string;
  labelBgColor?: string;
  labelText: string;
  name: string;
  type?: string;
  minLength?: number | boolean;
  placeHolder?: string | any;
  required?: boolean;
  icon?: React.ReactNode;
  ClassesForTheDiv?: string;
  ClassesForTheLabel?: string;
  ClassesForTheInput?: string;
  ClassesForTheIcon?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & JSX.IntrinsicElements["input"] &
  JSX.IntrinsicElements["textarea"];
export const Input = ({
  upperCase = false,
  rounded = "rounded-md",
  inputBgColor = "bg-blue-50 dark:bg-slate-700",
  labelBgColor = "bg-green-500",
  labelText,
  name,
  type = "text",
  placeHolder,
  required = true,
  icon,
  ClassesForTheDiv,
  ClassesForTheLabel,
  ClassesForTheInput,
  ClassesForTheIcon,
  onChange,
}: InputProps) => {
  const { collapsed } = useProSidebar();

  const renderTextArea = () => (
    <>
      <label
        htmlFor="textarea"
        className={`text-gray-100 ${labelBgColor} ${
          collapsed ? null : "!text-[13px]"
        } h-8 px-3 pt-1 text-[13px] ltr:rounded-l-md rtl:rounded-r-md md:text-[16px] ${ClassesForTheLabel}`}
      >
        <Translate>{labelText}</Translate>
      </label>
      <textarea
        id="textarea"
        name={name}
        placeholder={placeHolder}
        className="flex-1 border border-blue-300 bg-green-50 p-2 align-middle focus:outline-blue-600 ltr:rounded-r-md rtl:rounded-l-md dark:bg-slate-700"
        rows={3}
        cols={3}
        onChange={onChange}
      ></textarea>
    </>
  );
  const minLength = type === "password" ? 8 : undefined;
  const renderDefaultInput = () => (
    <>
      <input
        className={`relative ml-2 flex-1 px-2 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
        type={type}
        name={name}
        placeholder={
          (type === "password" &&
            "The password should be 8 characters at least") ||
          placeHolder ||
          labelText
        }
        required={required}
        onChange={onChange}
        minLength={minLength}
      />

      {icon && (
        <div
          className={`mr-3 text-blue-300 rtl:ml-3 dark:text-blue-200 ${ClassesForTheIcon}`}
        >
          {icon}
        </div>
      )}
    </>
  );

  const renderInputs = () => {
    switch (type) {
      case "textarea":
        return renderTextArea();
      default:
        return renderDefaultInput();
    }
  };

  return (
    <div
      className={`flex capitalize ${upperCase && "uppercase"} flex-nowrap ${
        type === "textarea"
          ? "bg-transparent"
          : `needs-validation items-center border-2 border-blue-200 ${rounded} overflow-hidden ${inputBgColor}`
      } ${ClassesForTheDiv}`}
    >
      {type === "textarea" ? null : (
        <label
          className={`text-gray-100 ${labelBgColor} ${
            collapsed ? null : "!text-[13px]"
          } h-full flex-[0.5] px-3 py-2 text-[13px] md:text-[16px] ${ClassesForTheLabel}`}
        >
          <Translate>{labelText}</Translate>
        </label>
      )}
      {renderInputs()}
    </div>
  );
};
export const SelectInput = ({
  upperCase = false,
  rounded = "rounded-md",
  inputBgColor = "bg-blue-50 dark:bg-slate-700",
  labelBgColor = "bg-green-500",
  labelText,
  placeHolder,
  required = true,
  ClassesForTheDiv,
  ClassesForTheLabel,
  ClassesForTheInput,
  options,
  ...rest
}: selectProps) => {
  const { collapsed } = useProSidebar();

  return (
    <div
      className={`flex capitalize ${
        upperCase && "uppercase"
      } needs-validation flex-nowrap 
     items-center rounded-md ${inputBgColor}
     ${ClassesForTheDiv}`}
    >
      <label
        className={`text-gray-100 ${labelBgColor} ${
          collapsed ? null : "!text-[13px]"
        } flex-[0.5] px-3 py-2 text-[13px] ltr:rounded-l-md rtl:rounded-r-md md:text-[16px] ${ClassesForTheLabel}`}
      >
        <Translate>{labelText}</Translate>
      </label>

      <Select
        placeholder={placeHolder}
        className={`flex-1 focus:outline-none dark:bg-slate-700 dark:text-slate-700 ${inputBgColor} ${ClassesForTheInput}`}
        options={options}
        required={required}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#4ade80",
            primary: "primary50",
          },
        })}
        {...rest}
      />
    </div>
  );
};
