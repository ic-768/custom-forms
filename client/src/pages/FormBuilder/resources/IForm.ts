import { ICustomInput } from "../../../components/inputs/CustomInput";

interface IForm {
  name: string;
  inputs: ICustomInput[];
  _id?: string;
}

export default IForm;
