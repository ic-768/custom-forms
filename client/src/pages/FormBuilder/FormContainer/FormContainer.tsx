import { useEffect } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";

import { TextInput } from "../../../components/inputs/inputComponents";
import { ICustomInput } from "../../../components/inputs/resources";
import CustomInput from "../../../CustomInput";
import IForm from "../../../resources/IForm";
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
  editedInput: ICustomInput | null;
  token: string | null;
}) => {
  const navigate = useNavigate();
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
          <div key={i}>
            <CustomInput input={input} />
            {/* link to edit this specific input */}
            <div onClick={() => navigate(`edit-input/${i}`)}>edit input</div>
          </div>
        ))}
        {editedInput && <CustomInput input={editedInput} />}
      </div>
      <button onClick={onPublish}>PUBLISH CHANGES</button>
      <Outlet />
    </div>
  );
};

export default FormContainer;
