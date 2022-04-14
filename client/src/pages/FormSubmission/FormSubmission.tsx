import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { asyncGetForm } from "../../services/forms";
import FormComponent from "../FormBuilder/components/FormComponent";
import { IForm } from "../FormBuilder/resources/shared";

import "./FormSubmission.scss";

const FormSubmission = () => {
  const params = useParams();
  const [form, setForm] = useState<IForm>();

  useEffect(() => {
    asyncGetForm(params.user!, params.formId!).then((f) => {
      if (!form) setForm(f);
    });
  }, [params, form]);

  return form ? (
    <div className="form-submission-view-background">
      <div className="form-submission-view-container">
        <div className="form-submission-view-form-container">
          <div className="form-submission-view-form-content">
            <h2 className="form-preview-form-name">{form.name}</h2>
            {form.components.map((i, idx) => (
              <FormComponent key={i.id || idx} component={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default FormSubmission;
