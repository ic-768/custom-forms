import { ChangeEvent, ReactElement } from "react";

import {
  FontColor,
  FontSize,
  BorderRadius,
  BorderColor,
  BorderType,
  DropdownOptions,
  Height,
  Title,
  TitleColor,
  MinMax,
  Step,
  MultipleChoiceOptions,
  Margin,
  TextBody,
  BackgroundColor,
} from "../componentModifiers";
import { BorderWidth } from "../componentModifiers/BorderType/BorderType";
import { FormComponentProps } from "components/FormComponent";
import { CustomInputStyles } from "resources/shared";

interface ComponentModifiersListProps {
  component: FormComponentProps;
  onChangeModifiers: (props: FormComponentProps) => void;
}

/**
 * Renders all available options for a specific input type
 */
const ComponentModifiersList = ({
  component,
  onChangeModifiers,
}: ComponentModifiersListProps): ReactElement | null => {
  // changes (or adds if doesn't exist) a specific style property
  const onChangeStyle = <
    K extends keyof CustomInputStyles,
    V extends CustomInputStyles[K]
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

  const TitleColorModifier = (
    <TitleColor
      titleColor={component.style?.titleColor as string}
      onChange={(c): void => {
        onChangeStyle("titleColor", `rgba(${Object.values(c.rgb)})`);
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

  const BackgroundColorModifier = (
    <BackgroundColor
      color={component.style?.backgroundColor as string}
      onChange={(c): void => {
        onChangeStyle("backgroundColor", `rgba(${Object.values(c.rgb)})`);
      }}
    />
  );

  switch (component.type) {
    case "Text-Description":
      return (
        <>
          {TitleModifier}
          {TitleColorModifier}
          <TextBody
            onChange={(e): void => {
              onChangeModifiers({ ...component, text: e.target.value });
            }}
          />
          {FontSizeModifier}
          {HeightModifier}
          {BackgroundColorModifier}
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
          {TitleColorModifier}
          {HeightModifier}
          {BackgroundColorModifier}
          {BorderColorModifier}
          {BorderRadiusModifier}
          {BorderTypeModifier}
          {MarginModifier}
          <DropdownOptions
            options={component.options}
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
          {TitleColorModifier}
          {FontSizeModifier}
          {FontColorModifier}
          {HeightModifier}
          {BackgroundColorModifier}
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
          {TitleColorModifier}
          {FontSizeModifier}
          {FontColorModifier}
          {HeightModifier}
          {BackgroundColorModifier}
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
          {TitleColorModifier}
          {FontSizeModifier}
          {FontColorModifier}
          {HeightModifier}
          {BackgroundColorModifier}
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
          {TitleColorModifier}
          {FontSizeModifier}
          {FontColorModifier}
          {HeightModifier}
          {BackgroundColorModifier}
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
          {TitleColorModifier}
          <MultipleChoiceOptions
            options={component.choices}
            onChange={(choices): void => {
              onChangeModifiers({ ...component, choices });
            }}
          />
          {FontSizeModifier}
          {BackgroundColorModifier}
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
          {TitleColorModifier}
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
