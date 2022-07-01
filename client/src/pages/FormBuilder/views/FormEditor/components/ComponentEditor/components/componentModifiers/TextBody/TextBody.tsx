import { ChangeEventHandler, ReactElement } from "react";

import { TextInput } from "components/inputs/inputComponents";

interface TextBodyProps {
  text?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextBody = ({ text, onChange }: TextBodyProps): ReactElement => (
  <TextInput
    title="Text Body"
    subtitle="The explanatory text"
    value={text}
    onChange={onChange}
  />
);

export default TextBody;
