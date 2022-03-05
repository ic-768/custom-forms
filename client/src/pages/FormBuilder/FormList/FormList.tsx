import { useNavigate } from "react-router-dom";

import IForm from "../../../resources/IForm";

/**
 * Responsible for displaying all the user's forms
 */
const FormList = ({ forms }: { forms: IForm[] }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>All Forms</h1>
      {forms.map((f) => (
        <div key={f._id || f.name} onClick={() => f._id && navigate(f._id)}>
          {f.name}
        </div>
      ))}
    </div>
  );
};

export default FormList;
