import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import IForm from "../resources/IForm";

import "./FormList.scss";

/**
 * Displays all the user's forms
 */
const FormList = ({ forms }: { forms: IForm[] }) => (
  <div className="form-list-container">
    <h1>All Forms</h1>
    {forms.map((f) => (
      <Link key={f._id} className="form-list-item" to={f._id!.toString()}>
        {f.name}
      </Link>
    ))}
    <Link className="form-list-new-form-button" to="new">
      <FontAwesomeIcon icon={faPlus} />
    </Link>
  </div>
);

export default FormList;
