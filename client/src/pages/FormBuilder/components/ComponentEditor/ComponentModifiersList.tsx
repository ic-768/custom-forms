import { ChangeEvent, CSSProperties } from "react";

import {
  FontSize,
  BorderRadius,
  BorderColor,
  BorderType,
  DropdownOptions,
  Height,
  Title,
  MinMax,
  Step,
  MultipleChoiceOptions,
  Margin,
} from "./componentModifiers";
import { IFormComponent } from "../FormComponent";

interface IComponentModifiersList {
  component: IFormComponent;
  onChangeModifiers: (props: IFormComponent) => void;
}

/**
 * Renders all available options for a specific input type
 */
const ComponentModifiersList = ({
  component,
  onChangeModifiers,
}: IComponentModifiersList) => {
  // changes (or adds if doesn't exist) a specific style property
  const onChangeStyle = <
    K extends keyof CSSProperties,
    V extends CSSProperties[K]
  >(
    style: K,
    value: V
  ) =>
    onChangeModifiers({
      ...component,
      style: {
        ...component.style,
        [style]: value,
      },
    });

  const TitleModifier = (
    <Title
      title={component.title || ""}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeModifiers({ ...component, title: e.target.value });
      }}
    />
  );
  const FontSizeModifier = (
    <FontSize
      fontSize={(component.style?.fontSize as string) || "14px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyle("fontSize", `${e.target.value || 0}px`);
      }}
    />
  );

  const HeightModifier = (
    <Height
      height={(component.style?.height as string) || "33px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyle("height", `${e.target.value || 0}px`);
      }}
    />
  );

  const BorderRadiusModifier = (
    <BorderRadius
      radius={(component.style?.borderRadius as string) || "5px"}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChangeStyle("borderRadius", `${e.target.value || 0}px`);
      }}
    />
  );

  const BorderColorModifier = (
    <BorderColor
      /* get color from component style borderColor */
      color={component.style?.borderColor?.split(" ")[0] || "rgb(0,0,0,0)"}
      onChange={(c) => {
        const rgba = c.rgb;
        onChangeStyle(
          "borderColor",
          `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        );
      }}
    />
  );

  const BorderTypeModifier = (
    <BorderType
      borderWidth={
        (component.style?.borderWidth as string) || "1px 1px 1px 1px"
      }
      onChange={(t) => {
        onChangeStyle("borderWidth", t);
      }}
    />
  );

  const MarginModifier = (
    <Margin
      marginTop={(component.style?.marginTop as string) || "0px"}
      marginBottom={(component.style?.marginBottom as string) || "0px"}
      onChangeTopMargin={(e) => {
        onChangeStyle("marginTop", `${e.target.value || 0}px`);
      }}
      onChangeBottomMargin={(e) => {
        onChangeStyle("marginBottom", `${e.target.value || 0}px`);
      }}
    />
  );

  switch (component.type) {
    case "Text-Description":
      return null;
    case "Dropdown":
      return (
        <>
          {TitleModifier}
          {HeightModifier}
          {BorderColorModifier}
          {BorderTypeModifier}
          {MarginModifier}
          <DropdownOptions
            onChange={(options) => {
              onChangeModifiers({ ...component, options });
            }}
          />
        </>
      );
    case "Text":
      return (
        <>
          {TitleModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
          {BorderTypeModifier}
          {MarginModifier}
        </>
      );
    case "Number":
      return (
        <>
          {TitleModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
          {BorderTypeModifier}
          {MarginModifier}
          <MinMax
            min={component.min}
            max={component.max}
            onChangeMin={(e) =>
              onChangeModifiers({ ...component, min: Number(e.target.value) })
            }
            onChangeMax={(e) =>
              onChangeModifiers({ ...component, max: Number(e.target.value) })
            }
          />
        </>
      );
    case "Date":
      return (
        <>
          {TitleModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
          {BorderTypeModifier}
          {MarginModifier}
        </>
      );
    case "Time":
      return (
        <>
          {TitleModifier}
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
          {BorderTypeModifier}
          {MarginModifier}
        </>
      );
    case "Multiple Choice":
      return (
        <>
          {TitleModifier}
          <MultipleChoiceOptions
            onChange={(choices) => {
              onChangeModifiers({ ...component, choices });
            }}
          />
          {FontSizeModifier}
          {BorderRadiusModifier}
          {BorderColorModifier}
          {BorderTypeModifier}
          {MarginModifier}
        </>
      );
    case "Range":
      return (
        <>
          {TitleModifier}
          {HeightModifier}
          {MarginModifier}
          <MinMax
            min={component.min}
            max={component.max}
            onChangeMin={(e) => {
              onChangeModifiers({ ...component, min: Number(e.target.value) });
            }}
            onChangeMax={(e) =>
              onChangeModifiers({ ...component, max: Number(e.target.value) })
            }
          />
          <Step
            step={component.step}
            onChange={(e) => {
              onChangeModifiers({ ...component, step: Number(e.target.value) });
            }}
          />
        </>
      );

    default:
      return null;
  }
};
export default ComponentModifiersList;
