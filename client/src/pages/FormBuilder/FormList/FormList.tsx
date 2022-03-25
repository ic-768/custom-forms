import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import ListItem from "./ListItem/ListItem";
import { deleteForm } from "../../../store/features/forms/formsSlice";
import { useNotification, useWithLoader } from "../../../store/hooks";
import { emptyForm, IForm } from "../resources/shared";
import { asyncDeleteForm, token } from "../../../services/forms";

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

  // List of links to edit each of user's forms
  const formList = forms.map((f, i) => (
    <ListItem key={f._id} form={f} index={i} onDeleteForm={onDeleteForm} />
  ));

  const isListEmpty = haveFormsBeenFetched && formList.length === 0;

  return (
    <div className="form-list-container">
      {isListEmpty ? (
        <div className="form-list-new-form-explanation">
          Start creating your very own custom form by clicking the button below!
        </div>
      ) : (
        <div className="form-list-forms-container">{formList}</div>
      )}
      <div className="form-list-new-form-and-arrow-container">
        {isListEmpty && (
          <FontAwesomeIcon
            className="form-list-new-form-arrow"
            icon={faArrowDown}
          />
        )}
        <Link
          onClick={onAddNewForm}
          className="form-list-new-form-button"
          to="new"
        >
          New Form
        </Link>
      </div>
    </div>
  );
};

export default FormList;
