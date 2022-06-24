import {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  ChangeEventHandler,
} from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDebounce } from "hooks/useDebounce";
import { useNotification, useWithLoader } from "store/hooks";
import { token, asyncDeleteMultipleForms } from "services/forms";
import { deleteMultipleForms } from "store/features/forms/formsSlice";
import { emptyForm, FormProps } from "resources/shared";
import { ConfirmationModalProps } from "components/ConfirmationModal";
import { TextInput } from "components/inputs/inputComponents";
import FormList from "./components/FormList";

import "./FormsView.scss";

interface FormsViewProps {
  forms: FormProps[];
  setEditedForm: (form: FormProps) => void;
  haveFormsBeenFetched: boolean;
  setConfirmation: (confirmation: ConfirmationModalProps | null) => void;
}

const FormsView = ({
  forms,
  setEditedForm,
  haveFormsBeenFetched,
  setConfirmation,
}: FormsViewProps): ReactElement => {
  const dispatch = useDispatch();
  const withLoader = useWithLoader();
  const notify = useNotification();
  // To filter forms by name
  const [filteredForms, setFilteredForms] = useState<FormProps[]>(forms);
  const [filterQuery, setFilterQuery] = useState<string>("");

  const debouncedFilterQuery = useDebounce(filterQuery, 250);
  // To batch-delete multiple forms
  const [selectedForms, setSelectedForms] = useState<FormProps["_id"][]>([]);

  useEffect(() => {
    setFilteredForms(
      forms.filter((f: FormProps) =>
        f.name.toLowerCase().includes(debouncedFilterQuery)
      )
    );
  }, [debouncedFilterQuery, forms]);

  const toggleIsFormSelected = useCallback(
    (formId: FormProps["_id"]) => {
      if (selectedForms.includes(formId)) {
        setSelectedForms(selectedForms.filter((id) => id !== formId));
      } else {
        setSelectedForms(selectedForms.concat(formId));
      }
    },
    [selectedForms]
  );

  const onAddNewForm = (): void => {
    setEditedForm(emptyForm);
  };

  // function to delete multiple selected forms
  const onConfirmDelete = useCallback(async () => {
    await withLoader(async () => {
      try {
        const deletedForms = await asyncDeleteMultipleForms(
          selectedForms,
          token!
        );
        dispatch(deleteMultipleForms(deletedForms as string[]));
        setSelectedForms([]);
        notify(
          { type: "success", message: "Deleted forms successfully!" },
          5000
        );
      } catch {
        notify({ type: "error", message: "Something went wrong!" }, 5000);
      }
    });
  }, [dispatch, withLoader, notify, selectedForms]);

  // set the confirmation modal with a callback to delete the forms
  const onShowDeleteConfirmation = (): void => {
    setConfirmation({
      message: "Are you sure you want to delete these forms?",
      onConfirm: async () => {
        await onConfirmDelete();
        setConfirmation(null);
      },
      onCancel: () => setConfirmation(null),
    });
  };

  const onQueryChange: ChangeEventHandler<HTMLInputElement> = (e): void =>
    setFilterQuery(e.target.value.toLowerCase());

  return (
    <div className="forms-view-container">
      <TextInput
        placeholder="Search forms ..."
        className="forms-view-form-filter"
        onChange={onQueryChange}
        value={filterQuery}
      />
      {selectedForms.length ? (
        <button
          onClick={onShowDeleteConfirmation}
          className="forms-view-forms-delete-button"
        >
          <FontAwesomeIcon
            className="forms-view-forms-delete-button-icon"
            title="Delete selected forms"
            icon={faTrash}
          />
          <span className="forms-view-forms-delete-button-count">
            {selectedForms.length}
          </span>
        </button>
      ) : null}
      <FormList
        selectedForms={selectedForms}
        setSelectedForms={setSelectedForms}
        onSelectForm={toggleIsFormSelected}
        haveFormsBeenFetched={haveFormsBeenFetched}
        setConfirmation={setConfirmation}
        forms={filteredForms}
      />
      <Link
        onClick={onAddNewForm}
        className="forms-view-new-form-button"
        to="edit/new"
      >
        New Form
      </Link>
    </div>
  );
};

export default FormsView;
