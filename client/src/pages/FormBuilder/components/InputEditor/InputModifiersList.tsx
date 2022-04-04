import { ChangeEvent, CSSProperties } from "react";

import {
  FontSize,
  BorderRadius,
  BorderColor,
  DropdownOptions,
  Height,
  Label,
  MinMax,
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
  const onChangeStyle = <
    K extends keyof CSSProperties,
    V extends CSSProperties[K]
  >(
    style: K,
    value: V
  ) =>
    onChangeModifiers({
      ...input,
      style: {
        ...input.style,
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
      fontSize={(input.style?.fontSize as string) || "14px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
          onChangeStyle("fontSize", `${e.target.value}px`);
        }
      }}
    />
  );

  const HeightModifier = (
    <Height
      height={(input.style?.height as string) || "33px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
          onChangeStyle("height", `${e.target.value}px`);
        }
      }}
    />
  );

  const BorderRadiusModifier = (
    <BorderRadius
      radius={(input.style?.borderRadius as string) || "5px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)) {
          onChangeStyle("borderRadius", `${e.target.value}px`);
        }
      }}
    />
  );

  const BorderColorModifier = (
    <BorderColor
      /* get color from input style borderColor */
      color={input.style?.borderColor?.split(" ")[0] || "rgb(0,0,0,0)"}
      onChange={(c) => {
        const rgba = c.rgb;
        onChangeStyle(
          "borderColor",
          `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a}`
        );
      }}
    />
  );

  switch (input.type) {
    case "Dropdown":
      return (
        <>
          {LabelModifier}
          {HeightModifier}
          {BorderColorModifier}
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
          {LabelModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
        </>
      );
    case "Number":
      return (
        <>
          {LabelModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
          <MinMax
            min={input.min}
            max={input.max}
            onChangeMin={(e) =>
              onChangeModifiers({ ...input, min: Number(e.target.value) })
            }
            onChangeMax={(e) =>
              onChangeModifiers({ ...input, max: Number(e.target.value) })
            }
          />
        </>
      );
    case "Date":
      return (
        <>
          {LabelModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
        </>
      );
    case "Time":
      return (
        <>
          {LabelModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
        </>
      );
    case "Multiple Choice":
      return <>{BorderRadiusModifier}</>;
    default:
      return null;
  }
};
export default InputModifiersList;
