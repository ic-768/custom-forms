import { useDispatch } from "react-redux";
import { FormProps, isForm } from "resources/shared";
import { asyncUpdateForm } from "services/forms";
import { updateForm } from "store/features/forms/formsSlice";
import { useNotification } from "store/hooks";

/**
 * Try to update a form in backend and then redux store.
 * Notifies if successful or not
 */
const useUpdateForm = (): ((
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
    successMessage = "Form updated successfully",
    errorMessage = "Something went wrong"
  ) => {
    if (!token) return Error("No token");
    if (!form.name) {
      notify({ type: "error", message: "Form name can't be empty" }, 5000);
      return Error("Empty form name");
    }
    try {
      const updatedForm = await asyncUpdateForm(form, token);
      if (isForm(updatedForm)) {
        dispatch(updateForm(updatedForm));
        notify({ type: "success", message: successMessage }, 5000);
        return updatedForm;
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

export default useUpdateForm;
