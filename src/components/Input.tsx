import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import Select, { GroupBase } from "react-select";

type Option = {
  label: string;
  value: string;
};

type InputProps = {
  upperCase?: boolean;
  rounded?: string;
  inputBgColor?: string;
  labelBgColor?: string;
  labelText: string;
  type?: string;
  typeOfSelectData?: string;
  placeHolder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  ClassesForTheDiv?: string;
  ClassesForTheLabel?: string;
  ClassesForTheInput?: string;
  ClassesForTheIcon?: string;
  options?: readonly (Option | GroupBase<Option>)[];
} & JSX.IntrinsicElements["input"];

const Input = ({
  upperCase = false,
  rounded = "rounded-md",
  inputBgColor = "bg-blue-50 dark:bg-slate-700",
  labelBgColor = "bg-green-500",
  labelText,
  type = "text",
  typeOfSelectData,
  placeHolder,
  required = true,
  icon,
  ClassesForTheDiv,
  ClassesForTheLabel,
  ClassesForTheInput,
  ClassesForTheIcon,
  options,
}: InputProps) => {
  const renderSelect = () => (
    <Select
      placeholder={placeHolder}
      className={`flex-1 dark:text-slate-700 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "#4ade80",
          primary: "primary50",
        },
      })}
    />
  );
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
        placeholder={placeHolder}
        className="border border-blue-300 bg-green-50 dark:bg-slate-700 focus:outline-blue-600 flex-1 p-2 rounded-tr-md rounded-br-md resize-none align-middle"
        cols={20}
        rows={5}
      ></textarea>
    </>
  );

  const renderDefaultInput = () => (
    <>
      <input
        className={`ml-2 flex-1 px-2 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
        type={type}
        placeholder={placeHolder || labelText}
        required={required}
      />
      {icon && (
        <div className={`text-green-400 pr-2 ${ClassesForTheIcon}`}>{icon}</div>
      )}
    </>
  );

  const renderInputs = () => {
    switch (type) {
      case "select":
        return renderSelect();
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

export default Input;
