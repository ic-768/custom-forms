import { ReactElement } from "react";
import { useParams } from "react-router-dom";

import BackButton from "components/BackButton";
import FormComponent from "components/FormComponent";
import Form from "components/Form";
import { FormProps } from "resources/shared";
import useFormFromParam from "../../hooks/useFormFromParam";

import "./FormPreview.scss";

const FormPreview = ({
  forms,
  form,
  setForm,
}: {
  forms: FormProps[];
  form: FormProps;
  setForm: (form: FormProps) => void;
}): ReactElement => {
  useFormFromParam(forms, form._id, useParams().id, setForm);
  return (
    <>
      <BackButton link={`/edit/${form._id}`} />
      <Form
        styles={form.styles}
        content={
          <>
            <h2 className="form-preview-form-name">{form.name}</h2>
            {form.components.map((i, idx) => (
              <FormComponent key={i.id || idx} component={i} />
            ))}
          </>
        }
      />
    </>
  );
};

export default FormPreview;
