import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import Select, { GroupBase } from "react-select";

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
  placeHolder?: string;
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
        htmlFor="your-textarea"
        className={`text-gray-100 ${labelBgColor} ${
          collapsed ? null : "!text-[13px]"
        } text-[13px] md:text-[16px] rounded-tl-md rounded-bl-md pt-1 h-8 px-3 ${ClassesForTheLabel}`}
      >
        {labelText}
      </label>
      <textarea
        id="textarea"
        name={name}
        placeholder={placeHolder}
        className="border border-blue-300 bg-green-50 dark:bg-slate-700 focus:outline-blue-600 flex-1 p-2 rounded-tr-md rounded-br-md align-middle"
        rows={3}
        cols={3}
        onChange={onChange}
      ></textarea>
    </>
  );

  const renderDefaultInput = () => (
    <>
      <input
        className={`ml-2 flex-1 px-2 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
        type={type}
        name={name}
        placeholder={placeHolder || labelText}
        required={required}
        onChange={onChange}
      />
      {icon && (
        <div
          className={`text-blue-300 dark:text-blue-200 mr-3 ${ClassesForTheIcon}`}
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
      className={`flex capitalize ${upperCase && "uppercase"}  flex-nowrap${
        type === "textarea"
          ? "bg-transparent"
          : `border-2 border-blue-200 needs-validation items-center ${rounded} ${
              type === "select" ? null : "overflow-hidden"
            } ${inputBgColor}`
      } ${ClassesForTheDiv}`}
    >
      {type === "textarea" ? null : (
        <label
          className={`text-gray-100 ${labelBgColor} ${
            collapsed ? null : "!text-[13px]"
          } text-[13px] md:text-[16px] flex-[0.5] h-full px-3 py-2 ${ClassesForTheLabel}`}
        >
          {labelText}
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
      className={`flex capitalize ${upperCase && "uppercase"}  flex-nowrap 
     needs-validation items-center !rounded-md ${inputBgColor}
     ${ClassesForTheDiv}`}
    >
      <label
        className={`text-gray-100 ${labelBgColor} ${
          collapsed ? null : "!text-[13px]"
        } text-[13px] md:text-[16px] flex-[0.5] px-3 py-2 ${ClassesForTheLabel}`}
      >
        {labelText}
      </label>

      <Select
        placeholder={placeHolder}
        className={`flex-1 dark:text-slate-700 dark:bg-slate-700 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
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
