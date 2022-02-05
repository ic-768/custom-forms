import React, { useState } from "react";
import { DayValue } from "react-modern-calendar-datepicker";

import DropdownInput from "./inputs/DropdownInput";
import TextInput from "./inputs/TextInput";
import NumberInput from "./inputs/NumberInput";
import DateInput from "./inputs/DateInput";
import TimeInput from "./inputs/TimeInput";

import { getInputIcon, inputsForDropdown } from "./helpers/inputs";

import "./AddInput.scss";
import { TimePickerValue } from "react-time-picker";

const Edit = () => {
  const [inputType, setInputType] = useState<string | null>(null);
  const [day, setDay] = React.useState<DayValue>(null);
  const [time, setTime] = React.useState<TimePickerValue>("");

  return (
    <div className="edit-panel">
      <div className="edit-panel-options-container">
        <div className="edit-panel-option-container">
          <label className="edit-panel-option-label">
            Input type
            <DropdownInput
              placeholder="-- Choose an input type --"
              options={inputsForDropdown}
              onChange={setInputType}
              selection={inputType}
              selectionIcon={getInputIcon(inputType)}
            />
          </label>
        </div>
        <div className="edit-panel-option-container">
          {/*Temporarily using this space to code out all the generic inputs for the app*/}
          <TextInput placeholder="Placeholder for text input" />
        </div>
        <div className="edit-panel-option-container">
          <NumberInput placeholder="Placeholder for number input" />
        </div>
        <div className="edit-panel-option-container">
          <DateInput date={day} onChange={setDay} placeholder="Choose a date" />
        </div>
        <div className="edit-panel-option-container">
          <TimeInput
            value={time}
            onChange={(e) => setTime(e)}
            maxDetail="minute"
          />
        </div>
        <div className="edit-panel-buttons-container">
          <button className="edit-panel-save">Save</button>
          <button className="edit-panel-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
