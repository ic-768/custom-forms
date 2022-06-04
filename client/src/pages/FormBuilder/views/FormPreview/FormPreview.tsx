import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormComponent from "../../components/FormComponent";
import BackButton from "../../components/BackButton";
import { IForm } from "../../resources/shared";
import FormPage from "../../../../components/FormPage";

import "./FormPreview.scss";

const FormPreview = ({
  forms,
  form,
  setForm,
}: {
  forms: IForm[];
  form: IForm;
  setForm: (form: IForm) => void;
}) => {
  const navigate = useNavigate();
  const params = useParams();

  // Set edited form based on url - navigate to home if none
  useEffect(() => {
    const paramId = params.id;
    if (form._id !== paramId) {
      const foundForm = forms.find((f) => f._id === paramId);
      if (!foundForm) {
        navigate("/");
      } else setForm(foundForm);
    }
  }, [form._id, forms, navigate, params.id, setForm]);

  return (
    <>
      <BackButton link={`/edit/${form._id}`} />
      <FormPage
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
