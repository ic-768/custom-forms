import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IForm } from "../../resources/shared";

import "./SubmissionsView.scss";

const SubmissionsView = ({ forms }: { forms: IForm[] }) => {
  const formIdFromUrl = useParams().id;
  const [form, setForm] = useState<IForm>();

  // Set form based on url param
  useEffect(() => {
    if (forms) {
      const foundForm = forms.find((f) => f._id === formIdFromUrl);
      foundForm && setForm(foundForm);
    }
  }, [forms, formIdFromUrl]);

  const submissionsView = !form?.submissions.length ? (
    <span className="submissions-view">No submissions yet</span>
  ) : (
    <div className="submissions-view">
      {form.submissions.map((s, i) => (
        <div
          className="submissions-view-submission-container"
          key={`${i}-${s.length}`}
        >
          {/* each submission has an array of answers */}
          {s.map((t: any, j: number) => (
            <div
              className="submissions-view-submission-answer"
              key={`${t.title}-${i}-${j}`}
            >
              <span className="submissions-view-submission-answer-title">
                {t.title}
              </span>
              <span>{t.value}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="submissions-view-container">
      {form?.name && (
        <span className="submissions-view-form-name">{form.name}</span>
      )}
      {submissionsView}
    </div>
  );
};

export default SubmissionsView;
