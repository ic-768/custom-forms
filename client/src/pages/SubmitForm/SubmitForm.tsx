import { FormEventHandler, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addOnChange, addState, formatSubmissions } from "./helpers";
import { asyncGetForm, asyncSubmitForm } from "services/forms";
import { FormInputProps } from "components/inputs/inputComponents";
import Form from "components/Form";
import FormComponent from "components/FormComponent";
import { FormProps, FormAnswer, isForm } from "resources/shared";
import { useNotification } from "store/hooks";

import "./SubmitForm.scss";

const SubmitForm = (): ReactElement | null => {
  const params = useParams();
  const notify = useNotification();
  const [form, setForm] = useState<FormProps>();

  // Array of answers - one for each form component
  const [submissions, setSubmissions] = useState<FormAnswer["value"][]>(
    Array(form?.components.length)
  );

  useEffect(() => {
    asyncGetForm(params.user!, params.formId).then((f) => {
      if (!form && isForm(f)) setForm(f);
    });

    setSubmissions(new Array(form?.components.length).fill("")); // fill submission array
  }, [params, form]);

  if (!form) return null;

  // Provide input components with onChange and state values
  const enrichComponent = (c: FormInputProps, idx: number): FormInputProps => {
    const withOnChange = addOnChange(c, idx, setSubmissions, submissions);
    return addState(withOnChange, idx, submissions);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const formattedSubmissions = formatSubmissions(form, submissions);

    try {
      asyncSubmitForm(params.user!, params.formId, formattedSubmissions);
      notify(
        { message: "Thank you for your submission!", type: "success" },
        5000
      );
    } catch {
      notify({ message: "Something went wrong", type: "error" }, 5000);
    }
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
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SubmitForm;
