import EditorPartial from "../../../../components/EditorPartial";
import { DropdownInput } from "../../../../components/inputs/inputComponents";

const FormStyleEditor = ({ onCancel }: { onCancel: () => void }) => (
  <EditorPartial
    content={
      <>
        <DropdownInput
          selection="Regular"
          options={[
            { label: "Floating", value: "floating" },
            { label: "Regular", value: "regular" },
          ]}
        />
      </>
    }
    onCancel={onCancel}
    onSave={() => null}
  />
);
export default FormStyleEditor;
