import { summariseResponses } from "../pages/FormBuilder/views/ResponsesView/helpers";
import {
  response,
  twoIdenticalResponses,
  responseWithAllInputs,
  mixedResponses,
} from "./mockData/formResponses";

test("Summarise an empty response", () => {
  expect(summariseResponses([])).toEqual([]);
});

test("Summarise a single response", () => {
  expect(summariseResponses(response)).toEqual([
    { title: "How high?", responses: ["4"] },
    { title: "What is it?", responses: ["A cat"] },
    { title: "asfd", responses: ["Option one", "Option three"] },
  ]);
});

test("Summarise two identical responses", () => {
  expect(summariseResponses(twoIdenticalResponses)).toEqual([
    { title: "How high?", responses: ["4", "4"] },
    { title: "What is it?", responses: ["A cat", "A cat"] },
    {
      title: "asfd",
      responses: ["Option one", "Option three", "Option one", "Option three"],
    },
  ]);
});

test("Summarise response with all types of inputs", () => {
  expect(summariseResponses(responseWithAllInputs)).toEqual([
    {
      title: "Which of these ice-creams do you like?",
      responses: ["Chocolate", "Cookies"],
    },
    { title: "Choose a number", responses: ["42"] },
    { title: "What's your name?", responses: ["Mike"] },

    {
      title: "What's 32 divided by 4?",
      responses: ["8"],
    },
    {
      title: "When's your birthday?",
      responses: ["12/4/2022"],
    },
    {
      title: "What time were you born?",
      responses: ["12:00 PM"],
    },
    {
      title: "On a scale of 1-10 how awesome is this app?",
      responses: ["10"],
    },
  ]);
});

test("Summarise two different responses", () => {
  expect(summariseResponses(mixedResponses)).toEqual([
    { title: "How high?", responses: ["4"] },
    { title: "What is it?", responses: ["A cat"] },
    { title: "asfd", responses: ["Option one", "Option three"] },
    {
      title: "Which of these ice-creams do you like?",
      responses: ["Chocolate", "Cookies"],
    },
    { title: "Choose a number", responses: ["42"] },
    { title: "What's your name?", responses: ["Mike"] },

    {
      title: "What's 32 divided by 4?",
      responses: ["8"],
    },
    {
      title: "When's your birthday?",
      responses: ["12/4/2022"],
    },
    {
      title: "What time were you born?",
      responses: ["12:00 PM"],
    },
    {
      title: "On a scale of 1-10 how awesome is this app?",
      responses: ["10"],
    },
  ]);
});
