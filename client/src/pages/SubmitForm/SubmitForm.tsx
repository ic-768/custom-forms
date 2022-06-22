import { FormEventHandler, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addOnChange, addState } from "./helpers";
import { asyncGetForm, asyncSubmitForm } from "services/forms";
import { FormInputProps } from "components/inputs/inputComponents";
import Form from "components/Form";
import FormComponent from "components/FormComponent";
import {
  FormProps,
  FormAnswer,
  FormSubmission,
  isForm,
} from "resources/shared";

import "./SubmitForm.scss";

const SubmitForm = (): ReactElement | null => {
  const params = useParams();
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

    const formattedSubmissions = submissions
      // remove submissions with no value, and submissions created for text-description components
      .filter((c, i) => c && form.components[i].type !== "Text-Description")
      // add corresponding titles and types
      .map((value, i) => ({
        title: form.components[i].title,
        type: form.components[i].type,
        value,
      })) as FormSubmission;

    asyncSubmitForm(params.user!, params.formId, formattedSubmissions);
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
