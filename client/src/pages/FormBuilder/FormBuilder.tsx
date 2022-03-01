import React, { useState } from "react";
import { useNavigate, Routes, Route, Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

import { token, setToken } from "../../services/forms";
import AddInputForm from "../../components/AddInputForm";
import { ICustomInput } from "../../components/inputs/resources";
import CustomInput from "../../CustomInput";
import { tempData } from "../../tempData";
import { postForm } from "../../services/forms";

import "./FormBuilder.scss";

const FormBuilder = ({ user, setUser }: { user: string; setUser: any }) => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState<Array<ICustomInput>>(tempData); // initial test inputs
  const [editedInput, setEditedInput] = useState<ICustomInput | null>(null); // currently edited input

  const addInput = (input: ICustomInput) => {
    setFormInputs([...formInputs, input]);
  };

  const onLogOut = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    setToken("");
    navigate("/");
  };

  const onPost = () => {
    if (token) postForm(formInputs, token);
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="form-builder-container">
            <div className="form-builder-header">
              <div className="form-builder-header-user-details">
                <FontAwesomeIcon
                  className="form-builder-header-user-icon"
                  icon={faUserAstronaut}
                />
                <div>Logged in as {user}</div>
              </div>
              <button
                className="form-builder-header-sign-out-button"
                onClick={onLogOut}
              >
                Sign out
              </button>
            </div>
            <Outlet />
          </div>
        }
      >
        <Route path="" element={<div>User can view all forms here</div>} />
        <Route
          path=":id"
          element={
            <div>
              <button onClick={onPost}>post</button>
              <div className="form-container">
                {formInputs.map((input, i) => (
                  <CustomInput key={i} input={input} />
                ))}
                {editedInput && <CustomInput input={editedInput} />}
              </div>
              <Link to="/">Home!</Link>
              <Link to="/2">Form view!</Link>
              <Link to="/2/add">Add an input!</Link>
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
      </Route>
    </Routes>
  );
};

export default FormBuilder;
