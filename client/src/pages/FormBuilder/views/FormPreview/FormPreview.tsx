import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import FormComponent from "../../components/FormComponent";
import { IForm } from "../../resources/shared";

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
    <div className="form-preview-container">
      <Link className="form-editor-input-go-back-link" to={`/edit/${form._id}`}>
        <FontAwesomeIcon title="Go back" icon={faArrowLeft} />
      </Link>
      <div className="form-preview">
        <h2 className="form-preview-form-name">{form.name}</h2>
        {form.components.map((i, idx) => (
          <FormComponent key={i.id || idx} component={i} />
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
