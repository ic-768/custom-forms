import { ChangeEvent } from "react";

import { NumberInput } from "../../../../../../../components/inputs/inputComponents";
import InputContainer from "../../../../../../../components/inputs/InputContainer";

import "./MinMax.scss";

interface IMinMax {
  min?: number;
  max?: number;
  onChangeMin: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeMax: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MinMax = ({ min, max, onChangeMin, onChangeMax }: IMinMax) => {
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
