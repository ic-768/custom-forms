import { ReactElement } from "react";

import MultipleEntryInput from "components/inputs/inputComponents/MultipleEntryInput";
import { MultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";
import { emptyMultipleChoiceOption } from "resources/shared";

interface MultipleChoiceOptionsProps {
  onChange: (options: MultipleChoiceOption[]) => void;
  options: MultipleChoiceOption[];
}

const MultipleChoiceOptions = ({
  onChange,
  options,
}: MultipleChoiceOptionsProps): ReactElement => (
  <MultipleEntryInput
    title="Options"
    subtitle="The options for the multiple choice input"
    initialOptions={options}
    onChange={onChange}
    emptyOption={emptyMultipleChoiceOption}
  />
);
export default MultipleChoiceOptions;
