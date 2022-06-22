import { ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "components/BackButton";
import FormComponent from "components/FormComponent";
import Form from "components/Form";
import { FormProps } from "resources/shared";

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
  const navigate = useNavigate();
  const formIdFromUrl = useParams().id;

  // Set form based on url param - navigate to home if invalid id
  useEffect(() => {
    if (forms.length && form._id !== formIdFromUrl) {
      const foundForm = forms.find((f) => f._id === formIdFromUrl);
      if (foundForm) setForm(foundForm);
      else navigate("/");
    }
  }, [formIdFromUrl, forms, setForm, form._id, navigate]);

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
