import { ReactElement } from "react";
import { ColorChangeHandler } from "react-color";

import ColorInput from "components/inputs/inputComponents/ColorInput";

interface IBorderColor {
  color: string;
  onChange: ColorChangeHandler;
}

const BorderColor = ({ color, onChange }: IBorderColor): ReactElement => (
  <ColorInput
    title="Border color"
    subtitle="Set the color for the borders of the input"
    value={color}
    onChange={onChange}
  />
);
export default BorderColor;
