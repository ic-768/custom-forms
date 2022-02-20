import React, { useState, ReactElement } from "react";
import { Outlet, Link, Routes, Route } from "react-router-dom";

import AddInputForm from "./components/AddInputForm";
import { ICustomInput } from "./components/inputs/resources";
import CustomInput from "./CustomInput";
import { tempData } from "./tempData";

import "./App.scss";

const App = (): ReactElement => {
  const [formInputs, setFormInputs] = useState<Array<ICustomInput>>(tempData); // initial test inputs
  const [editedInput, setEditedInput] = useState<ICustomInput | null>(null); // currently edited input

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
                <CustomInput key={i} input={input} />
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
              inputs={formInputs}
              addInput={addInput}
              editedInput={editedInput}
              editInput={(input) => {
                setEditedInput({ ...input });
              }}
            />
          }
        />
      </Route>
    </Routes>
  );
};
export default App;
