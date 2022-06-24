import { ReactElement } from "react";
import { DropdownInput } from "components/inputs/inputComponents";

const borderWidths = {
  Box: "1px 1px 1px 1px",
  Underline: "0px 0px 1px 0px",
  None: "0px 0px 0px 0px",
} as const;

type BorderStyle = keyof typeof borderWidths;
export type BorderWidth = typeof borderWidths[BorderStyle];

interface BorderType {
  borderWidth: BorderWidth;
  onChange: (borderType: BorderWidth) => void;
}

/**
 * Allows user to choose which border sides will be colored
 */
const BorderType = ({ borderWidth, onChange }: BorderType): ReactElement => {
  const borderTypeForWidth = (): BorderStyle => {
    switch (borderWidth) {
      case borderWidths.Box:
        return "Box";
      case borderWidths.Underline:
        return "Underline";
      default:
        return "None";
    }
  };

  // Parse the other way
  const borderWidthForType = (type: string): BorderWidth => {
    switch (type) {
      case "Box":
        return borderWidths.Box;
      case "Underline":
        return borderWidths.Underline;
      default:
        return borderWidths.None;
    }
  };

  const borderType = borderTypeForWidth();

  return (
    <DropdownInput
      title="Border Type"
      subtitle="Choose a border type"
      value={borderType}
      options={[
        { label: "Box", value: "Box" },
        { label: "Underline", value: "Underline" },
        { label: "None", value: "None" },
      ]}
      placeholder="Border type"
      onChange={(t): void => {
        onChange(borderWidthForType(t));
      }}
    />
  );
};

export default BorderType;
