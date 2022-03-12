import { MouseEventHandler, useMemo } from "react";

import { ICustomInput } from "../../../components/inputs/CustomInput";
import EditableInput from "../EditableInput/EditableInput";
import { IEditedInput } from "../resources/types";

const EditableInputList = ({
  inputs,
  editedInput,
  onSelectInput,
  onDeleteInput,
}: {
  inputs: ICustomInput[];
  editedInput: IEditedInput;
  onSelectInput: (index: number) => MouseEventHandler;
  onDeleteInput: (index: number) => MouseEventHandler;
}) => {
  const showDragControl = useMemo(() => inputs.length > 1, [inputs.length]);

  return (
    <>
      {inputs.map((input, i) => {
        // if rendering at editedInput's index, display editedInput
        const useEditedInput = i === editedInput?.index && editedInput.input;

        return (
          <EditableInput
            key={i}
            input={useEditedInput ? editedInput.input : input}
            index={useEditedInput ? editedInput.index : i}
            showDragControl={showDragControl}
            onSelectInput={onSelectInput(i)}
            onDeleteInput={onDeleteInput(i)}
          />
        );
      })}
    </>
  );
};
export default EditableInputList;
