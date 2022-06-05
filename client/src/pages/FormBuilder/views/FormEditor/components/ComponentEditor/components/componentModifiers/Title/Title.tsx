import { ChangeEvent } from "react";

import { TextInput } from "../../../../../../../../../components/inputs/inputComponents";

interface ITitle {
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Title = ({ title, onChange }: ITitle) => (
  <TextInput
    title="Title"
    subtitle="The accompanying title for the component"
    value={title}
    onChange={onChange}
  />
);

export default Title;
