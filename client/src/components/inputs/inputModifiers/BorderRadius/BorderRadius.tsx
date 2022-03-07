import { ChangeEvent } from "react";
import NumberInput from "../../inputComponents/NumberInput";

interface IBorderRadius {
  radius: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BorderRadius = ({ radius, onChange }: IBorderRadius) => (
  <NumberInput
    min={0}
    max={20}
    value={radius}
    onChange={onChange}
    label="Add a border radius"
    placeholder="Add a border radius"
  />
);

export default BorderRadius;
