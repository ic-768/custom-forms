import { FormEventHandler, useState } from "react";
import { FormAnswer, FormProps } from "resources/shared";
import { asyncSubmitForm } from "services/forms";
import { useNotification } from "store/hooks";
import { formatSubmissions } from "../helpers";

const useSubmitForm = (): ((
  form: FormProps,
  submissions: FormAnswer["value"][],
  user?: string
) => FormEventHandler) => {
  const notify = useNotification();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  return (form, submissions, user) => (e) => {
    e.preventDefault();
    if (!user) return;
    if (hasSubmitted) {
      notify(
        { message: "You've already made a submission", type: "success" },
        5000
      );
      return;
    }

    const formattedSubmissions = formatSubmissions(form, submissions);

    try {
      asyncSubmitForm(user, form._id, formattedSubmissions);
      notify(
        { message: "Thank you for your submission!", type: "success" },
        5000
      );
      setHasSubmitted(true);
    } catch {
      notify({ message: "Something went wrong", type: "error" }, 5000);
    }
  };
};

export default useSubmitForm;
