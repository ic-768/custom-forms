import { Link } from "react-router-dom";
import { IForm } from "../../resources/shared";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ListItem.scss";

interface IListItem {
  form: IForm;
  index: number;
  onDeleteForm: (id: IForm["_id"]) => void;
  onCopyForm: (form: IForm) => void;
}

const ListItem = ({ form, index, onDeleteForm, onCopyForm }: IListItem) => {
  const { name, _id } = form;

  return (
    <div
      className="form-list-list-item"
      key={_id}
      style={{ animationDelay: `${index * 20}ms` }}
    >
      {/* TODO onFormSelect both when clicking on checkbox and also on item click */}
      <input className="form-list-list-item-checkbox" type="checkbox" />
      <Link className="form-list-list-item-name" to={_id!.toString()}>
        {name}
      </Link>
      <div className="form-list-item-buttons">
        <FontAwesomeIcon
          className="form-list-item-button"
          onClick={() => onCopyForm(form)}
          icon={faCopy}
        />
        <FontAwesomeIcon
          className="form-list-item-button"
          onClick={() => onDeleteForm(_id)}
          icon={faTrash}
        />
      </div>
    </div>
  );
};

export default ListItem;
