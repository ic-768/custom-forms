import React, { useState, ReactElement } from "react";
import { Outlet, Link, Routes, Route } from "react-router-dom";
import { DayValue } from "react-modern-calendar-datepicker";
import { TimePickerValue } from "react-time-picker";

import AddInputForm from "./components/AddInputForm";
import { ICustomInput } from "./components/inputs/resources";
import {
  DateInput,
  DropdownInput,
  MultipleChoiceInput,
  NumberInput,
  TextInput,
  TimeInput,
} from "./components/inputs/inputComponents";

import "./App.scss";
import { IInputModifiers } from "./components/inputs/inputModifiers/types";

const App = (): ReactElement => {
  // saved inputs
  const [formInputs, setFormInputs] = useState<Array<ICustomInput>>([]);
  // currently edited input
  const [editedInput, setEditedInput] = useState<ICustomInput | null>(null);

  const [dummyDate, setDummyDate] = useState({
    year: 1992,
    month: 2,
    day: 23,
  } as DayValue);
  const [dummyChoice, setDummyChoice] = useState([{ label: "a" }]);
  const [dummyTime, setDummyTime] = useState(new Date() as TimePickerValue);

  const addInput = (input: ICustomInput) => {
    setFormInputs([...formInputs, input]);
  };

  const renderInput = (input: ICustomInput) => {
    switch (input.inputType) {
      case "Date":
        return (
          <DateInput label="Please choose a date" onChange={setDummyDate} />
        );
      case "Dropdown":
        return (
          <DropdownInput
            modifiers={input.modifiers}
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
            modifiers={input.modifiers}
            label="Choose as many as you'd like"
            choices={[{ label: "s", isSelected: true }, { label: "f" }]}
            onChange={setDummyChoice}
          />
        );
      case "Number":
        return (
          <NumberInput
            modifiers={input.modifiers}
            label="Please enter a number"
            value={2}
            onChange={() => {
              "a";
            }}
          />
        );
      case "Text":
        return (
          <TextInput
            modifiers={input.modifiers}
            label="Please type your answer"
          />
        );
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
              {formInputs.map((i) => renderInput(i))}
              {editedInput && renderInput(editedInput)}
              <Link to="/">Form view!</Link>
              <Link to="/add">Add an input!</Link>
            </div>
            <Outlet />
          </div>
        }
      >
        <Route
          path="add"
          element={
            <AddInputForm
              addInput={addInput}
              editedInputType={editedInput?.inputType || ""}
              editInputType={(inputType) => {
                setEditedInput({
                  modifiers: editedInput?.modifiers || {},
                  inputType: inputType || "",
                });
              }}
              editedInputModifiers={editedInput?.modifiers}
              editInputModifiers={(modifiers: IInputModifiers) => {
                setEditedInput({
                  modifiers,
                  inputType: editedInput?.inputType || "",
                });
              }}
            />
          }
        />
      </Route>
    </Routes>
  );
};
export default App;
