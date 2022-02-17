import React, { ChangeEvent } from "react";

import BorderRadius from "../inputs/inputModifiers/BorderRadius";
import { IInputStyles, IInputProps } from "../inputs/inputModifiers/types";
import { inputTypes } from "../inputs/resources";

interface IInputModifiersList {
  input: typeof inputTypes[number];
  onChangeStyles: (styles: IInputStyles) => void;
  onChangeProps?: (props: IInputProps) => void;
  styles?: IInputStyles;
  props?: IInputProps;
}
/**
 * Renders all available options for a specific input type
 */
const InputModifiersList = ({
  input,
  onChangeStyles,
  onChangeProps,
  styles,
  props, //  TODO use to change things like dropdown options etc.
}: IInputModifiersList) => {
  switch (input) {
    case inputTypes[0]:
      return (
        <BorderRadius
          radius={Number(styles?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles({ ...styles, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[1]:
      return (
        <BorderRadius
          radius={Number(styles?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles({ ...styles, borderRadius: Number(e.target.value) });
          }}
        />
      );
    case inputTypes[2]:
      return (
        <BorderRadius
          radius={Number(styles?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles({ ...styles, borderRadius: Number(e.target.value) });
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
          radius={Number(styles?.borderRadius)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles({ ...styles, borderRadius: Number(e.target.value) });
          }}
        />
      );
    default:
      return null;
  }
};
export default InputModifiersList;
