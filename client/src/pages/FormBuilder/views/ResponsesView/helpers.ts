import { IForm } from "resources/shared";

// hash map to group responses to respective question
type GroupedResponses = { [title: string]: string[] };

export type SummarisedResponses = { title: string; responses: string[] };

/* Populate hash table with responses*/
export const summariseResponses = (
  responses: IForm["submissions"]
): SummarisedResponses[] => {
  const groupedResponses: GroupedResponses = {};

  for (const response of responses) {
    for (const each of response) {
      const title = each.title || "";
      if (!groupedResponses[title]) groupedResponses[title] = [];
      if (Array.isArray(each.value)) {
        // multiple choice
        each.value.forEach((v) => {
          if (v.isSelected) {
            groupedResponses[title].push(v.label);
          }
        });
      } else {
        groupedResponses[title].push(each.value);
      }
    }
  }

  return Object.entries(groupedResponses).map((r) => ({
    title: r[0],
    responses: r[1],
  }));
};
