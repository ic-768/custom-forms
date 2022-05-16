import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IForm } from "../../resources/shared";
import ModeToggle from "./components/ModeToggle";
import Response from "./components/Response";

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

  const responses = form?.submissions.map((s, i) => (
    <Response answers={s} key={`${i}-${s.length}`} />
  ));

  const submissionsLength = form?.submissions.length;
  const responsesView = submissionsLength ? (
    <div className="responses-view">{responses}</div>
  ) : (
    <span className="responses-view">No submissions yet</span>
  );

  return (
    <div className="responses-view-container">
      {form?.name && (
        <span className="responses-view-form-name">{form.name}</span>
      )}
      <ModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      <span className="responses-view-submission-count">
        {submissionsLength} Submissions
      </span>
      {responsesView}
    </div>
  );
};

export default ResponsesView;
