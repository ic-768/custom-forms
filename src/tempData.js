export const tempData = [
  { type: "Date" },
  {
    type: "Dropdown",
    placeholder: "Choose one",
    onChange: () => null,
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
    ],
    selection: "option 2",
  },
  {
    type: "Multiple Choice",
    label: "Choose s many as you'd like",
    choices: [{ label: "s", isSelected: true }, { label: "f" }],
  },
  { type: "Number" },
  {
    type: "Text",
    placeholder: "Please type!",
    styles: { borderRadius: 20 },
  },
  {
    type: "Time",
    value: new Date(),
    label: "Choose a time",
  },
];
