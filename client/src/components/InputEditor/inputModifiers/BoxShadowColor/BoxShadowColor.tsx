import { useState } from "react";
import { ColorChangeHandler, ChromePicker } from "react-color";

import InputContainer from "../../../inputs/InputContainer";

import "./BoxShadowColor.scss";

interface IBoxShadowColor {
  color: string;
  onChange: ColorChangeHandler;
}

const BoxShadowColor = ({ color, onChange }: IBoxShadowColor) => {
  const [showColor, setShowColor] = useState(false);

  return (
    <>
      <InputContainer
        label="Box shadow color"
        component={
          <div
            style={{ backgroundImage: "url(images/picker-background.png)" }}
            className="box-shadow-color-modifier-input-container"
            onClick={() => setShowColor(!showColor)}
          >
            <div
              style={{
                backgroundColor: color,
              }}
              className="box-shadow-color-modifier-input-color-block"
            />
          </div>
        }
      />
      {showColor && (
        <div
          className="box-shadow-color-modifier-picker-container"
          onMouseLeave={() => setShowColor(false)}
        >
          <ChromePicker color={color} onChange={onChange} />
        </div>
      )}
    </>
  );
};

export default BoxShadowColor;
