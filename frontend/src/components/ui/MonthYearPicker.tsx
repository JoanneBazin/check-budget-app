import { useState } from "react";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

export const MonthYearPicker = ({
  onChange,
}: {
  onChange: (month: number, year: number) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onChange(date.getMonth() + 1, date.getFullYear());
    }
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="MMMM yyyy"
      showMonthYearPicker
      showFullMonthYearPicker
      locale={fr}
      className="picker-input"
    />
  );
};
