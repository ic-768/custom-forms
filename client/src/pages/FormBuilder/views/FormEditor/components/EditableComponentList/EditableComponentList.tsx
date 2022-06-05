import { MouseEventHandler, useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";

import { IFormComponent } from "components/FormComponent";
import { IEditedComponent, IForm } from "resources/shared";
import EditableComponent from "../EditableComponent";

import "./EditableComponentList.scss";

interface IEditableComponentList {
  components: IFormComponent[];
  editedComponent: IEditedComponent;
  onSelectComponent: (index: number) => MouseEventHandler;
  onDeleteComponent: (index: number) => MouseEventHandler;
  editedForm: IForm;
  setEditedForm: (form: IForm) => void;
  isEditing: boolean;
}

/**
 *  List of components that can be reordered through dragging and dropping,
 *  and edited/removed.
 */
const EditableComponentList = ({
  components,
  editedComponent,
  onSelectComponent,
  onDeleteComponent,
  editedForm,
  setEditedForm,
  isEditing,
}: IEditableComponentList) => {
  // function to reorder items in an array
  const reorder = (
    components: IForm["components"],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(components);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // reorder components on drag and drop
  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      setEditedForm({
        ...editedForm,
        components: reorder(
          editedForm.components,
          result.source.index,
          result.destination.index
        ),
      });
    }
  };

  const hasManyComponents = components.length > 1;
  // if already editing, disallow editing other components and reordering
  const showInputControls = useMemo(
    () => hasManyComponents && !isEditing,
    [isEditing, hasManyComponents]
  );

  // hide draghandle while dragging
  const showDragHandle = (snapshot: DroppableStateSnapshot) =>
    !snapshot.isDraggingOver;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="editableComponentList">
        {(provided, droppableSnapshot) => (
          <div
            className="editable-component-list-container"
            ref={provided.innerRef}
          >
            {components.map((component, i) => {
              // if rendering at editedComponent's index, display editedComponent
              const useEditedComponent =
                i === editedComponent?.index && editedComponent.component;

              const componentToUse = useEditedComponent
                ? editedComponent.component
                : component;

              // if not draggable, skip rendering the Draggable wrapper
              return showInputControls ? (
                <Draggable
                  draggableId={component.id || i.toString()}
                  key={component.id}
                  index={i}
                >
                  {(provided, _snapshot) => (
                    <EditableComponent
                      ref={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      key={i}
                      component={componentToUse}
                      showControls={showInputControls}
                      showDragControl={showDragHandle(droppableSnapshot)}
                      onSelectComponent={onSelectComponent(i)}
                      onDeleteComponent={onDeleteComponent(i)}
                    />
                  )}
                </Draggable>
              ) : (
                <EditableComponent
                  key={i}
                  showControls={showInputControls}
                  component={componentToUse}
                  showDragControl={showInputControls}
                  onSelectComponent={onSelectComponent(i)}
                  onDeleteComponent={onDeleteComponent(i)}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default EditableComponentList;
