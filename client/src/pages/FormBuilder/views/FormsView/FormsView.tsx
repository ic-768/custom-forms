import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNotification, useWithLoader } from "../../../../store/hooks";
import { token, asyncDeleteMultipleForms } from "../../../../services/forms";
import { deleteMultipleForms } from "../../../../store/features/forms/formsSlice";
import { TextInput } from "../../../../components/inputs/inputComponents";
import FormList from "../../components/FormList";
import { IForm } from "../../resources/shared";

import "./FormsView.scss";

interface IFormsView {
  forms: IForm[];
  setEditedForm: (form: IForm) => void;
  haveFormsBeenFetched: boolean;
}

const FormsView = ({
  forms,
  setEditedForm,
  haveFormsBeenFetched,
}: IFormsView) => {
  const dispatch = useDispatch();
  const withLoader = useWithLoader();
  const notify = useNotification();
  // To filter forms by name
  const [filteredForms, setFilteredForms] = useState<IForm[]>(forms);
  const [filterQuery, setFilterQuery] = useState<string>("");

  // To batch-delete multiple forms
  const [selectedForms, setSelectedForms] = useState<IForm["_id"][]>([]);

  useEffect(() => {
    setFilteredForms(forms.filter((f: IForm) => f.name.includes(filterQuery)));
  }, [filterQuery, forms]);

  const toggleIsFormSelected = useCallback(
    (formId: IForm["_id"]) => {
      if (selectedForms.includes(formId)) {
        setSelectedForms(selectedForms.filter((id) => id !== formId));
      } else {
        setSelectedForms(selectedForms.concat(formId));
      }
    },
    [selectedForms]
  );

  const onDeleteMultipleForms = useCallback(async () => {
    withLoader(async () => {
      try {
        const deletedForms = await asyncDeleteMultipleForms(
          selectedForms,
          token!
        );
        dispatch(deleteMultipleForms(deletedForms));
        setSelectedForms([]);
        notify(
          { type: "success", message: "Deleted forms successfully!" },
          3000
        );
      } catch {
        notify({ type: "error", message: "Something went wrong!" }, 3000);
      }
    });
  }, [dispatch, withLoader, notify, selectedForms]);

  return (
    <div className="form-view-container">
      <TextInput
        placeholder="Search forms ..."
        className="form-view-form-filter"
        onChange={(e) => setFilterQuery(e.target.value)}
        value={filterQuery}
      />
      {selectedForms.length ? (
        <button
          onClick={onDeleteMultipleForms}
          className="form-view-forms-delete-button"
        >
          <FontAwesomeIcon icon={faTrash} />
          <span className="form-view-form-forms-delete-button-count">
            {selectedForms.length}
          </span>
        </button>
      ) : null}
      <FormList
        setEditedForm={setEditedForm}
        selectedForms={selectedForms}
        onSelectForm={toggleIsFormSelected}
        haveFormsBeenFetched={haveFormsBeenFetched}
        forms={filteredForms}
      />
    </div>
  );
};

export default FormsView;
