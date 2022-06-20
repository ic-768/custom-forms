import { ChangeEventHandler, ReactElement } from "react";

import { TextInput } from "components/inputs/inputComponents";

interface ITextBody {
  text?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextBody = ({ text, onChange }: ITextBody): ReactElement => (
  <TextInput
    title="Text Body"
    subtitle="The explanatory text"
    value={text}
    onChange={onChange}
  />
);

export default TextBody;
