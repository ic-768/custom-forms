import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { token } from "../../services/forms";
import ExistingInputEditor from "../../components/InputEditor/ExistingInputEditor";
import NewInputEditor from "../../components/InputEditor/NewInputEditor";
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
              editedInput={newInput}
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
            path="add"
            element={
              <NewInputEditor
                formId={form._id || "new"}
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
