import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { token, setToken } from "../../services/forms";
import ExistingInputEditor from "../../components/InputEditor/ExistingInputEditor";
import NewInputEditor from "../../components/InputEditor/NewInputEditor";
import { ICustomInput } from "../../components/inputs/resources";
import IForm from "../../resources/IForm";
import { getForms } from "../../services/forms";

import FormBuilderHeader from "./FormBuilderHeader";
import FormList from "./FormList";
import FormContainer from "./FormContainer/FormContainer";

import "./FormBuilder.scss";

const FormBuilder = ({
  user,
  setUser,
}: {
  user: string;
  setUser: (username: string) => void;
}) => {
  // All user forms retrieved from DB
  const [forms, setForms] = useState<IForm[]>([]);
  // Currently edited form
  const [form, setForm] = useState<IForm>({ name: "", inputs: [] });
  // Input currently being created
  const [newInput, setNewInput] = useState<ICustomInput | null>(null);

  const addInput = (input: ICustomInput) => {
    setForm({ ...form, inputs: [...form.inputs, input] });
  };

  // populate user's forms
  useEffect(() => {
    if (token) {
      getForms(token).then(setForms);
    }
  }, []);

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="form-builder-container">
            <FormBuilderHeader
              user={user}
              setUser={setUser}
              setToken={setToken}
            />
            <Outlet />
          </div>
        }
      >
        {/* View all forms */}
        <Route path="" element={<FormList forms={forms} />} />

        {/* View specific form */}
        {/* id will be default mongoDB id or 'new' if it's new */}
        <Route
          path=":id"
          element={
            <FormContainer
              form={form}
              forms={forms}
              setForm={setForm}
              editedInput={newInput}
              token={token}
            />
          }
        >
          {/* add a new input to the form */}
          <Route
            path="add"
            element={
              <NewInputEditor
                addInput={addInput}
                newInput={newInput}
                setNewInput={setNewInput}
              />
            }
          />
          {/* edit form input */}
          <Route
            path="edit-input/:index"
            element={<ExistingInputEditor form={form} setForm={setForm} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default FormBuilder;
