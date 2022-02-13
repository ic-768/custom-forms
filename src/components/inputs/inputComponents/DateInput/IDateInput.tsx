import { CSSProperties, Dispatch, SetStateAction } from "react";
import { DayValue } from "react-modern-calendar-datepicker";

interface IDateInput {
  onChange: Dispatch<SetStateAction<DayValue>>;
  label?: string;
  className?: string;
  placeholder?: string;
  date?: DayValue;
}

export default IDateInput;
