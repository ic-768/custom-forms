import { v4 as uuid } from "uuid";

import { FormProps } from "resources/shared";

/**
 * Used to instantiate a new form
 */
export const emptyForm: FormProps = {
  name: "",
  components: [{ type: "Text", id: uuid() }],
  styles: {},
  submissions: [],
};
