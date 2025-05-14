import DayCell from "./DayCell";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }

export default function Calendar({
  month,
  year,
  checkedSet,
  onToggleDay,
  today
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Prepare day cells
  let days = [];
  for (let i = 0; i < firstDayOfWeek; ++i) days.push(null);
  for (let d = 1; d <= daysInMonth; ++d) days.push(d);

  const isCurrentMonth = (today.year === year && today.month === month);

  return (
    <>
      <div className="grid grid-cols-7 text-center gap-1 mb-1 text-xs tracking-wide text-gray-500">
        {weekDays.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) =>
          <DayCell
            key={i}
            day={d}
            isToday={isCurrentMonth && d === today.day}
            checked={checkedSet.has(d)}
            onClick={d ? () => onToggleDay(d) : undefined}
          />
        )}
      </div>
    </>
  );
}
