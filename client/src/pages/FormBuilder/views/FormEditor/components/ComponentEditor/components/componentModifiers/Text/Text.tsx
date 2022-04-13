import { ChangeEvent } from "react";

import { TextInput } from "../../../../../../../components/inputs/inputComponents";

interface IText {
  text?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Text = ({ text, onChange }: IText) => (
  <TextInput
    title="Text Body"
    subtitle="The explanation text"
    value={text}
    onChange={onChange}
  />
);

export default Text;
