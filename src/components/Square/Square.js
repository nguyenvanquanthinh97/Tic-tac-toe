import React from 'react';
import "./style.scss";
import PropTypes from "prop-types";

const Square = (props) => {
  const { highLighted } = props;
  return (
    <button onClick={props.handleClick} className={`square ${highLighted ? 'high-lighted' : ''}`}>
      {props.value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  handleClick: PropTypes.func
};

export default Square;