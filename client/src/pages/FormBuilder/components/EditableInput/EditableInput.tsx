import { forwardRef, MouseEventHandler } from "react";
import {
  faBars,
  faMinusCircle,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

import CustomInput, {
  ICustomInput,
} from "../../../../components/inputs/CustomInput";

import "./EditableInput.scss";

/**
 * Input that can be dragged to be reordered and edited by clicking accompanying buttons
 */
interface IEditableInput {
  ref?: any;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  input: ICustomInput;
  showDragControl: boolean;
  onSelectInput: MouseEventHandler;
  onDeleteInput: MouseEventHandler;
}

const EditableInput = forwardRef(
  (
    {
      draggableProps,
      dragHandleProps,
      input,
      showDragControl,
      onSelectInput,
      onDeleteInput,
    }: IEditableInput,
    ref: any
  ) => (
    <div
      ref={ref}
      {...draggableProps}
      {...dragHandleProps}
      className="editable-input-container"
    >
      {showDragControl && (
        <div className="editable-input-drag-handle">
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <CustomInput input={input} />
      <div className="editable-input-buttons">
        <button onClick={onSelectInput} className="editable-input-edit-link">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button onClick={onDeleteInput} className="editable-input-delete-link">
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
      </div>
    </div>
  )
);

export default EditableInput;
