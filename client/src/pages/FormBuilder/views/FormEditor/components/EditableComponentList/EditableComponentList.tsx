import { MouseEventHandler, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import EditableComponent from "../EditableComponent";
import { IEditedComponent, IForm } from "../../../../resources/shared";
import { IFormComponent } from "../../../../components/FormComponent";

import "./EditableComponentList.scss";

interface IEditableComponentList {
  components: IFormComponent[];
  editedComponent: IEditedComponent;
  onSelectComponent: (index: number) => MouseEventHandler;
  onDeleteComponent: (index: number) => MouseEventHandler;
  editedForm: IForm;
  setEditedForm: (form: IForm) => void;
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
}: IEditableComponentList) => {
  // function to reorder items in an array
  const reorder = (components: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(components);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // reorder components on drag and drop
  const onDragEnd = (result: any) => {
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

  // disallow reordering when editing a component
  const makeDraggable = useMemo(
    () => components.length > 1 && !editedComponent,
    [components.length, editedComponent]
  );

  // hide draghandle while dragging
  const showDragHandle = (snapshot: any) => !snapshot.isDraggingOver;

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
              return makeDraggable ? (
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
                      showDragControl={showDragHandle(droppableSnapshot)}
                      onSelectComponent={onSelectComponent(i)}
                      onDeleteComponent={onDeleteComponent(i)}
                    />
                  )}
                </Draggable>
              ) : (
                <EditableComponent
                  key={i}
                  component={componentToUse}
                  showDragControl={makeDraggable}
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
