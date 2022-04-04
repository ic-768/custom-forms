import { ChangeEvent } from "react";

import { NumberInput } from "../../../../../../components/inputs/inputComponents";

import "./MinMax.scss";

interface IMinMax {
  min?: number;
  max?: number;
  onChangeMin: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeMax: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MinMax = ({ min, max, onChangeMin, onChangeMax }: IMinMax) => (
  <div className="min-max-modifier-container">
    <NumberInput label="Min" value={min} onChange={onChangeMin} />
    <NumberInput label="Max" value={max} onChange={onChangeMax} />
  </div>
);

export default MinMax;
