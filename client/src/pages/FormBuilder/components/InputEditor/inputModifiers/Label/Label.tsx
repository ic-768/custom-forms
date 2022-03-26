import { ChangeEvent } from "react";
import { TextInput } from "../../../../../../components/inputs/inputComponents";

interface ILabel {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Label = ({ label, onChange }: ILabel) => (
  <TextInput label="Label" value={label} onChange={onChange} />
);

export default Label;
