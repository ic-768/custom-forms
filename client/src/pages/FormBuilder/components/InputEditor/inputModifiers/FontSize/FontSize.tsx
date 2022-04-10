import { ChangeEvent } from "react";
import { NumberInput } from "../../../../../../components/inputs/inputComponents";

interface IFontSize {
  fontSize: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FontSize = ({ fontSize, onChange }: IFontSize) => {
  const fontSizeValue = Number(fontSize.match(/\d+/)![0]).toString();

  return (
    <NumberInput label="Font size" value={fontSizeValue} onChange={onChange} />
  );
};
export default FontSize;
