import { ReactElement } from "react";

import { DropdownOption } from "components/inputs/inputComponents/DropdownInput";
import MultipleEntryInput from "components/inputs/inputComponents/MultipleEntryInput";
import { emptyDropdownOption } from "components/inputs/inputComponents/DropdownInput/resources";

interface DropdownOptionsProps {
  onChange: (options: DropdownOption[]) => void;
  options: DropdownOption[];
}

const DropdownOptions = ({
  onChange,
  options,
}: DropdownOptionsProps): ReactElement => (
  <MultipleEntryInput
    title="Options"
    subtitle="The options for the dropdown input"
    initialOptions={options}
    onChange={onChange}
    emptyOption={emptyDropdownOption}
  />
);
export default DropdownOptions;
