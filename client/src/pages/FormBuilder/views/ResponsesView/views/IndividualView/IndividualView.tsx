import Response from "../../components/Response";

import "./IndividualView.scss";

const IndividualView = ({ responses }: { responses?: any[] }) => {
  if (!responses || !responses.length) return null;

  const formattedResponses = responses?.map((s, i) => (
    <Response answers={s} key={`${i}-${s.length}`} />
  ));

  return <div className="individual-view">{formattedResponses}</div>;
};

export default IndividualView;
