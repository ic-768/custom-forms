import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { matchPath } from "react-router";

import { token, setToken } from "../../services/forms";
import AddInputForm from "../../components/AddInputForm";
import { ICustomInput } from "../../components/inputs/resources";
import CustomInput from "../../CustomInput";
import { getForms, postForm, updateForm } from "../../services/forms";
import IForm from "../../resources/IForm";

import FormBuilderHeader from "./FormBuilderHeader";
import "./FormBuilder.scss";

const FormBuilder = ({
  user,
  setUser,
}: {
  user: string;
  setUser: (username: string) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // All user forms retrieved from DB
  const [forms, setForms] = useState<IForm[]>([]);
  // Currently edited form
  const [form, setForm] = useState<IForm>({ name: "", inputs: [] });
  // currently edited input
  const [editedInput, setEditedInput] = useState<ICustomInput | null>(null);

  // set form using ID param
  useEffect(() => {
    const formIdFromRoute = matchPath({ path: "/:id/*" }, location.pathname)
      ?.params.id;
    const foundForm = forms.find((f) => f._id === formIdFromRoute);

    if (foundForm) {
      setForm(foundForm);
    }
  }, [forms, location.pathname]);

  // populate user's forms
  useEffect(() => {
    if (token) {
      getForms(token).then((userForms) => {
        setForms(userForms);
      });
    }
  }, []);

  const addInput = (input: ICustomInput) => {
    setForm({ ...form, inputs: [...form.inputs, input] });
  };

  const onLogOut = () => {
    window.localStorage.removeItem("loggedUser");
    setUser("");
    setToken("");
    navigate("/");
  };

  /**
   * Create new form or update
   */
  const onPost = () => {
    if (token)
      if (form._id) {
        // form already exists in db
        updateForm(form, token);
      } else {
        postForm(form, token);
      }
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="form-builder-container">
            <FormBuilderHeader user={user} onLogOut={onLogOut} />
            <button onClick={onPost}>post</button>
            <Outlet />
          </div>
        }
      >
        {/* View all forms */}
        <Route
          path=""
          element={
            <div>
              <h1>All Forms</h1>
              {forms.map((f) => (
                <div onClick={() => f._id && navigate(f._id)}>{f.name}</div>
              ))}
            </div>
          }
        />

        {/* New forms will have id of 'new', existing will have mongo Id */}
        <Route
          path=":id"
          element={
            <div>
              <div className="form-container">
                {form.inputs.map((input, i) => (
                  <CustomInput key={i} input={input} />
                ))}
                {editedInput && <CustomInput input={editedInput} />}
              </div>
              <Outlet />
            </div>
          }
        >
          <Route
            path="edit"
            element={
              <AddInputForm
                inputs={form.inputs}
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
