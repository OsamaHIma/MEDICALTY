import Select from "react-select";
const SelectInputNoLabel = ({
  rounded = "rounded-md",
  inputBgColor = "bg-blue-50 dark:bg-slate-700",
  placeHolder,
  required = true,
  ClassesForTheInput,
  options,
  ...rest
}) => {
  return (
    <Select
      placeholder={placeHolder}
      className={`dark:text-slate-700 dark:bg-slate-700 focus:outline-none ${inputBgColor} ${ClassesForTheInput}`}
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
  );
};

export default SelectInputNoLabel;
