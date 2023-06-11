type ButtonProps = {
  fontColor?: string;
  fontWeight?: string;
  bgColor?: string;
  capitalize?: boolean;
  upperCase?: boolean;
  content: string | JSX.Element;
  icon?: JSX.Element;
  rounded?: string;
  filled?: boolean;
  additionalClasses?: string;
} & JSX.IntrinsicElements["button"];

const Button = ({
  fontColor = "text-white",
  fontWeight = "font-normal",
  bgColor = "bg-green-500",
  capitalize = false,
  upperCase = false,
  content,
  icon,
  rounded = "rounded-md",
  filled = false,
  additionalClasses,
  ...buttonProps
}: ButtonProps) => {
  const buttonClasses = `
    ${upperCase ? "uppercase" : ""}
    ${capitalize ? "capitalize" : ""}
    ${fontWeight}
    ${rounded}
    ${
      filled
        ? `${bgColor} ${fontColor}`
        : `bg-transparent hover:bg-green-500 border-2 border-solid border-green-400 text-green-400 hover:text-white`
    }
    mx-4 px-4 py-2 flex justify-center items-center transition-all
    ${additionalClasses}
  `;

  return (
    <button className={buttonClasses.trim()} {...buttonProps}>
      {icon && <span className="px-2">{icon}</span>}
      {content}
    </button>
  );
};

export default Button;
