import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { token } from "../../services/forms";
import { ICustomInput } from "../../components/inputs/CustomInput";
import IForm from "./resources/IForm";
import { getForms } from "../../services/forms";
import { useAppSelector } from "../../store/hooks";
import { selectForms, setForms } from "../../store/features/forms/formsSlice";

import FormBuilderHeader from "./FormBuilderHeader";
import FormList from "./FormList";
import FormEditor from "./FormEditor";

import "./FormBuilder.scss";

const FormBuilder = () => {
  const dispatch = useDispatch();
  const forms = useAppSelector(selectForms);

  // A draft of the currently edited form.
  // Any time an input edit is saved, this'll be updated with the new input
  const [editedForm, setEditedForm] = useState<IForm>({
    name: "Your New Form!",
    inputs: [],
  });

  // A draft input for input editor. Contains the input and its index in the form
  const [editedInput, setEditedInput] = useState<{
    input: ICustomInput;
    index: number;
  } | null>(null);

  // populate user's forms on page load
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
        <Route
          path=""
          element={<FormList setEditedForm={setEditedForm} forms={forms} />}
        />

        {/* View/edit a form */}
        <Route
          path=":id" // either id or 'new'
          element={
            <FormEditor
              forms={forms}
              editedForm={editedForm}
              setEditedForm={setEditedForm}
              editedInput={editedInput}
              setEditedInput={setEditedInput}
              token={token}
            />
          }
        ></Route>
      </Route>
    </Routes>
  );
};

export default FormBuilder;
