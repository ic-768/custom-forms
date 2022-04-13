import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { IForm } from "../../../../resources/shared";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./FormListItem.scss";

interface IFormListItem {
  form: IForm;
  isSelected: boolean;
  onSelectForm: () => void;
  onDeleteForm: MouseEventHandler<SVGSVGElement>;
  onCopyForm: MouseEventHandler<SVGSVGElement>;
}

const FormListItem = ({
  form,
  isSelected,
  onSelectForm,
  onDeleteForm,
  onCopyForm,
}: IFormListItem) => {
  const { name, _id } = form;

  return (
    <div onClick={onSelectForm} className="form-list-item">
      <input
        checked={isSelected}
        onChange={onSelectForm}
        className="form-list-item-checkbox"
        type="checkbox"
      />
      <Link className="form-list-item-name" to={`edit/${_id!.toString()}`}>
        {name}
      </Link>
      <div className="form-list-item-buttons">
        <FontAwesomeIcon
          title="Create a copy"
          className="form-list-item-button"
          onClick={onCopyForm}
          icon={faCopy}
        />
        <FontAwesomeIcon
          title="Delete"
          className="form-list-item-button"
          onClick={onDeleteForm}
          icon={faTrash}
        />
      </div>
    </div>
  );
};

export default FormListItem;
