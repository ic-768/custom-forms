import { getComponentIcon } from "./helpers";
import ComponentModifiersList from "./components/componentModifiersList";
import { DropdownInput } from "../../../../components/inputs/inputComponents";
import { componentsForDropdown } from "./helpers";
import { IEditedComponent, IForm } from "../../../../resources/shared";
import { IFormComponent } from "../../../../components/FormComponent";

import "./ComponentEditor.scss";

interface IComponentEditor {
  editedComponent: IEditedComponent;
  setEditedComponent: (component: IEditedComponent) => void;
  form: IForm;
  setForm: (form: any) => void;
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
    <div className="component-editor">
      <div className="component-editor-options-container">
        <DropdownInput
          title="Component type"
          subtitle="The type of form component to add"
          placeholder="-- Choose a type --"
          options={componentsForDropdown}
          onChange={onComponentTypeSelect}
          selection={editedComponent.component.type}
          selectionIcon={getComponentIcon(editedComponent.component.type!)}
        />
        {editedComponent && (
          <ComponentModifiersList
            component={editedComponent.component}
            onChangeModifiers={editComponent}
          />
        )}
      </div>
      <div className="component-editor-buttons-container">
        <button onClick={onSave} className="component-editor-save">
          Save
        </button>
        <button onClick={onCancel} className="component-editor-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ComponentEditor;
