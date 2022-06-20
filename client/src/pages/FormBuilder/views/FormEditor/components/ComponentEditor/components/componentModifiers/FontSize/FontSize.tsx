import { ChangeEventHandler, ReactElement } from "react";

import { NumberInput } from "components/inputs/inputComponents";

interface IFontSize {
  fontSize: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FontSize = ({ fontSize, onChange }: IFontSize): ReactElement => {
  const fontSizeValue = Number(fontSize.match(/\d+/)![0]).toString();

  return (
    <NumberInput
      title="Font size"
      subtitle="The size of the input text"
      value={fontSizeValue}
      onChange={onChange}
    />
  );
};
export default FontSize;
