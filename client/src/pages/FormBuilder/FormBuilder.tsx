import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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
  const [editedForm, setEditedForm] = useState<IForm>({
    name: "Your New Form!",
    inputs: [],
  });

  // Edited input draft for input editor. Contains the input and its index in the form
  const [editedInput, setEditedInput] = useState<{
    input: ICustomInput;
    index: number;
  } | null>(null);

  // populate user's forms
  useEffect(() => {
    if (token && !forms.length) {
      getForms(token).then((f) => {
        dispatch(setForms({ forms: f }));
      });
    }
  }, [dispatch, forms.length]);

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
        {/* either an id or 'new' */}
        <Route
          path=":id"
          element={
            <FormContainer
              form={editedForm}
              forms={forms}
              setForm={setEditedForm}
              editedInput={editedInput}
              token={token}
            />
          }
        >
          {/* Add a new form */}
          <Route
            path=""
            element={
              <div
                onClick={() => {
                  setEditedForm({
                    ...editedForm,
                    inputs: editedForm.inputs.concat({ type: "Text" }),
                  });
                }}
                className="form-builder-add-form-button"
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            }
          />

          {/* edit form input */}
          <Route
            path="edit-input/:index"
            element={
              <InputEditor
                editedInput={editedInput}
                setEditedInput={setEditedInput}
                form={editedForm}
                setForm={setEditedForm}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default FormBuilder;
