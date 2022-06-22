import { ReactElement } from "react";

import { FormProps } from "resources/shared";
import Response from "../../components/Response";

import "./IndividualView.scss";

const IndividualView = ({
  responses,
}: {
  responses?: FormProps["submissions"];
}): ReactElement | null => {
  if (!responses || !responses.length) return null;

  const formattedResponses = responses?.map((s, i) => (
    <Response answers={s} key={`${i}-${s.length}`} />
  ));

  return <div className="individual-view">{formattedResponses}</div>;
};

export default IndividualView;
