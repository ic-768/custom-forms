import React, { ChangeEvent } from "react";

import BorderRadius from "../inputs/inputModifiers/BorderRadius";
import { IInputStyles, IInputProps } from "../inputs/inputModifiers/types";
import { ICustomInput } from "../inputs/resources";

interface IInputModifiersList {
  input: ICustomInput;
  onChangeStyles: (styles: IInputStyles) => void;
  onChangeProps?: (props: IInputProps) => void;
}
/**
 * Renders all available options for a specific input type
 */
const InputModifiersList = ({
  input,
  onChangeStyles,
  onChangeProps,
}: IInputModifiersList) => {
  switch (input.type) {
    case "Dropdown":
      return (
        <>
          <BorderRadius
            radius={input.styles?.borderRadius || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChangeStyles({
                ...input.styles,
                borderRadius: Number(e.target.value),
              });
            }}
          />
        </>
      );
    case "Text":
      return (
        <BorderRadius
          radius={input.styles?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles({
              ...input.styles,
              borderRadius: Number(e.target.value),
            });
          }}
        />
      );
    case "Number":
      return (
        <BorderRadius
          radius={input.styles?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles({
              ...input.styles,
              borderRadius: Number(e.target.value),
            });
          }}
        />
      );
    case "Date":
      return null;
    case "Time":
      return null;
    case "Multiple Choice":
      return (
        <BorderRadius
          radius={input.styles?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles({
              ...input.styles,
              borderRadius: Number(e.target.value),
            });
          }}
        />
      );
    default:
      return null;
  }
};
export default InputModifiersList;
