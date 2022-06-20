import { ChangeEvent, CSSProperties, ReactElement } from "react";

import {
  FontColor,
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
  TextBody,
} from "../componentModifiers";
import { BorderWidth } from "../componentModifiers/BorderType/BorderType";
import { IFormComponent } from "components/FormComponent";

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
}: IComponentModifiersList): ReactElement | null => {
  // changes (or adds if doesn't exist) a specific style property
  const onChangeStyle = <
    K extends keyof CSSProperties,
    V extends CSSProperties[K]
  >(
    style: K,
    value: V
  ): void =>
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
      onChange={(e: ChangeEvent<HTMLInputElement>): void => {
        onChangeModifiers({ ...component, title: e.target.value });
      }}
    />
  );

  const FontSizeModifier = (
    <FontSize
      fontSize={(component.style?.fontSize as string) || "14px"}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => {
        onChangeStyle("fontSize", `${e.target.value || 0}px`);
      }}
    />
  );

  const FontColorModifier = (
    <FontColor
      fontColor={component.style?.color as string}
      onChange={(c): void => {
        onChangeStyle("color", `rgba(${Object.values(c.rgb)})`);
      }}
    />
  );

  const HeightModifier = (
    <Height
      height={(component.style?.height as string) || "33px"}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => {
        onChangeStyle("height", `${e.target.value || 0}px`);
      }}
    />
  );

  const BorderRadiusModifier = (
    <BorderRadius
      radius={(component.style?.borderRadius as string) || "5px"}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => {
        onChangeStyle("borderRadius", `${e.target.value || 0}px`);
      }}
    />
  );

  const BorderColorModifier = (
    <BorderColor
      /* get color from component style borderColor */
      color={component.style?.borderColor?.split(" ")[0] || "rgb(0,0,0,0)"}
      onChange={(c): void => {
        onChangeStyle("borderColor", `rgba(${Object.values(c.rgb)})`);
      }}
    />
  );

  const BorderTypeModifier = (
    <BorderType
      borderWidth={
        (component.style?.borderWidth as BorderWidth) || "1px 1px 1px 1px"
      }
      onChange={(t): void => {
        onChangeStyle("borderWidth", t);
      }}
    />
  );

  const MarginModifier = (
    <Margin
      marginTop={(component.style?.marginTop as string) || "0px"}
      marginBottom={(component.style?.marginBottom as string) || "0px"}
      onChangeTopMargin={(e): void => {
        onChangeStyle("marginTop", `${e.target.value || 0}px`);
      }}
      onChangeBottomMargin={(e): void => {
        onChangeStyle("marginBottom", `${e.target.value || 0}px`);
      }}
    />
  );

  switch (component.type) {
    case "Text-Description":
      return (
        <>
          {TitleModifier}
          <TextBody
            onChange={(e): void => {
              onChangeModifiers({ ...component, text: e.target.value });
            }}
          />
          {FontSizeModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {BorderColorModifier}
          {MarginModifier}
        </>
      );
    case "Dropdown":
      return (
        <>
          {TitleModifier}
          {HeightModifier}
          {BorderColorModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {MarginModifier}
          <DropdownOptions
            onChange={(options): void => {
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
          {FontColorModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {BorderColorModifier}
          {MarginModifier}
        </>
      );
    case "Number":
      return (
        <>
          {TitleModifier}
          {FontSizeModifier}
          {FontColorModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {BorderColorModifier}
          {MarginModifier}
          <MinMax
            min={component.min}
            max={component.max}
            onChangeMin={(e): void =>
              onChangeModifiers({ ...component, min: Number(e.target.value) })
            }
            onChangeMax={(e): void =>
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
          {FontColorModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {BorderColorModifier}
          {MarginModifier}
        </>
      );
    case "Time":
      return (
        <>
          {TitleModifier}
          {FontSizeModifier}
          {FontColorModifier}
          {HeightModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {BorderColorModifier}
          {MarginModifier}
        </>
      );
    case "Multiple Choice":
      return (
        <>
          {TitleModifier}
          <MultipleChoiceOptions
            onChange={(choices): void => {
              onChangeModifiers({ ...component, choices });
            }}
          />
          {FontSizeModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {BorderColorModifier}
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
            onChangeMin={(e): void => {
              onChangeModifiers({ ...component, min: Number(e.target.value) });
            }}
            onChangeMax={(e): void =>
              onChangeModifiers({ ...component, max: Number(e.target.value) })
            }
          />
          <Step
            step={component.step}
            onChange={(e): void => {
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
