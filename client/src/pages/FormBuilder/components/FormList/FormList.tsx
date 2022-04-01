import { useState, useCallback, useMemo } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import ListItem from "./ListItem/ListItem";
import {
  addForm,
  deleteForm,
} from "../../../../store/features/forms/formsSlice";
import { useNotification, useWithLoader } from "../../../../store/hooks";
import { emptyForm, IForm } from "../../resources/shared";
import {
  asyncDeleteForm,
  asyncPostForm,
  token,
} from "../../../../services/forms";

import "./FormList.scss";

interface IFormList {
  setEditedForm: (form: IForm) => void;
  selectedForms: IForm["_id"][];
  setSelectedForms: (forms: IForm["_id"][]) => void;
  onSelectForm: (formId: IForm["_id"]) => void;
  forms: IForm[];
  haveFormsBeenFetched: boolean;
}

/**
 * Displays all the user's forms
 */
const FormList = ({
  setEditedForm,
  selectedForms,
  setSelectedForms,
  onSelectForm,
  forms,
  haveFormsBeenFetched,
}: IFormList) => {
  const dispatch = useDispatch();
  const withLoader = useWithLoader();
  const notify = useNotification();

  // used to show modal to confirm deletion
  const [formToDelete, setFormToDelete] = useState<IForm["_id"] | null>(null);

  const onAddNewForm = () => {
    setEditedForm(emptyForm);
  };

  const onSelectForDeletion = useCallback((id) => setFormToDelete(id), []);

  const onDeleteForm = useCallback(
    async (id: IForm["_id"]) =>
      await withLoader(async () => {
        if (token) {
          try {
            await asyncDeleteForm(id, token);
            dispatch(deleteForm(id));
            notify(
              { type: "success", message: "Deleted form successfully!" },
              3000
            );
            // if form had been selected prior to deletion, update selected forms
            if (selectedForms.includes(id)) {
              setSelectedForms(selectedForms.filter((sf) => sf !== id));
            }
          } catch {
            notify({ type: "error", message: "Something went wrong!" }, 3000);
          }
        }
      }),
    [dispatch, notify, withLoader, selectedForms, setSelectedForms]
  );

  const onCopyForm = useCallback(
    async (form: IForm) => {
      withLoader(async () => {
        if (token) {
          try {
            const copiedForm = { ...form, name: `${form.name} (copy)` };
            const returnedForm = await asyncPostForm(copiedForm, token);
            dispatch(addForm(returnedForm));
            notify(
              { type: "success", message: "Copied form successfully!" },
              3000
            );
          } catch {
            notify({ type: "error", message: "Something went wrong!" }, 3000);
          }
        }
      });
    },
    [dispatch, notify, withLoader]
  );

  // List of links to edit each of user's forms
  const formList = useMemo(
    () =>
      forms.map((f) => (
        <ListItem
          key={f._id}
          form={f}
          isSelected={selectedForms.includes(f._id)}
          onSelectForm={() => onSelectForm(f._id)}
          onCopyForm={(e) => {
            e.stopPropagation();
            onCopyForm(f);
          }}
          onDeleteForm={(e) => {
            e.stopPropagation();
            onSelectForDeletion(f._id);
          }}
        />
      )),
    [forms, onCopyForm, onSelectForDeletion, selectedForms, onSelectForm]
  );

  const isListEmpty = haveFormsBeenFetched && formList.length === 0;

  return (
    <div className="form-list-container">
      {formToDelete ? (
        <ConfirmationModal
          message={"Are you sure you want to delete this form?"}
          onConfirm={async () => {
            await onDeleteForm(formToDelete);
            setFormToDelete(null);
          }}
          onCancel={() => {
            setFormToDelete(null);
          }}
        />
      ) : null}
      <div className="form-list">
        {isListEmpty ? (
          <div className="form-list-empty-row">No forms</div>
        ) : (
          formList
        )}
      </div>
      <Link
        onClick={onAddNewForm}
        className="form-list-new-form-button"
        to="edit/new"
      >
        New Form
      </Link>
    </div>
  );
};

export default FormList;
