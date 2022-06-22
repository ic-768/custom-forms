import { Routes, Route, Outlet } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { token, asyncGetForms } from "services/forms";
import { useAppSelector, useWithLoader } from "store/hooks";
import { selectForms, setForms } from "store/features/forms/formsSlice";
import { emptyForm, FormProps } from "resources/shared";
import ConfirmationModal, {
  ConfirmationModalProps,
} from "components/ConfirmationModal";

import FormBuilderHeader from "./components/FormBuilderHeader";
import FormPreview from "./views/FormPreview";
import FormEditor from "./views/FormEditor";
import FormsView from "./views/FormsView";
import ResponsesView from "./views/ResponsesView";

import "./FormBuilder.scss";

const FormBuilder = (): ReactElement => {
  const dispatch = useDispatch();
  const forms = useAppSelector(selectForms);
  const withLoader = useWithLoader();

  // A draft of the currently edited form.
  // Any time an input edit is saved, this'll be updated with the new input
  const [editedForm, setEditedForm] = useState<FormProps>(emptyForm);

  const [haveFormsBeenFetched, setHaveFormsBeenFetched] =
    useState<boolean>(false);

  // used to display a confirmation message with actions attached to the buttons
  const [confirmation, setConfirmation] =
    useState<ConfirmationModalProps | null>(null);

  // populate user's forms on page load
  useEffect(() => {
    withLoader(async () => {
      if (token) {
        const userForms = await asyncGetForms(token);
        dispatch(setForms((userForms as FormProps[]) || []));
        setHaveFormsBeenFetched(true);
      }
    });
  }, [dispatch, withLoader]);

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="form-builder-container">
            {confirmation && <ConfirmationModal {...confirmation} />}
            <FormBuilderHeader />
            <Outlet />
          </div>
        }
      >
        {/* View all forms */}
        <Route
          path=""
          element={
            <FormsView
              forms={forms}
              setEditedForm={setEditedForm}
              haveFormsBeenFetched={haveFormsBeenFetched}
              setConfirmation={setConfirmation}
            />
          }
        />
        {/* Edit a form */}
        <Route
          path="edit/:id" // either id or 'new'
          element={
            <FormEditor
              forms={forms}
              editedForm={editedForm}
              setEditedForm={setEditedForm}
              token={token}
            />
          }
        />
        {/* View form's submissions */}
        <Route
          path="submissions/:id"
          element={<ResponsesView forms={forms} />}
        />

        {/* Preview a form */}
        <Route
          path=":id"
          element={
            <FormPreview
              forms={forms}
              form={editedForm}
              setForm={setEditedForm}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default FormBuilder;
