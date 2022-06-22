import { FormSubmission } from "resources/shared";

export const response: FormSubmission[] = [
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

export const responseWithAllInputs: FormSubmission[] = [
  [
    {
      title: "Which of these ice-creams do you like?",
      type: "Multiple Choice",
      value: [
        { label: "Vanilla", isSelected: false },
        { label: "Chocolate", isSelected: true },
        { label: "Cookies", isSelected: true },
      ],
    },
    {
      title: "Choose a number",
      type: "Dropdown",
      value: "42",
    },
    {
      title: "What's your name?",
      type: "Text",
      value: "Mike",
    },
    {
      title: "What's 32 divided by 4?",
      type: "Number",
      value: "8",
    },
    {
      title: "When's your birthday?",
      type: "Date",
      value: "12/4/2022",
    },
    {
      title: "What time were you born?",
      type: "Time",
      value: "12:00 PM",
    },
    {
      title: "On a scale of 1-10 how awesome is this app?",
      type: "Range",
      value: "10",
    },
  ],
];

export const twoIdenticalResponses = response.concat(response);
export const mixedResponses = response.concat(responseWithAllInputs);
