import { ChangeEventHandler, ReactElement } from "react";

import { NumberInput } from "components/inputs/inputComponents";

interface HeightProps {
  height: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Height = ({ height, onChange }: HeightProps): ReactElement => {
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
