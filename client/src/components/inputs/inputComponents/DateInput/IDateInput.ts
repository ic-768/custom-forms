import { Dispatch, SetStateAction } from "react";
import { DayValue } from "react-modern-calendar-datepicker";
import { IInputStyles } from "../../../InputEditor/inputModifiers";

interface IDateInput {
  type?: "Date";
  onChange: Dispatch<SetStateAction<DayValue>>;
  label?: string;
  className?: string;
  placeholder?: string;
  date?: DayValue;
  styles?: IInputStyles;
  id?: string;
}

export default IDateInput;
