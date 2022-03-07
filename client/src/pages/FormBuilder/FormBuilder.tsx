import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { token } from "../../services/forms";
import InputEditor from "../../components/InputEditor";
import { ICustomInput } from "../../components/inputs/CustomInput";
import IForm from "./resources/IForm";
import { getForms } from "../../services/forms";
import { useAppSelector } from "../../store/hooks";
import { selectForms, setForms } from "../../store/features/forms/formsSlice";

import FormBuilderHeader from "./FormBuilderHeader";
import FormList from "./FormList";
import FormContainer from "./FormContainer/FormContainer";

import "./FormBuilder.scss";

const FormBuilder = () => {
  const dispatch = useDispatch();
  const forms = useAppSelector(selectForms);

  // Currently edited form draft
  const [form, setForm] = useState<IForm>({ name: "", inputs: [] });
  // Edited input draft for input editor. Contains the input and its index in the form
  const [editedInput, setEditedInput] = useState<{
    input: ICustomInput;
    index: number;
  } | null>(null);

  // populate user's forms
  useEffect(() => {
    if (token) {
      getForms(token).then((f) => {
        dispatch(setForms({ forms: f }));
      });
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="form-builder-container">
            <FormBuilderHeader />
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
              editedInput={editedInput}
              token={token}
            />
          }
        >
          {/* Show floating 'add form' button */}
          <Route
            path=""
            element={
              <Link to="add" className="form-builder-add-form-button">
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            }
          />
          {/* add a new input to the form */}
          <Route
            path=":action"
            element={
              <InputEditor
                editedInput={editedInput}
                setEditedInput={setEditedInput}
                form={form}
                setForm={setForm}
              />
            }
          />

          {/* edit form input */}
          <Route
            path="edit-input/:index"
            element={
              <InputEditor
                editedInput={editedInput}
                setEditedInput={setEditedInput}
                form={form}
                setForm={setForm}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default FormBuilder;
