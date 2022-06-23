import { ReactElement, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import FormListItem from "../FormListItem/FormListItem";
import { deleteForm } from "store/features/forms/formsSlice";
import { useNotification, useWithLoader } from "store/hooks";
import { asyncDeleteForm, token } from "services/forms";
import { FormProps } from "resources/shared";
import { ConfirmationModalProps } from "components/ConfirmationModal";
import usePostForm from "pages/FormBuilder/hooks/usePostForm";

import "./FormList.scss";

interface FormListProps {
  selectedForms: FormProps["_id"][];
  setSelectedForms: (forms: FormProps["_id"][]) => void;
  onSelectForm: (formId: FormProps["_id"]) => void;
  forms: FormProps[];
  haveFormsBeenFetched: boolean;
  setConfirmation: (confirmation: ConfirmationModalProps | null) => void;
}

/**
 * Displays all the user's forms
 */
const FormList = ({
  selectedForms,
  setSelectedForms,
  onSelectForm,
  forms,
  haveFormsBeenFetched,
  setConfirmation,
}: FormListProps): ReactElement => {
  const dispatch = useDispatch();
  const withLoader = useWithLoader();
  const notify = useNotification();
  const postForm = usePostForm();

  const onDeleteForm = useCallback(
    async (id: FormProps["_id"]) =>
      await withLoader(async () => {
        if (token) {
          try {
            await asyncDeleteForm(id, token);
            dispatch(deleteForm(id));
            notify(
              { type: "success", message: "Deleted form successfully!" },
              5000
            );
            // if form had been selected prior to deletion, update selected forms
            if (selectedForms.includes(id)) {
              setSelectedForms(selectedForms.filter((sf) => sf !== id));
            }
          } catch {
            notify({ type: "error", message: "Something went wrong!" }, 5000);
          }
        }
      }),
    [dispatch, notify, withLoader, selectedForms, setSelectedForms]
  );

  const onCopyForm = useCallback(
    async (form: FormProps) => {
      withLoader(async () => {
        const copiedForm = {
          ...form,
          name: `${form.name} (copy)`,
          submissions: [],
        };
        await postForm(copiedForm, token, "Form copied successfully!");
      });
    },
    [postForm, withLoader]
  );

  // List of links to edit each of user's forms
  const formList = useMemo(() => {
    // function to delete the form
    const onShowDeleteConfirmation = (id: FormProps["_id"]): void => {
      setConfirmation({
        message: "Are you sure you want to delete this form?",
        onConfirm: async () => {
          await onDeleteForm(id);
          setConfirmation(null);
        },
        onCancel: () => setConfirmation(null),
      });
    };

    return forms.map((f) => (
      <FormListItem
        key={f._id}
        form={f}
        isSelected={selectedForms.includes(f._id)}
        onSelectForm={(): void => onSelectForm(f._id)}
        onCopyForm={(e): void => {
          e.stopPropagation();
          onCopyForm(f);
        }}
        onDeleteForm={(e): void => {
          e.stopPropagation();
          onShowDeleteConfirmation(f._id);
        }}
      />
    ));
  }, [
    forms,
    onCopyForm,
    selectedForms,
    onSelectForm,
    onDeleteForm,
    setConfirmation,
  ]);

  const isListEmpty = haveFormsBeenFetched && formList.length === 0;

  return (
    <div className="form-list-container">
      <div className="form-list">
        {isListEmpty ? (
          <div className="form-list-empty-row">No forms</div>
        ) : (
          formList
        )}
      </div>
    </div>
  );
};

export default FormList;
