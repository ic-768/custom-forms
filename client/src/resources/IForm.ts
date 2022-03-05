import { ICustomInput } from "../components/inputs/resources";

interface IForm {
  name: string;
  inputs: ICustomInput[];
  id?: string;
}

export default IForm;
