import { ChangeEvent } from "react";

import { TextInput } from "../../../../../../../components/inputs/inputComponents";

interface ITitle {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Title = ({ title, onChange }: ITitle) => (
  <TextInput
    title="Title"
    subtitle="The question title for this input"
    value={title}
    onChange={onChange}
  />
);

export default Title;
