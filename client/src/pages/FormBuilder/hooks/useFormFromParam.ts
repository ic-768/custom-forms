import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormProps } from "resources/shared";

/**
 *  Set form based on url param - navigate to home if invalid id
 */
const useFormFromParam = (
  forms: FormProps[],
  formId: FormProps["_id"],
  urlId: FormProps["_id"],
  setForm: (form: FormProps) => void
): void => {
  const navigate = useNavigate();

  return useEffect(() => {
    if (forms.length && formId !== urlId) {
      const foundForm = forms.find((f) => f._id === urlId);
      if (foundForm) setForm(foundForm);
      else if (urlId !== "new") navigate("/");
    }
  }, [forms, formId, urlId, setForm, navigate]);
};

export default useFormFromParam;
