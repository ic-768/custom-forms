import { ReactElement, useState } from "react";
import classNames from "classnames";
import { ChromePicker } from "react-color";

import InputContainer from "../../InputContainer";
import ColorInputProps from "./ColorInputProps";

import "./ColorInput.scss";

const ColorInput = ({
  title,
  subtitle,
  className,
  value,
  onChange,
  style, //TODO
}: ColorInputProps): ReactElement => {
  const [showColor, setShowColor] = useState(false);

  const inputClasses = classNames({
    "color-input": true,
    [className!]: !!className,
  });

  const toggleShowColor = (): void => setShowColor((c) => !c);
  const hideShowColor = (): void => setShowColor(false);

  return (
    <InputContainer
      title={title}
      subtitle={subtitle}
      className={inputClasses}
      component={
        <>
          <button
            style={{ backgroundImage: "url(/images/picker-background.png)" }}
            className="color-input-container"
            onClick={toggleShowColor}
          >
            <div
              style={{
                backgroundColor: value,
              }}
              className="color-input-color-block"
            />
          </button>

          {showColor && (
            <div
              className="color-picker-container"
              onMouseLeave={hideShowColor}
            >
              <ChromePicker color={value} onChange={onChange} />
            </div>
          )}
        </>
      }
    />
  );
};

export default ColorInput;
