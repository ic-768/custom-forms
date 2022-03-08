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
  editedInput,
  token,
}: {
  form: IForm;
  forms: IForm[];
  setForm: (form: IForm) => void;
  editedInput: { input: ICustomInput; index: number } | null;
  token: string | null;
}) => {
  const formIdFromUrl = useParams().id;

  // Set form based on url param
  useEffect(() => {
    if (forms) {
      const foundForm = forms.find((f) => f._id === formIdFromUrl);
      if (foundForm && foundForm._id !== form._id) {
        setForm(foundForm);
      }
    }
  }, [formIdFromUrl, form._id, forms, setForm]);

  const onPublish = () => {
    if (token)
      if (form._id) {
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
        {form.inputs.map((input, i) => {
          const useEditedInput = i === editedInput?.index && editedInput.input;

          return (
            <div className="form-container-input-container" key={i}>
              <CustomInput input={useEditedInput ? editedInput.input : input} />
              <Link
                className="form-container-input-edit-link"
                to={`edit-input/${i}`}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="form-container-upload-form-button" onClick={onPublish}>
        <FontAwesomeIcon icon={faCloudUploadAlt} />
      </div>

      <Link
        // reset form to defaults
        onClick={() => {
          setForm({ name: "Your New Form!", inputs: [] });
        }}
        to="/"
      >
        Go Back
      </Link>
      <Outlet />
    </div>
  );
};

export default FormContainer;
