import { ChangeEvent } from "react";

import BorderRadius from "../inputs/inputModifiers/BorderRadius";
import DropdownOptions from "../inputs/inputModifiers/DropdownOptions";
import { IInputProps } from "../inputs/inputModifiers/types";
import { ICustomInput } from "../inputs/resources";

interface IInputModifiersList {
  input: ICustomInput;
  onChangeModifiers: (props: IInputProps) => void;
}
/**
 * Renders all available options for a specific input type
 */
const InputModifiersList = ({
  input,
  onChangeModifiers,
}: IInputModifiersList) => {
  switch (input.type) {
    case "Dropdown":
      return (
        <>
          <BorderRadius
            radius={input.styles?.borderRadius || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChangeModifiers({
                ...input,
                styles: {
                  ...input.styles,
                  borderRadius: Number(e.target.value),
                },
              });
            }}
          />
          <DropdownOptions
            onChange={(options) => {
              onChangeModifiers({ ...input, options });
            }}
          />
        </>
      );
    case "Text":
      return (
        <BorderRadius
          radius={input.styles?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeModifiers({
              ...input,
              styles: { ...input.styles, borderRadius: Number(e.target.value) },
            });
          }}
        />
      );
    case "Number":
      return (
        <BorderRadius
          radius={input.styles?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeModifiers({
              ...input,
              styles: { ...input.styles, borderRadius: Number(e.target.value) },
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
            onChangeModifiers({
              ...input.styles,
              styles: { ...input.styles, borderRadius: Number(e.target.value) },
            });
          }}
        />
      );
    default:
      return null;
  }
};
export default InputModifiersList;
