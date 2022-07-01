import { ReactElement } from "react";
import { ColorChangeHandler } from "react-color";

import ColorInput from "components/inputs/inputComponents/ColorInput";

interface BackgroundColorProps {
  color: string;
  onChange: ColorChangeHandler;
}

const BackgroundColor = ({
  color,
  onChange,
}: BackgroundColorProps): ReactElement => (
  <ColorInput
    title="Background color"
    subtitle="Set the color for the input background"
    value={color}
    onChange={onChange}
  />
);
export default BackgroundColor;
