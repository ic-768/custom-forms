import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import IForm from "../resources/IForm";

import "./FormList.scss";

/**
 * Displays all the user's forms
 */
const FormList = ({
  setEditedForm,
  forms,
}: {
  setEditedForm: (form: IForm) => void;
  forms: IForm[];
}) => {
  // user clicked to add (and edit) a brand new form
  const onAddNewForm = () => {
    setEditedForm({ name: "Your New Form!", inputs: [] });
  };

  // List of links to edit each of user's forms
  const formList = forms.map((f) => (
    <Link key={f._id} className="form-list-item" to={f._id!.toString()}>
      {f.name}
    </Link>
  ));

  return (
    <div className="form-list-container">
      <h1>All Forms</h1>
      {formList}
      <Link
        onClick={onAddNewForm}
        className="form-list-new-form-button"
        to="new"
      >
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </div>
  );
};

export default FormList;
