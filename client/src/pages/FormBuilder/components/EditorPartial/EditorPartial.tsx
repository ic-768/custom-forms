import { ReactNode } from "react";

import "./EditorPartial.scss";

const EditorPartial = ({
  onSave,
  onCancel,
  content,
}: {
  onSave: () => void;
  onCancel: () => void;
  content: ReactNode;
}) => {
  return (
    <div className="editor-partial">
      <div className="editor-partial-options-container">{content}</div>
      <div className="editor-partial-buttons-container">
        <button onClick={onSave} className="editor-partial-save">
          Save
        </button>
        <button onClick={onCancel} className="editor-partial-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditorPartial;
