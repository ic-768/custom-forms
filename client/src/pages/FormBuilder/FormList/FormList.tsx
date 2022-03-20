import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faPlus } from "@fortawesome/free-solid-svg-icons";

import { emptyForm, IForm } from "../resources/shared";

import "./FormList.scss";

/**
 * Displays all the user's forms
 */
const FormList = ({
  setEditedForm,
  forms,
  haveFormsBeenFetched,
}: {
  setEditedForm: (form: IForm) => void;
  forms: IForm[];
  haveFormsBeenFetched: boolean;
}) => {
  const onAddNewForm = () => {
    setEditedForm(emptyForm);
  };

  // List of links to edit each of user's forms
  const formList = forms.map((f, i) => {
    return (
      <Link
        style={{ animationDelay: `${i * 120}ms` }}
        key={f._id}
        className="form-list-item"
        to={f._id!.toString()}
      >
        {f.name}
      </Link>
    );
  });

  const isListEmpty = haveFormsBeenFetched && formList.length === 0;

  return (
    <div className="form-list-container">
      <h1>All Forms</h1>
      {isListEmpty ? (
        <div className="form-list-new-form-explanation">
          Start creating your very own custom form by clicking the button below!
        </div>
      ) : (
        formList
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
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </div>
  );
};

export default FormList;
