import React, { ChangeEvent } from "react";

import BorderRadius from "../inputs/inputModifiers/BorderRadius";
import { IInputModifiers } from "../inputs/inputModifiers/types";
import { inputTypes } from "../inputs/resources";

interface IInputModifiersList {
  input: typeof inputTypes[number];
  onChange: (modifiers: IInputModifiers) => void;
  modifiers?: IInputModifiers;
}
/**
 * Renders all available options for a specific input type
 */
const InputModifiersList = ({
  input,
  onChange,
  modifiers,
}: IInputModifiersList) => {
  switch (input) {
    case inputTypes[0]:
      return (
        <BorderRadius
          radius={Number(modifiers?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...modifiers, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[1]:
      return (
        <BorderRadius
          radius={Number(modifiers?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...modifiers, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[2]:
      return (
        <BorderRadius
          radius={Number(modifiers?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...modifiers, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[3]:
      return null;
    case inputTypes[4]:
      return null;
    case inputTypes[5]:
      return (
        <BorderRadius
          radius={Number(modifiers?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange({ ...modifiers, borderRadius: Number(e.target.value) });
          }}
        />
      );
    default:
      return null;
  }
};
export default InputModifiersList;
