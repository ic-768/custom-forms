import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";

import AddInputForm from "../../components/AddInputForm";
import { ICustomInput } from "../../components/inputs/resources";
import CustomInput from "../../CustomInput";
import { tempData } from "../../tempData";

import "./FormBuilder.scss";

const FormBuilder = () => {
  const [formInputs, setFormInputs] = useState<Array<ICustomInput>>(tempData); // initial test inputs
  const [editedInput, setEditedInput] = useState<ICustomInput | null>(null); // currently edited input

  const addInput = (input: ICustomInput) => {
    setFormInputs([...formInputs, input]);
  };

  return (
    <Routes>
      <Route
        path=":id"
        element={
          <div className="form-builder-container">
            <div className="form-container">
              {formInputs.map((input, i) => (
                <CustomInput key={i} input={input} />
              ))}
              {editedInput && <CustomInput input={editedInput} />}
              <Link to="/">Home!</Link>
              <Link to="/form/2">Form view!</Link>
              <Link to="add">Add an input!</Link>
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
              editInput={setEditedInput}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default FormBuilder;
