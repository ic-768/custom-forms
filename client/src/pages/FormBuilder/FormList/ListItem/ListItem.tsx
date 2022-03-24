import { Link } from "react-router-dom";
import { IForm } from "../../resources/shared";

import "./ListItem.scss";

interface IListItem {
  form: IForm;
  index: number;
  onDeleteForm: (id: IForm["_id"]) => void;
}

const ListItem = ({ form, index, onDeleteForm }: IListItem) => {
  const { name, _id } = form;

  return (
    <div
      className="form-list-list-item"
      key={_id}
      style={{ animationDelay: `${index * 20}ms` }}
    >
      <Link className="form-list-list-item-name" to={_id!.toString()}>
        {name}
      </Link>
      <div
        className="form-list-list-item-delete-button"
        onClick={() => onDeleteForm(_id)}
      >
        X
      </div>
    </div>
  );
};

export default ListItem;
