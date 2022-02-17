import React, { useState, ReactElement } from "react";
import { Outlet, Link, Routes, Route } from "react-router-dom";
import AddInputForm from "./components/AddInputForm";
import { ICustomInput } from "./components/inputs/resources";
import CustomInput from "./CustomInput";

import "./App.scss";
import { IInputStyles } from "./components/inputs/inputModifiers/types";
import { tempData } from "./tempData";

const App = (): ReactElement => {
  // initial test inputs
  const [formInputs, setFormInputs] = useState<Array<ICustomInput>>(tempData); // currently edited input
  const [editedInput, setEditedInput] = useState<ICustomInput | null>(null);

  const addInput = (input: ICustomInput) => {
    setFormInputs([...formInputs, input]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            <div className="form-container">
              {formInputs.map((input, i) => (
                <CustomInput key={i} input={input} {...input.props} />
              ))}
              {editedInput && <CustomInput input={editedInput} />}
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
                  styles: editedInput?.styles || {},
                  inputType: inputType || "",
                });
              }}
              editedInputStyles={editedInput?.styles}
              editInputStyles={(styles: IInputStyles) => {
                setEditedInput({
                  styles,
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
