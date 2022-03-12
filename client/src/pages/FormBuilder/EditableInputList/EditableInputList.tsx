import { MouseEventHandler, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { ICustomInput } from "../../../components/inputs/CustomInput";
import EditableInput from "../EditableInput/EditableInput";
import { IEditedInput, IForm } from "../resources/types";

import "./EditableInputList.scss";

/**
 *  List of inputs that can be reordered through dragging and dropping,
 *  and edited/removed.
 */
const EditableInputList = ({
  inputs,
  editedInput,
  onSelectInput,
  onDeleteInput,
  editedForm,
  setEditedForm,
}: {
  inputs: ICustomInput[];
  editedInput: IEditedInput;
  onSelectInput: (index: number) => MouseEventHandler;
  onDeleteInput: (index: number) => MouseEventHandler;
  editedForm: IForm;
  setEditedForm: (form: IForm) => void;
}) => {
  // function to reorder items in an array
  const reorder = (inputs: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(inputs);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // reorder inputs on drag and drop
  const onDragEnd = (result: any) => {
    if (result.destination) {
      setEditedForm({
        ...editedForm,
        inputs: reorder(
          editedForm.inputs,
          result.source.index,
          result.destination.index
        ),
      });
    }
  };

  const showDragControl = useMemo(() => inputs.length > 1, [inputs.length]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="editableInputList">
        {(provided, _snapshot) => (
          <div
            className="editable-input-list-container"
            ref={provided.innerRef}
          >
            {inputs.map((input, i) => {
              // if rendering at editedInput's index, display editedInput
              const useEditedInput =
                i === editedInput?.index && editedInput.input;

              return (
                <Draggable draggableId={i.toString()} key={i} index={i}>
                  {(provided, _snapshot) => (
                    <EditableInput
                      ref={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      key={i}
                      input={useEditedInput ? editedInput.input : input}
                      showDragControl={showDragControl}
                      onSelectInput={onSelectInput(i)}
                      onDeleteInput={onDeleteInput(i)}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default EditableInputList;
