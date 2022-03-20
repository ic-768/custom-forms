import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { token } from "../../services/forms";
import { emptyForm, IEditedInput, IForm } from "./resources/shared";
import { getForms } from "../../services/forms";
import { useAppSelector, useWithLoader } from "../../store/hooks";
import { selectForms, setForms } from "../../store/features/forms/formsSlice";

import FormBuilderHeader from "./FormBuilderHeader";
import FormList from "./FormList";
import FormEditor from "./FormEditor";

import "./FormBuilder.scss";

const FormBuilder = () => {
  const dispatch = useDispatch();
  const forms = useAppSelector(selectForms);
  const withLoader = useWithLoader();

  // A draft of the currently edited form.
  // Any time an input edit is saved, this'll be updated with the new input
  const [editedForm, setEditedForm] = useState<IForm>(emptyForm);
  const [haveFormsBeenFetched, setHaveFormsBeenFetched] =
    useState<boolean>(false);

  // A draft input for input editor. Contains the currently edited input and its index in the form
  const [editedInput, setEditedInput] = useState<IEditedInput>(null);

  // populate user's forms on page load
  useEffect(() => {
    withLoader(async () => {
      if (token) {
        const userForms = await getForms(token);
        dispatch(setForms({ forms: userForms || [] }));
        setHaveFormsBeenFetched(true);
      }
    });
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
        <Route
          path=""
          element={
            <FormList
              setEditedForm={setEditedForm}
              haveFormsBeenFetched={haveFormsBeenFetched}
              forms={forms}
            />
          }
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
