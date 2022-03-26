import { ChangeEvent, CSSProperties } from "react";

import {
  FontSize,
  BorderRadius,
  BoxShadowColor,
  DropdownOptions,
  Height,
  Label,
} from "./inputModifiers";

import { ICustomInput } from "../../../../components/inputs/CustomInput";

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
    K extends keyof CSSProperties,
    V extends CSSProperties[K]
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

  const LabelModifier = (
    <Label
      label={input.label || ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeModifiers({ ...input, label: e.target.value });
      }}
    />
  );
  const FontSizeModifier = (
    <FontSize
      fontSize={(input.styles?.fontSize as string) || "14px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
          onChangeStyles("fontSize", `${e.target.value}px`);
        }
      }}
    />
  );

  const HeightModifier = (
    <Height
      height={(input.styles?.height as string) || "33px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
          onChangeStyles("height", `${e.target.value}px`);
        }
      }}
    />
  );

  const BorderRadiusModifier = (
    <BorderRadius
      radius={(input.styles?.borderRadius as string) || "5px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
          onChangeStyles("borderRadius", `${e.target.value}px`);
        }
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
          {LabelModifier}
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
      return (
        <>
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BoxShadowColorModifier}
        </>
      );
    case "Time":
      return (
        <>
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BoxShadowColorModifier}
        </>
      );
    case "Multiple Choice":
      return <>{BorderRadiusModifier}</>;
    default:
      return null;
  }
};
export default InputModifiersList;
