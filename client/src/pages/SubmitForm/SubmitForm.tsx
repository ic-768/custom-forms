import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addOnChange, addState } from "./helpers";
import { asyncGetForm } from "services/forms";
import { FormInputProps } from "components/inputs/inputComponents";
import Form from "components/Form";
import FormComponent from "components/FormComponent";
import { FormProps, FormAnswer, isForm } from "resources/shared";
import useSubmitForm from "./hooks/useSubmitForm";

import "./SubmitForm.scss";

const SubmitForm = (): ReactElement | null => {
  const { user, formIdFromUrl } = useParams();
  const [form, setForm] = useState<FormProps>();

  // Array of answers - one for each form component
  const [submissions, setSubmissions] = useState<FormAnswer["value"][]>(
    Array(form?.components.length)
  );
  const submit = useSubmitForm();

  useEffect(() => {
    asyncGetForm(user!, formIdFromUrl).then((f) => {
      if (!form && isForm(f)) setForm(f);
    });

    setSubmissions(new Array(form?.components.length).fill("")); // fill submission array
  }, [user, formIdFromUrl, form]);

  if (!form) return null;

  // Provide input components with onChange and state values
  const enrichComponent = (c: FormInputProps, idx: number): FormInputProps => {
    const withOnChange = addOnChange(c, idx, setSubmissions, submissions);
    return addState(withOnChange, idx, submissions);
  };

  return (
    <div className="submit-form-view-background">
      <Form
        styles={form.styles}
        className="submit-form-form"
        content={
          <>
            <h2 className="submit-form-form-name">{form.name}</h2>
            {form.components.map((c, idx) => (
              <FormComponent
                key={c.id || idx}
                component={
                  c.type === "Text-Description"
                    ? c
                    : enrichComponent(c as FormInputProps, idx)
                }
              />
            ))}
          </>
        }
        onSubmit={submit(form, submissions, user)}
      />
    </div>
  );
};

export default SubmitForm;
