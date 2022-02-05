import { Dispatch, SetStateAction } from "react";
import { DayValue } from "react-modern-calendar-datepicker";

interface IDateInput {
  className?: string;
  placeholder?: string;
  date?: DayValue;
  onChange: Dispatch<SetStateAction<DayValue>>;
}

export default IDateInput;
