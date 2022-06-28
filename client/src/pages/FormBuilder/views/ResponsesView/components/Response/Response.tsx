import { ReactElement } from "react";
import { FormSubmission } from "resources/shared";

import "./Response.scss";

const Response = ({ answers }: { answers: FormSubmission }): ReactElement => {
  const responses = answers.map((t, j) => {
    return (
      <div key={`${t.title}-${j}`}>
        <span className="response-title">{t.title}</span>
        {Array.isArray(t.value) ? (
          // is multiple choice
          t.value
            .filter((v) => v.isSelected)
            .map((s, i: number) => {
              return (
                <span className="response-answer" key={(s.label, i)}>
                  {s.label}
                </span>
              );
            })
        ) : (
          <span className="response-answer">{t.value}</span>
        )}
      </div>
    );
  });

  return <div className="response-container">{responses}</div>;
};

export default Response;
