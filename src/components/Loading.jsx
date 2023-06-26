"use client";
import { Circles } from "react-loader-spinner";
import PropTypes from "prop-types";

function Loading({
  type = "Circles",
  height = "24",
  width = "24",
  ariaLabel = "circles-loading",
  color = "#60a5fa",
}) {
  return (
    // <div className="">
    <Circles
      type={type}
      height={height}
      width={width}
      ariaLabel={ariaLabel}
      color={color}
    />
    // </div>
  );
}

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Loading;
