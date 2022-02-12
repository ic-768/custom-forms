interface INumberInput {
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  // optionally let user choose a custom width - defaults to 100%
  width?: number;
  label?: string;
}

export default INumberInput;
