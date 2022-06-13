import { IFormComponent } from "components/FormComponent";
import { IEditedComponent, IForm } from "resources/shared";
import { DropdownInput } from "components/inputs/inputComponents";

import EditorPartial from "../EditorPartial";
import ComponentModifiersList from "./components/componentModifiersList";
import { getComponentIcon, componentsForDropdown } from "./helpers";

interface IComponentEditor {
  editedComponent: IEditedComponent;
  setEditedComponent: (component: IEditedComponent) => void;
  form: IForm;
  setForm: (form: IForm) => void;
}

/**
 * Used to customise a form component.
 */
const ComponentEditor = ({
  editedComponent,
  setEditedComponent,
  form,
  setForm,
}: IComponentEditor) => {
  if (!editedComponent) return null;

  // replace form's component with newly edited one
  const onUpdateForm = (component: IFormComponent) => {
    if (component) {
      setForm({
        ...form,
        components: form.components.map((i, idx) =>
          idx === editedComponent.index ? component : i
        ),
      });
    }
  };

  const onSave = () => {
    onUpdateForm({ ...editedComponent.component });
    setEditedComponent(null);
  };

  const onCancel = () => {
    setEditedComponent(null);
  };

  // edit component - keep index
  const editComponent = (component: IFormComponent) => {
    setEditedComponent({ index: editedComponent.index, component });
  };

  // When changing component type, we keep the label and the id
  const onComponentTypeSelect = (t: string) =>
    editComponent({
      type: t,
      title: editedComponent.component.title,
      id: editedComponent.component.id,
    } as IFormComponent);

  return (
    <EditorPartial
      onSave={onSave}
      onCancel={onCancel}
      content={
        <>
          <DropdownInput
            title="Component type"
            subtitle="The type of form component to add"
            placeholder="-- Choose a type --"
            options={componentsForDropdown}
            onChange={onComponentTypeSelect}
            value={editedComponent.component.type}
            selectionIcon={getComponentIcon(editedComponent.component.type!)}
          />
          {editedComponent && (
            <ComponentModifiersList
              component={editedComponent.component}
              onChangeModifiers={editComponent}
            />
          )}
        </>
      }
    />
  );
};

export default ComponentEditor;
