import { ChangeEvent } from "react";
import { NumberInput } from "../../../../../../components/inputs/inputComponents";

interface IHeight {
  height: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Height = ({ height, onChange }: IHeight) => {
  const heightValue = Number(height.match(/\d+/)![0]);

  return <NumberInput label="Height" value={heightValue} onChange={onChange} />;
};

export default Height;
