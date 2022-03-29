import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { IForm } from "../../../resources/shared";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ListItem.scss";

interface IListItem {
  form: IForm;
  isSelected: boolean;
  onSelectForm: () => void;
  onDeleteForm: MouseEventHandler<SVGSVGElement>;
  onCopyForm: MouseEventHandler<SVGSVGElement>;
}

const ListItem = ({
  form,
  isSelected,
  onSelectForm,
  onDeleteForm,
  onCopyForm,
}: IListItem) => {
  const { name, _id } = form;

  return (
    <div onClick={onSelectForm} className="form-list-list-item">
      <input
        checked={isSelected}
        onChange={onSelectForm}
        className="form-list-list-item-checkbox"
        type="checkbox"
      />
      <Link className="form-list-list-item-name" to={`edit/${_id!.toString()}`}>
        {name}
      </Link>
      <div className="form-list-item-buttons">
        <FontAwesomeIcon
          className="form-list-item-button"
          onClick={onCopyForm}
          icon={faCopy}
        />
        <FontAwesomeIcon
          className="form-list-item-button"
          onClick={onDeleteForm}
          icon={faTrash}
        />
      </div>
    </div>
  );
};

export default ListItem;
