import { ColorChangeHandler } from "react-color";

import ColorInput from "components/inputs/inputComponents/ColorInput";

interface IFontColor {
  fontColor: string;
  onChange: ColorChangeHandler;
}

const FontColor = ({ fontColor, onChange }: IFontColor) => (
  <ColorInput
    title="Input text color"
    subtitle="The font color for the input text"
    value={fontColor}
    onChange={onChange}
  />
);
export default FontColor;
