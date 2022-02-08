import React, { useState, ReactElement } from "react";
import { Outlet, Link, Routes, Route } from "react-router-dom";

import AddInputForm from "./AddInputForm";
import "./App.scss";
import { ICustomInput } from "./resources/inputs";

const App = (): ReactElement => {
  const [formInputs, setFormInputs] = useState<Array<ICustomInput>>([]);
  const addInput = (input: ICustomInput) => {
    setFormInputs([...formInputs, input]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-container">
            Inputs so far={formInputs.map((f) => f.inputType)}
            <Link to="/">Form view!</Link>
            <Link to="/add">Add an input!</Link>
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
