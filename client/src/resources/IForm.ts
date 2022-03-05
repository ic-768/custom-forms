import { ICustomInput } from "../components/inputs/resources";

interface IForm {
  name: string;
  inputs: ICustomInput[];
  _id?: string;
}

export default IForm;
