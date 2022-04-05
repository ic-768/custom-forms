import { ChangeEvent } from "react";

import { NumberInput } from "../../../../../../components/inputs/inputComponents";

interface IStep {
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Step = ({ step, onChange }: IStep) => (
  <NumberInput label="Step" value={step} onChange={onChange} />
);
export default Step;
