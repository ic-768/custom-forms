import { useState } from "react";

import "./Response.scss";

const Response = ({ answers }: { answers: any[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => setIsExpanded(!isExpanded);
  const responses = answers.map((t: any, j: number) => (
    <div onClick={toggleExpansion} key={`${t.title}-${j}`}>
      <span className="response-title">{t.title}:</span>
      <span className="response-answer">{t.value}</span>
    </div>
  ));

  return (
    <div onClick={() => setIsExpanded(!isExpanded)}>
      <div>{responses}</div>
    </div>
  );
};

export default Response;
