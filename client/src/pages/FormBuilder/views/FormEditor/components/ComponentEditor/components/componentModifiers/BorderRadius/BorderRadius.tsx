import { ChangeEvent } from "react";

import { NumberInput } from "../../../../../../../../../components/inputs/inputComponents";

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
      value={borderRadiusValue.toString()}
      onChange={onChange}
      title="Border radius"
      subtitle="Set the roundness of the input corners"
    />
  );
};

export default BorderRadius;
