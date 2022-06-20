/* Should properly summarise empty responses */
import { IFormSubmission } from "resources/shared";
import { summariseResponses } from "../pages/FormBuilder/views/ResponsesView/helpers";

const mockResponse: IFormSubmission[] = [
  [
    { title: "How high?", type: "Number", value: "4" },
    { title: "What is it?", type: "Text", value: "A cat" },
    {
      title: "asfd",
      type: "Multiple Choice",
      value: [
        { label: "Option one", isSelected: true },
        { label: "Option two", isSelected: false },
        { label: "Option three", isSelected: true },
      ],
    },
  ],
];

const identicalResponses: IFormSubmission[] = mockResponse.concat(mockResponse);

test("Summarise an empty response", () => {
  expect(summariseResponses([])).toEqual([]);
});

test("Summarise a single response", () => {
  expect(summariseResponses(mockResponse)).toEqual([
    { title: "How high?", responses: ["4"] },
    { title: "What is it?", responses: ["A cat"] },
    { title: "asfd", responses: ["Option one", "Option three"] },
  ]);
});

test("Summarise two identical responses", () => {
  expect(summariseResponses(identicalResponses)).toEqual([
    { title: "How high?", responses: ["4", "4"] },
    { title: "What is it?", responses: ["A cat", "A cat"] },
    {
      title: "asfd",
      responses: ["Option one", "Option three", "Option one", "Option three"],
    },
  ]);
});
