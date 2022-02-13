import { Dispatch, SetStateAction } from "react";
import { TimePickerValue } from "react-time-picker";

interface ITimeInput {
  onChange: Dispatch<SetStateAction<TimePickerValue>>;
  value: TimePickerValue;
  className?: string;
  maxDetail?: "hour" | "minute" | "second";
  label?: string;
}

export default ITimeInput;
