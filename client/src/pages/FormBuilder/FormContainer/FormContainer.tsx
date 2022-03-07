import { useEffect } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";

import TextInput from "../../../components/inputs/inputComponents/TextInput";
import CustomInput, {
  ICustomInput,
} from "../../../components/inputs/CustomInput";
import IForm from "../resources/IForm";
import { updateForm, postForm } from "../../../services/forms";

import "./FormContainer.scss";

/**
 * Component responsible for displaying a single form to the user
 */
const FormContainer = ({
  form,
  forms,
  setForm,
  newInput,
  editedInput,
  token,
}: {
  form: IForm;
  forms: IForm[];
  setForm: (form: IForm) => void;
  newInput: ICustomInput | null;
  editedInput: { input: ICustomInput; index: number } | null;
  token: string | null;
}) => {
  const formId = useParams().id;

  // Set form based on url param
  useEffect(() => {
    const foundForm = forms.find((f) => f._id === formId?.toString());

    if (foundForm && foundForm._id !== form._id) {
      setForm(foundForm);
    }
  }, [formId, form._id, forms, setForm]);

  // Create or update form
  const onPublish = () => {
    if (token)
      if (form._id) {
        // form already exists in db
        updateForm(form, token);
      } else {
        postForm(form, token);
      }
  };

  return (
    <div>
      <div className="form-container">
        <TextInput
          label="Form Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {form.inputs.map((input, i) => (
          <div className="form-container-input-container" key={i}>
            <CustomInput
              input={
                i === editedInput?.index && editedInput
                  ? editedInput.input
                  : input
              }
            />
            {/* link to edit this specific input */}
            <Link
              className="form-container-input-edit-link"
              to={`edit-input/${i}`}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Link>
          </div>
        ))}
        {newInput && <CustomInput input={newInput} />}
      </div>
      <div className="form-container-upload-form-button" onClick={onPublish}>
        <FontAwesomeIcon icon={faCloudUploadAlt} />
      </div>
      <Outlet />
    </div>
  );
};

export default FormContainer;
