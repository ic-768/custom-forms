import { ChangeEventHandler, ReactElement } from "react";

import { NumberInput } from "components/inputs/inputComponents";
import InputContainer from "components/inputs/InputContainer";

import "./MinMax.scss";

interface MinMaxProps {
  min?: number;
  max?: number;
  onChangeMin: ChangeEventHandler<HTMLInputElement>;
  onChangeMax: ChangeEventHandler<HTMLInputElement>;
}

const MinMax = ({
  min,
  max,
  onChangeMin,
  onChangeMax,
}: MinMaxProps): ReactElement => {
  const minValue = (min || 0).toString();
  const maxValue = (max || 0).toString();

  return (
    <InputContainer
      title="Min / Max"
      subtitle="The minimum and maximum selectable values for the input"
      component={
        <div className="min-max-modifier-container">
          <NumberInput value={minValue} onChange={onChangeMin} />
          <NumberInput value={maxValue} onChange={onChangeMax} />
        </div>
      }
    />
  );
};

export default MinMax;
