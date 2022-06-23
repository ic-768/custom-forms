import { MultipleChoiceOption } from "components/inputs/inputComponents/MultipleChoiceInput";
import { FormEventHandler } from "react";
import { FormProps } from "resources/shared";
import { asyncSubmitForm } from "services/forms";
import { useNotification } from "store/hooks";
import { formatSubmissions } from "../helpers";

const useSubmitForm = (): ((
  form: FormProps,
  submissions: (string | MultipleChoiceOption[])[],
  user?: string
) => FormEventHandler) => {
  const notify = useNotification();
  return (form, submissions, user) => (e) => {
    e.preventDefault();
    if (!user) return;

    const formattedSubmissions = formatSubmissions(form, submissions);

    try {
      asyncSubmitForm(user, form._id, formattedSubmissions);
      notify(
        { message: "Thank you for your submission!", type: "success" },
        5000
      );
    } catch {
      notify({ message: "Something went wrong", type: "error" }, 5000);
    }
  };
};

export default useSubmitForm;
