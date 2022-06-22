import { ForwardedRef, forwardRef, MouseEventHandler } from "react";
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

import FormComponent, { FormComponentProps } from "components/FormComponent";

import "./EditableComponent.scss";

/**
 * Component that can be dragged to be reordered and edited by clicking accompanying buttons
 */
interface EditableComponentProps {
  ref?: ForwardedRef<HTMLDivElement>;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  component: FormComponentProps;
  showControls: boolean;
  showDragControl: boolean;
  onSelectComponent: MouseEventHandler;
  onDeleteComponent: MouseEventHandler;
}

const EditableComponent = forwardRef(
  (
    {
      draggableProps,
      dragHandleProps,
      component,
      showControls,
      showDragControl,
      onSelectComponent,
      onDeleteComponent,
    }: EditableComponentProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      {...draggableProps}
      {...dragHandleProps}
      className="editable-component-container"
    >
      {showDragControl && (
        <div className="editable-component-drag-handle">
          <FontAwesomeIcon
            className="editable-component-drag-handle-icon"
            title="Drag to rearrange"
            icon={faBars}
          />
        </div>
      )}
      <FormComponent component={component} />
      {showControls && (
        <div className="editable-component-buttons">
          <button
            onClick={onSelectComponent}
            className="editable-component-edit-button"
          >
            <FontAwesomeIcon
              className="editable-component-button-icon"
              title="Edit"
              icon={faPencilAlt}
            />
          </button>
          <button
            onClick={onDeleteComponent}
            className="editable-component-delete-button"
          >
            <FontAwesomeIcon
              className="editable-component-button-icon"
              title="Remove"
              icon={faMinusCircle}
            />
          </button>
        </div>
      )}
    </div>
  )
);

EditableComponent.displayName = "EditableComponent";
export default EditableComponent;
