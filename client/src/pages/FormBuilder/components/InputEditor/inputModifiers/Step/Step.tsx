import { ChangeEvent } from "react";

import { NumberInput } from "../../../../../../components/inputs/inputComponents";

interface IStep {
  step?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Step = ({ step, onChange }: IStep) => {
  const stepValue = (step || 0).toString();

  return (
    <NumberInput
      title="Step"
      min={0}
      subtitle="How granular the sliding motion should be"
      value={stepValue}
      onChange={onChange}
    />
  );
};
export default Step;
