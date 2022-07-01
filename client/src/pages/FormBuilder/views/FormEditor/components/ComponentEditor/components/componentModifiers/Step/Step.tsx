import { ChangeEventHandler, ReactElement } from "react";

import { NumberInput } from "components/inputs/inputComponents";

interface StepProps {
  step?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Step = ({ step, onChange }: StepProps): ReactElement => {
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
