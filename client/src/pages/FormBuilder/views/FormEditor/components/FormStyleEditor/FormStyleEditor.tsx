import EditorPartial from "../../../../components/EditorPartial";

const FormStyleEditor = ({ onCancel }: { onCancel: () => void }) => (
  <EditorPartial
    content={
      <>
        <span>test</span>
        <span>test</span>
        <span>test</span>
        <span>test</span>
        <span>test</span>
      </>
    }
    onCancel={onCancel}
    onSave={() => null}
  />
);
export default FormStyleEditor;
