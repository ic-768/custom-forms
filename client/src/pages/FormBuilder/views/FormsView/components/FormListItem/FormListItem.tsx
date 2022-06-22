import { MouseEventHandler, ReactElement } from "react";
import { Link } from "react-router-dom";
import { faCopy, faLink, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppSelector, useNotification } from "store/hooks";
import { FormProps } from "resources/shared";

import "./FormListItem.scss";

interface FormListItemProps {
  form: FormProps;
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
}: FormListItemProps): ReactElement => {
  const { name, _id } = form;
  const username = useAppSelector((state) => state.user.username);
  const notify = useNotification();

  const numSubmissions = form.submissions.length;
  const formId = _id?.toString();
  const onCopyURL: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/submit/${username}/${formId}`
    );
    notify(
      {
        message: "Copied link to clipboard",
        type: "success",
      },
      3000
    );
  };

  return (
    <div onClick={onSelectForm} className="form-list-item">
      <input
        checked={isSelected}
        onChange={onSelectForm}
        className="form-list-item-checkbox"
        type="checkbox"
      />
      <Link className="form-list-item-name" to={`edit/${formId}`}>
        {name}
      </Link>
      <Link
        className="form-list-submission-count"
        title={`${numSubmissions} Submissions`}
        to={`submissions/${formId}`}
      >
        {numSubmissions}
      </Link>
      <FontAwesomeIcon
        role="button"
        title="Copy form URL"
        className="form-list-link-icon"
        icon={faLink}
        onClick={onCopyURL}
      />
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
