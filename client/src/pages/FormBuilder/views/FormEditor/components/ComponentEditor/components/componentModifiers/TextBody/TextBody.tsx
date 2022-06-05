import { ChangeEvent } from "react";
import { TextInput } from "../../../../../../../../../components/inputs/inputComponents";

interface ITextBody {
  text?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextBody = ({ text, onChange }: ITextBody) => (
  <TextInput
    title="Text Body"
    subtitle="The explanatory text"
    value={text}
    onChange={onChange}
  />
);

export default TextBody;
