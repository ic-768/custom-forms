import { Dispatch, SetStateAction } from "react";
import { TimePickerValue } from "react-time-picker";

import { IInputStyles } from "../../../InputEditor/inputModifiers";

interface ITimeInput {
  type?: "Time";
  onChange: Dispatch<SetStateAction<TimePickerValue>>;
  value: TimePickerValue;
  className?: string;
  maxDetail?: "hour" | "minute" | "second";
  label?: string;
  styles?: IInputStyles;
  id?: string;
}

export default ITimeInput;
