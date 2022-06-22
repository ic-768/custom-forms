import { ReactElement } from "react";

import { FormComponentProps } from "components/FormComponent";
import { EditedComponent, FormProps } from "resources/shared";
import { DropdownInput } from "components/inputs/inputComponents";

import EditorPartial from "../EditorPartial";
import ComponentModifiersList from "./components/ComponentModifiersList";
import { getComponentIcon, componentsForDropdown } from "./helpers";

interface ComponentEditorProps {
  editedComponent: EditedComponent;
  setEditedComponent: (component: EditedComponent) => void;
  form: FormProps;
  setForm: (form: FormProps) => void;
}

/**
 * Used to customise a form component.
 */
const ComponentEditor = ({
  editedComponent,
  setEditedComponent,
  form,
  setForm,
}: ComponentEditorProps): ReactElement | null => {
  if (!editedComponent) return null;

  // replace form's component with newly edited one
  const onUpdateForm = (component: FormComponentProps): void => {
    if (component) {
      setForm({
        ...form,
        components: form.components.map((i, idx) =>
          idx === editedComponent.index ? component : i
        ),
      });
    }
  };

  const onSave = (): void => {
    onUpdateForm({ ...editedComponent.component });
    setEditedComponent(null);
  };

  const onCancel = (): void => {
    setEditedComponent(null);
  };

  // edit component - keep index
  const editComponent = (component: FormComponentProps): void => {
    setEditedComponent({ index: editedComponent.index, component });
  };

  // When changing component type, we keep the label and the id
  const onComponentTypeSelect = (t: string): void =>
    editComponent({
      type: t,
      title: editedComponent.component.title,
      id: editedComponent.component.id,
    } as FormComponentProps);

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
