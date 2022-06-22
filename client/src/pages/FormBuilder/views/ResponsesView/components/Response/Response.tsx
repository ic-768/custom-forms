import { ReactElement, useState } from "react";
import { IFormSubmission } from "resources/shared";

import "./Response.scss";

const Response = ({ answers }: { answers: IFormSubmission }): ReactElement => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = (): void => setIsExpanded(!isExpanded);

  const responses = answers.map((t, j) => {
    return (
      <div onClick={toggleExpansion} key={`${t.title}-${j}`}>
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
