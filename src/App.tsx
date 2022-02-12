import React, { useState, ReactElement } from "react";
import { Outlet, Link, Routes, Route } from "react-router-dom";
import { DayValue } from "react-modern-calendar-datepicker";
import { TimePickerValue } from "react-time-picker";

import AddInputForm from "./AddInputForm";
import "./App.scss";
import { ICustomInput, inputTypeLabel } from "./inputs/resources";
import {
  DateInput,
  DropdownInput,
  MultipleChoiceInput,
  NumberInput,
  TextInput,
  TimeInput,
} from "./inputs/inputComponents";

const App = (): ReactElement => {
  const [formInputs, setFormInputs] = useState<Array<ICustomInput>>([]);
  const [dummyDate, setDummyDate] = useState({
    year: 1992,
    month: 2,
    day: 23,
  } as DayValue);
  const [dummyChoice, setDummyChoice] = useState([{ label: "a" }]);
  const [dummyTime, setDummyTime] = useState("1" as TimePickerValue);

  const addInput = (input: ICustomInput) => {
    setFormInputs([...formInputs, input]);
  };

  const renderInput = (inputName: inputTypeLabel) => {
    switch (inputName) {
      case "Date":
        return (
          <DateInput label="Please choose a date" onChange={setDummyDate} />
        );
      case "Dropdown":
        return (
          <DropdownInput
            label="Please choose an option"
            placeholder="a"
            options={[{ value: "asd", label: "sf" }]}
            onChange={console.log}
            selection={null}
          />
        );
      case "Multiple Choice":
        return (
          <MultipleChoiceInput
            label="Choose as many as you'd like"
            choices={[{ label: "s", isSelected: true }, { label: "f" }]}
            onChange={setDummyChoice}
          />
        );
      case "Number":
        return (
          <NumberInput
            label="Please enter a number"
            value={2}
            onChange={() => {
              "a";
            }}
          />
        );
      case "Text":
        return <TextInput label="Please type your answer" />;
      case "Time":
        return (
          <TimeInput
            label=" Please choose a time"
            value={dummyTime}
            onChange={setDummyTime}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <div className="form-container">
              {formInputs.map((f) => renderInput(f.inputType))}
              <Link to="/">Form view!</Link>
              <Link to="/add">Add an input!</Link>
            </div>
            <Outlet />
          </div>
        }
      >
        <Route path="add" element={<AddInputForm addInput={addInput} />} />
      </Route>
    </Routes>
  );
};
export default App;
