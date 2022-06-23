import { useDispatch } from "react-redux";
import { FormProps, isForm } from "resources/shared";
import { asyncPostForm } from "services/forms";
import { addForm } from "store/features/forms/formsSlice";
import { useNotification } from "store/hooks";

/**
 * Try to post a new form to backend and update Redux store.
 * Notifies if successful or not
 */
const usePostForm = (): ((
  form: FormProps,
  token: string | null,
  successMessage?: string,
  errorMessage?: string
) => Promise<FormProps | Error>) => {
  const dispatch = useDispatch();
  const notify = useNotification();

  return async (
    form: FormProps,
    token: string | null,
    successMessage = "Form has been saved",
    errorMessage = "Something went wrong"
  ) => {
    if (!token) return Error("No token");
    if (!form.name) {
      notify({ type: "error", message: "Form name can't be empty" }, 5000);
      return Error("Empty form name");
    }
    try {
      const newForm = await asyncPostForm(form, token);
      if (isForm(newForm)) {
        dispatch(addForm(newForm));
        notify({ type: "success", message: successMessage }, 5000);
        return newForm;
      } else {
        notify({ type: "error", message: errorMessage }, 5000);
        return Error("Something wrong with form");
      }
    } catch {
      notify({ type: "error", message: errorMessage }, 5000);
      return Error("Request failed");
    }
  };
};

export default usePostForm;
