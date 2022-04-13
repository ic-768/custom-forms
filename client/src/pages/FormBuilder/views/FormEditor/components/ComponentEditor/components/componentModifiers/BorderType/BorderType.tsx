import { DropdownInput } from "../../../../../../../components/inputs/inputComponents";

interface IBorderType {
  borderWidth: string;
  onChange: (borderType: string) => void;
}

/**
 * Allows user to choose which border sides will be colored
 */
const BorderType = ({ borderWidth, onChange }: IBorderType) => {
  const borderTypeForWidth = () => {
    switch (borderWidth) {
      case "1px 1px 1px 1px":
        return "Box";
      case "0px 0px 1px 0px":
        return "Underline";
      default:
        return "None";
    }
  };

  // Parse the other way
  const borderWidthForType = (type: string) => {
    switch (type) {
      case "Box":
        return "1px 1px 1px 1px";
      case "Underline":
        return "0px 0px 1px 0px";
      default:
        return "0px 0px 0px 0px";
    }
  };

  const borderType = borderTypeForWidth();

  return (
    <DropdownInput
      title="Border Type"
      subtitle="Choose a border type"
      selection={borderType}
      options={[
        { label: "Box", value: "Box" },
        { label: "Underline", value: "Underline" },
        { label: "None", value: "None" },
      ]}
      placeholder="Border type"
      onChange={(t) => {
        onChange(borderWidthForType(t));
      }}
    />
  );
};

export default BorderType;
