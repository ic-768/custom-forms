import { ChangeEventHandler, ReactElement } from "react";

import { TextInput } from "components/inputs/inputComponents";

interface TitleProps {
  title: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Title = ({ title, onChange }: TitleProps): ReactElement => (
  <TextInput
    title="Title"
    subtitle="The accompanying title for the component"
    value={title}
    onChange={onChange}
  />
);

export default Title;
