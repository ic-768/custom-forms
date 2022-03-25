import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import ListItem from "./ListItem/ListItem";
import { addForm, deleteForm } from "../../../store/features/forms/formsSlice";
import { useNotification, useWithLoader } from "../../../store/hooks";
import { emptyForm, IForm } from "../resources/shared";
import { asyncDeleteForm, asyncPostForm, token } from "../../../services/forms";

import "./FormList.scss";

interface IFormList {
  setEditedForm: (form: IForm) => void;
  forms: IForm[];
  haveFormsBeenFetched: boolean;
}

/**
 * Displays all the user's forms
 */
const FormList = ({
  setEditedForm,
  forms,
  haveFormsBeenFetched,
}: IFormList) => {
  const dispatch = useDispatch();
  const withLoader = useWithLoader();
  const notify = useNotification();

  const onAddNewForm = () => {
    setEditedForm(emptyForm);
  };

  const onDeleteForm = async (id: IForm["_id"]) => {
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
    });
  };

  const onCopyForm = async (form: IForm) => {
    withLoader(async () => {
      if (token) {
        try {
          const copiedForm = await asyncPostForm(form, token);
          dispatch(addForm(copiedForm));
          notify(
            { type: "success", message: "Copied form successfully!" },
            3000
          );
        } catch {
          notify({ type: "error", message: "Something went wrong!" }, 3000);
        }
      }
    });
  };

  // List of links to edit each of user's forms
  const formList = forms.map((f, i) => (
    <ListItem
      key={f._id}
      form={f}
      index={i}
      onCopyForm={onCopyForm}
      onDeleteForm={onDeleteForm}
    />
  ));

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
