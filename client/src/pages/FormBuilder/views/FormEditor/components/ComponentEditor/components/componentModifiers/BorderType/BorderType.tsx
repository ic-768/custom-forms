import { DropdownInput } from "../../../../../../../components/inputs/inputComponents";

interface IBorderType {
  borderWidth: string;
  onChange: (borderType: string) => void;
}

/**
 * Allows user to choose which border sides will be colored
 */
const BorderType = ({ borderWidth, onChange }: IBorderType) => {
  const borderWidthValues = borderWidth.split(" ");

  // Each side has a width - is a box
  const borderTypeForWidth = (widthValues: string[]) =>
    widthValues.every((v) => v === "1px") ? "Box" : "Underline";

  // Parse the other way
  const borderWidthForType = (type: string) =>
    type === "Box" ? "1px 1px 1px 1px" : "0px 0px 1px 0px";

  const borderType = borderTypeForWidth(borderWidthValues);

  return (
    <DropdownInput
      title="Border Type"
      subtitle="Choose a border type"
      selection={borderType}
      options={[
        { label: "Box", value: "Box" },
        { label: "Underline", value: "Underline" },
      ]}
      placeholder="Border type"
      onChange={(t) => {
        onChange(borderWidthForType(t));
      }}
    />
  );
};

export default BorderType;
