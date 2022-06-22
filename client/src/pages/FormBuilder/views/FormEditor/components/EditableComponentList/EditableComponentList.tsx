import { MouseEventHandler, ReactElement, useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { FormComponentProps } from "components/FormComponent";
import { EditedComponent, FormProps } from "resources/shared";
import EditableComponent from "../EditableComponent";

import "./EditableComponentList.scss";

interface EditableComponentListProps {
  components: FormComponentProps[];
  editedComponent: EditedComponent;
  onSelectComponent: (index: number) => MouseEventHandler;
  onDeleteComponent: (index: number) => MouseEventHandler;
  editedForm: FormProps;
  setEditedForm: (form: FormProps) => void;
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
}: EditableComponentListProps): ReactElement => {
  // function to reorder items in an array
  const reorder = (
    components: FormProps["components"],
    startIndex: number,
    endIndex: number
  ): FormProps["components"] => {
    const result = Array.from(components);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // reorder components on drag and drop
  const onDragEnd = (result: DropResult): void => {
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

  // to disallow reordering and editing other components if already editing
  const showDragHandle = useMemo(
    () => hasManyComponents && !isEditing,
    [isEditing, hasManyComponents]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="editableComponentList">
        {(provided, droppableSnapshot): ReactElement => (
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
              return showDragHandle ? (
                <Draggable
                  draggableId={component.id || i.toString()}
                  key={component.id}
                  index={i}
                >
                  {(provided): ReactElement => (
                    <EditableComponent
                      ref={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      key={i}
                      component={componentToUse}
                      showControls={!isEditing}
                      showDragControl={!droppableSnapshot.isDraggingOver}
                      onSelectComponent={onSelectComponent(i)}
                      onDeleteComponent={onDeleteComponent(i)}
                    />
                  )}
                </Draggable>
              ) : (
                <EditableComponent
                  key={i}
                  showControls={!isEditing}
                  showDragControl={false}
                  component={componentToUse}
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
