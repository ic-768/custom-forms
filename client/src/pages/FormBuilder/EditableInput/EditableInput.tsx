import { MouseEventHandler } from "react";
import {
  faBars,
  faMinusCircle,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomInput, {
  ICustomInput,
} from "../../../components/inputs/CustomInput";

import "./EditableInput.scss";

const EditableInput = ({
  input,
  index,
  showDragControl,
  onSelectInput,
  onDeleteInput,
}: {
  input: ICustomInput;
  index: number;
  showDragControl: boolean;
  onSelectInput: MouseEventHandler;
  onDeleteInput: MouseEventHandler;
}) => {
  return (
    <div className="editable-input-container">
      <CustomInput input={input} />
      {showDragControl && (
        <div className="editable-input-reorder-control">
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <div className="editable-input-buttons">
        <button onClick={onSelectInput} className="editable-input-edit-link">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button onClick={onDeleteInput} className="editable-input-delete-link">
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
      </div>
    </div>
  );
};

export default EditableInput;
