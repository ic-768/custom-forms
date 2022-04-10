import { ChangeEvent, CSSProperties } from "react";

import {
  FontSize,
  BorderRadius,
  BorderColor,
  DropdownOptions,
  Height,
  Label,
  MinMax,
  Step,
  MultipleChoiceOptions,
  Margin,
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
        onChangeStyle("fontSize", `${e.target.value || 0}px`);
      }}
    />
  );

  const HeightModifier = (
    <Height
      height={(input.style?.height as string) || "33px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyle("height", `${e.target.value || 0}px`);
      }}
    />
  );

  const BorderRadiusModifier = (
    <BorderRadius
      radius={(input.style?.borderRadius as string) || "5px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyle("borderRadius", `${e.target.value || 0}px`);
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
          `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        );
      }}
    />
  );

  const MarginModifier = (
    <Margin
      marginTop={(input.style?.marginTop as string) || "0px"}
      marginBottom={(input.style?.marginBottom as string) || "0px"}
      onChangeTopMargin={(e) => {
        onChangeStyle("marginTop", `${e.target.value || 0}px`);
      }}
      onChangeBottomMargin={(e) => {
        onChangeStyle("marginBottom", `${e.target.value || 0}px`);
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
          {MarginModifier}
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
          {MarginModifier}
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
          {MarginModifier}
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
          {MarginModifier}
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
          {MarginModifier}
        </>
      );
    case "Multiple Choice":
      return (
        <>
          {LabelModifier}
          <MultipleChoiceOptions
            onChange={(choices) => {
              onChangeModifiers({ ...input, choices });
            }}
          />
          {FontSizeModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
          {MarginModifier}
        </>
      );
    case "Range":
      return (
        <>
          {LabelModifier}
          {HeightModifier}
          {MarginModifier}
          <MinMax
            min={input.min}
            max={input.max}
            onChangeMin={(e) => {
              onChangeModifiers({ ...input, min: Number(e.target.value) });
            }}
            onChangeMax={(e) =>
              onChangeModifiers({ ...input, max: Number(e.target.value) })
            }
          />
          <Step
            step={input.step}
            onChange={(e) => {
              onChangeModifiers({ ...input, step: Number(e.target.value) });
            }}
          />
        </>
      );

    default:
      return null;
  }
};
export default InputModifiersList;
