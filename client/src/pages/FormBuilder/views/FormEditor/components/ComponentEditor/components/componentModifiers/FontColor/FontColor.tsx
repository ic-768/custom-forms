import { ReactElement } from "react";
import { ColorChangeHandler } from "react-color";

import ColorInput from "components/inputs/inputComponents/ColorInput";

interface FontColorProps {
  fontColor: string;
  onChange: ColorChangeHandler;
}

const FontColor = ({ fontColor, onChange }: FontColorProps): ReactElement => (
  <ColorInput
    title="Input text color"
    subtitle="The font color for the input text"
    value={fontColor}
    onChange={onChange}
  />
);
export default FontColor;
