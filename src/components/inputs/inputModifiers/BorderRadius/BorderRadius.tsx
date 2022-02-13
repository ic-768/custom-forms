import React, { ChangeEvent } from "react";
import { NumberInput } from "../../../inputs/inputComponents";

const BorderRadius = ({
  radius,
  onChange,
}: {
  radius: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <NumberInput
    min={0}
    max={20}
    value={radius}
    onChange={onChange}
    label="Add a border radius"
    placeholder="Add a border radius"
  />
);

export default BorderRadius;
