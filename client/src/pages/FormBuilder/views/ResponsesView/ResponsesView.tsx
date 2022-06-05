import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ModeToggle from "./components/ModeToggle";
import IndividualView from "./views/IndividualView";
import SummaryView from "./views/SummaryView";
import { IForm } from "resources/shared";
import BackButton from "components/BackButton";

import "./ResponsesView.scss";

const ResponsesView = ({ forms }: { forms: IForm[] }) => {
  const formIdFromUrl = useParams().id;
  const [form, setForm] = useState<IForm>();
  const [viewMode, setViewMode] = useState<"individual" | "summary">("summary");

  // Set form based on url param
  useEffect(() => {
    if (forms) {
      const foundForm = forms.find((f) => f._id === formIdFromUrl);
      foundForm && setForm(foundForm);
    }
  }, [forms, formIdFromUrl]);

  const submissionsLength = form?.submissions.length;

  return (
    <div className="responses-view-container">
      <BackButton />
      {form?.name && (
        <span className="responses-view-form-name">{form.name}</span>
      )}
      <ModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      <span className="responses-view-submission-count">
        {submissionsLength} Submissions
      </span>
      {viewMode === "individual" && (
        <IndividualView responses={form?.submissions} />
      )}
      {viewMode === "summary" && <SummaryView responses={form?.submissions} />}
    </div>
  );
};

export default ResponsesView;
