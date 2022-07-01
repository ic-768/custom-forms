import { ReactElement } from "react";
import { ColorChangeHandler } from "react-color";

import ColorInput from "components/inputs/inputComponents/ColorInput";

interface TitleColorProps {
  titleColor: string;
  onChange: ColorChangeHandler;
}

const TitleColor = ({
  titleColor,
  onChange,
}: TitleColorProps): ReactElement => (
  <ColorInput
    title="Title color"
    subtitle="The font color for the input title"
    value={titleColor}
    onChange={onChange}
  />
);

export default TitleColor;
