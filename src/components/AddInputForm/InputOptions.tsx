import React, { ChangeEvent } from "react";

import BorderRadius from "../options/BorderRadius";
import { inputTypes } from "../inputs/resources";
import { IInputOption } from "../options/types";

/**
 * Renders all available options for a specific input type
 */
const InputOptions = ({
  input,
  options,
  onChange,
}: {
  input: typeof inputTypes[number];
  options: IInputOption | null;
  onChange: (options: IInputOption) => void;
}) => {
  switch (input) {
    case inputTypes[0]:
      return (
        <BorderRadius
          radius={options?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...options, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[1]:
      return (
        <BorderRadius
          radius={options?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...options, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[2]:
      return (
        <BorderRadius
          radius={options?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...options, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[3]:
      return (
        <BorderRadius
          radius={options?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...options, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[4]:
      return (
        <BorderRadius
          radius={options?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...options, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[5]:
      return (
        <BorderRadius
          radius={options?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...options, borderRadius: Number(e.target.value) });
          }}
        />
      );
    default:
      return null;
  }
};
export default InputOptions;
