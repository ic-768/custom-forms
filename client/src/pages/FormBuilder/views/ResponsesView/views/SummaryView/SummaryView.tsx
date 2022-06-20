import { ReactElement } from "react";

import { IForm } from "resources/shared";
import { SummarisedResponses, summariseResponses } from "../../helpers";

import "./SummaryView.scss";

const SummaryView = ({
  responses,
}: {
  responses?: IForm["submissions"];
}): ReactElement | null => {
  if (!responses || !responses.length) return null;

  const summarisedResponses = summariseResponses(responses);

  const Summary = ({
    questionInfo,
  }: {
    questionInfo: SummarisedResponses;
  }): ReactElement => (
    <div className="summary-view-response">
      <span className="summary-view-question">{questionInfo.title}</span>
      {questionInfo.responses.map((a, i) => (
        <div key={i}>{a}</div>
      ))}
    </div>
  );

  return (
    <div className="summary-view">
      {summarisedResponses.map((r, i) => (
        <Summary key={i} questionInfo={r} />
      ))}
    </div>
  );
};

export default SummaryView;
