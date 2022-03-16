import { ChangeEvent } from "react";

import BorderRadius from "../inputs/inputModifiers/BorderRadius";
import DropdownOptions from "../inputs/inputModifiers/DropdownOptions";
import { ICustomInput } from "../inputs/CustomInput";
import BoxShadowColor from "../inputs/inputModifiers/BoxShadowColor";
import { IInputStyles } from "../inputs/inputModifiers/types";

interface IInputModifiersList {
  input: ICustomInput;
  onChangeModifiers: (props: ICustomInput) => void;
}
/**
 * Renders all available options for a specific input type
 */
const InputModifiersList = ({
  input,
  onChangeModifiers,
}: IInputModifiersList) => {
  // changes (or adds if doesn't exist) a specific style property
  const onChangeStyles = (property: keyof IInputStyles, value: any) => {
    onChangeModifiers({
      ...input,
      styles: {
        ...input.styles,
        [property]: value,
      },
    });
  };

  switch (input.type) {
    case "Dropdown":
      return (
        <>
          <BorderRadius
            radius={input.styles?.borderRadius || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChangeStyles("borderRadius", Number(e.target.value));
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
        <>
          <BorderRadius
            radius={input.styles?.borderRadius || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChangeStyles("borderRadius", Number(e.target.value));
            }}
          />
          <BoxShadowColor
            /* get color from input styles boxShadow */
            color={input.styles?.boxShadow?.split(")")[0] || "rgb(0,0,0,0)"}
            onChange={(c) => {
              const rgba = c.rgb;
              onChangeStyles(
                "boxShadow",
                `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a}) 0 0 1px 0`
              );
            }}
          />
        </>
      );
    case "Number":
      return (
        <BorderRadius
          radius={input.styles?.borderRadius || 0}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChangeStyles("borderRadius", Number(e.target.value));
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
            onChangeStyles("borderRadius", Number(e.target.value));
          }}
        />
      );
    default:
      return null;
  }
};
export default InputModifiersList;
