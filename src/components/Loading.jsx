"use client";
import { Circles } from "react-loader-spinner";
import PropTypes from "prop-types";

function Loading({ ...props }) {
  const {
    type = "Circles",
    height = "24",
    width = "24",
    ariaLabel = "circles-loading",
  } = props;
  return (
    // <div className="">
    <Circles
      type={type}
      height={height}
      width={width}
      ariaLabel={ariaLabel}
      color="#60a5fa"
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
