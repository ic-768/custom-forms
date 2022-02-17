export const tempData = [
  { inputType: "Date" },
  {
    inputType: "Dropdown",
    props: {
      placeholder: "Choose one",
      onChange: () => null,
      options: [
        { label: "option 1", value: "1" },
        { label: "option 2", value: "2" },
        { label: "option 3", value: "3" },
      ],
      selection: "option 2",
    },
  },
  {
    inputType: "Multiple Choice",
    props: {
      label: "Choose s many as you'd like",
      choices: [{ label: "s", isSelected: true }, { label: "f" }],
    },
  },
  { inputType: "Number" },
  {
    inputType: "Text",
    props: { placeholder: "Please type!" },
    styles: { borderRadius: 20 },
  },
  { inputType: "Time", props: { value: new Date(), label: "Choose a time" } },
];
