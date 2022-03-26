import { useState, useEffect } from "react";
import { TextInput } from "../../../../components/inputs/inputComponents";
import FormList from "../../components/FormList";
import "./FormsView.scss";

const FormsView = ({ forms, setEditedForm, haveFormsBeenFetched }: any) => {
  // To filter forms by name
  const [filteredForms, setFilteredForms] = useState(forms);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    setFilteredForms(forms.filter((f: any) => f.name.includes(filterQuery)));
  }, [filterQuery, forms]);

  return (
    <div className="form-view-container">
      <TextInput
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
