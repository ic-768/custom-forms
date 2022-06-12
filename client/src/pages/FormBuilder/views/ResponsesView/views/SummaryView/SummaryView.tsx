import "./SummaryView.scss";

type groupedResponses = { [title: string]: string[] };

const SummaryView = ({ responses }: { responses?: any[] }) => {
  const groupedResponses: groupedResponses = {};

  if (!responses || !responses.length) {
    return null;
  }

  // Populate hash table with responses
  // TODO extract to function and take care of more complex responses
  // like multiple-choice
  for (const response of responses) {
    for (const each of response) {
      const title = each.title;
      if (!groupedResponses[title]) groupedResponses[title] = [];
      if (Array.isArray(each.value)) {
        // multiple choice
        each.value.forEach((v: any) => {
          if (v.isSelected) {
            groupedResponses[title].push(v.label);
          }
        });
      } else {
        groupedResponses[title].push(each.value);
      }
    }
  }

  // get [property, value] array
  const formattedResponses = Object.entries(groupedResponses);

  const SummaryResponse = ({
    formattedResponse,
  }: {
    formattedResponse: [string, string[]];
  }) => {
    return (
      <div className="summary-view-response">
        <span className="summary-view-question">{formattedResponse[0]}</span>
        {formattedResponse[1].map((a, i) => (
          <div key={i}>{a}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="summary-view">
      {formattedResponses.map((r, i) => (
        <SummaryResponse key={i} formattedResponse={r} />
      ))}
    </div>
  );
};

export default SummaryView;
