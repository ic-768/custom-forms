import { ChangeEvent } from "react";
import NumberInput from "../../../inputs/inputComponents/NumberInput";

interface IBorderRadius {
  radius: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BorderRadius = ({ radius, onChange }: IBorderRadius) => {
  const borderRadiusValue = Number(radius.match(/\d+/)![0]);

  return (
    <NumberInput
      min={0}
      max={20}
      value={borderRadiusValue}
      onChange={onChange}
      label="Border radius"
    />
  );
};

export default BorderRadius;
