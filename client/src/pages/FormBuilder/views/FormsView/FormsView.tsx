import { useState, useEffect } from "react";
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
  // To filter forms by name
  const [filteredForms, setFilteredForms] = useState(forms);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    setFilteredForms(forms.filter((f: IForm) => f.name.includes(filterQuery)));
  }, [filterQuery, forms]);

  return (
    <div className="form-view-container">
      <TextInput
        placeholder="Search forms ..."
        className="form-view-form-filter"
        onChange={(e) => setFilterQuery(e.target.value)}
        value={filterQuery}
      />
      <FormList
        setEditedForm={setEditedForm}
        haveFormsBeenFetched={haveFormsBeenFetched}
        forms={filteredForms}
      />
    </div>
  );
};

export default FormsView;
