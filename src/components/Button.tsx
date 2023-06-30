import {Translate} from "translate-easy";

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
        ? `${bgColor} ${fontColor} hover:opacity-70`
        : `bg-transparent hover:bg-green-500 border-2 border-solid border-green-400 text-green-400 hover:text-white`
    }
    px-4 py-2 flex justify-center rtl:flex-row-reverse items-center transition-all  disabled:opacity-50 disabled:cursor-not-allowed
    ${additionalClasses}
  `;

  return (
    <button className={buttonClasses.trim()} {...buttonProps}>
      {icon && <span className="px-2">{icon}</span>}
      <Translate>{content}</Translate>
    </button>
  );
};

export default Button;
