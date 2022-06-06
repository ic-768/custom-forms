import { ChangeEventHandler } from "react";

import { NumberInput } from "components/inputs/inputComponents";

interface IHeight {
  height: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Height = ({ height, onChange }: IHeight) => {
  const heightValue = Number(height.match(/\d+/)![0]).toString();

  return (
    <NumberInput
      title="Height"
      subtitle="Set a fixed height for the input"
      value={heightValue}
      onChange={onChange}
    />
  );
};

export default Height;
