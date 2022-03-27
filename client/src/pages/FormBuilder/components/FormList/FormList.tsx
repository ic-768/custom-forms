import { useCallback, useMemo } from "react";
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
  onSelectForm,
  forms,
  haveFormsBeenFetched,
}: IFormList) => {
  const dispatch = useDispatch();
  const withLoader = useWithLoader();
  const notify = useNotification();

  const onAddNewForm = () => {
    setEditedForm(emptyForm);
  };

  const onDeleteForm = useCallback(
    async (id: IForm["_id"]) =>
      withLoader(async () => {
        if (token) {
          try {
            await asyncDeleteForm(id, token);
            dispatch(deleteForm(id));
            notify(
              { type: "success", message: "Deleted form successfully!" },
              3000
            );
          } catch {
            notify({ type: "error", message: "Something went wrong!" }, 3000);
          }
        }
      }),
    [dispatch, notify, withLoader]
  );

  const onCopyForm = useCallback(
    async (form: IForm) => {
      const copiedForm = { ...form, name: `${form.name} (copy)` };
      withLoader(async () => {
        if (token) {
          try {
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
            onDeleteForm(f._id);
          }}
        />
      )),
    [forms, onCopyForm, onDeleteForm, selectedForms, onSelectForm]
  );

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
      <Link
        onClick={onAddNewForm}
        className="form-list-new-form-button"
        to="new"
      >
        New Form
      </Link>
    </div>
  );
};

export default FormList;
