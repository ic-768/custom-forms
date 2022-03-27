import { useState } from "react";
import { ColorChangeHandler, ChromePicker } from "react-color";

import InputContainer from "../../../../../../components/inputs/InputContainer";

import "./BorderColor.scss";

interface IBorderColor {
  color: string;
  onChange: ColorChangeHandler;
}

const BorderColor = ({ color, onChange }: IBorderColor) => {
  const [showColor, setShowColor] = useState(false);

  return (
    <>
      <InputContainer
        label="Box shadow color"
        component={
          <div
            style={{ backgroundImage: "url(images/picker-background.png)" }}
            className="border-color-modifier-input-container"
            onClick={() => setShowColor(!showColor)}
          >
            <div
              style={{
                backgroundColor: color,
              }}
              className="border-color-modifier-input-color-block"
            />
          </div>
        }
      />
      {showColor && (
        <div
          className="border-color-modifier-picker-container"
          onMouseLeave={() => setShowColor(false)}
        >
          <ChromePicker color={color} onChange={onChange} />
        </div>
      )}
    </>
  );
};

export default BorderColor;
