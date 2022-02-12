import React from "react";
import * as InputTypes from "../inputComponents/types";

interface IInputContainer {
  component: typeof InputTypes;
  label?: string;
}
const InputContainer = ({ component, label }: IInputContainer) => (
  <div className="input-container">
    <span className="input-label">{label}</span>
    {component}
  </div>
);

export default InputContainer;
