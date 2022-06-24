import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";

import ModeToggle from "./components/ModeToggle";
import IndividualView from "./views/IndividualView";
import SummaryView from "./views/SummaryView";
import { FormProps } from "resources/shared";
import BackButton from "components/BackButton";
import useFormFromParam from "../../hooks/useFormFromParam";

import "./ResponsesView.scss";

const ResponsesView = ({ forms }: { forms: FormProps[] }): ReactElement => {
  const formIdFromUrl = useParams().id;
  const [form, setForm] = useState<FormProps>();
  const [viewMode, setViewMode] = useState<"individual" | "summary">("summary");

  useFormFromParam(forms, form?._id, formIdFromUrl, setForm);

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
