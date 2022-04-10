import { ChangeEvent } from "react";

import { NumberInput } from "../../../../../../components/inputs/inputComponents";

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
    <div className="min-max-modifier-container">
      <NumberInput label="Min" value={minValue} onChange={onChangeMin} />
      <NumberInput label="Max" value={maxValue} onChange={onChangeMax} />
    </div>
  );
};

export default MinMax;
