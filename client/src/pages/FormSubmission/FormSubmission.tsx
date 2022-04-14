import { useParams } from "react-router-dom";
import { asyncGetForm } from "../../services/forms";

const FormSubmission = () => {
  const params = useParams();
  asyncGetForm(params.user!, params.formId!).then((res) => {
    console.log(res);
  });

  return <div>form submission</div>;
};

export default FormSubmission;
