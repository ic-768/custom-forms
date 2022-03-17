import { ChangeEvent } from "react";

import {
  FontSize,
  BorderRadius,
  BoxShadowColor,
  DropdownOptions,
  Height,
} from "./inputModifiers";

import { ICustomInput } from "../inputs/CustomInput";
import { IInputStyles } from "./inputModifiers";

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
  const onChangeStyles = <
    K extends keyof IInputStyles,
    V extends IInputStyles[K]
  >(
    style: K,
    value: V
  ) =>
    onChangeModifiers({
      ...input,
      styles: {
        ...input.styles,
        [style]: value,
      },
    });

  const FontSizeModifier = (
    <FontSize
      fontSize={input.styles?.fontSize || "14px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyles("fontSize", `${e.target.value}px`);
      }}
    />
  );

  const HeightModifier = (
    <Height
      height={input.styles?.height || "33px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyles("height", `${e.target.value}px`);
      }}
    />
  );

  const BorderRadiusModifier = (
    <BorderRadius
      radius={input.styles?.borderRadius || "5px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyles("borderRadius", `${e.target.value}px`);
      }}
    />
  );

  const BoxShadowColorModifier = (
    <BoxShadowColor
      /* get color from input styles boxShadow */
      color={input.styles?.boxShadow?.split(" ")[0] || "rgb(0,0,0,0)"}
      onChange={(c) => {
        const rgba = c.rgb;
        onChangeStyles(
          "boxShadow",
          `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a}) 0 0 1px 0`
        );
      }}
    />
  );

  // box shadow color breaks if extracted like this

  switch (input.type) {
    case "Dropdown":
      return (
        <>
          <DropdownOptions
            onChange={(options) => {
              onChangeModifiers({ ...input, options });
            }}
          />
          {BorderRadiusModifier}
          {BoxShadowColorModifier}
        </>
      );
    case "Text":
      return (
        <>
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BoxShadowColorModifier}
        </>
      );
    case "Number":
      return (
        <>
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BoxShadowColorModifier}
        </>
      );
    case "Date":
      return null;
    case "Time":
      return null;
    case "Multiple Choice":
      return <>{BorderRadiusModifier}</>;
    default:
      return null;
  }
};
export default InputModifiersList;
