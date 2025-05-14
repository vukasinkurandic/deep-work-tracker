export default function DayCell({ day, isToday, checked, onClick }) {
  if (!day) return <div></div>;

  return (
    <button
      onClick={onClick}
      className={`
        w-full aspect-square flex items-center justify-center
        rounded-lg border
        ${isToday ? "border-blue-400 text-blue-600 font-bold" : "border-transparent text-black"}
        ${checked ? "bg-green-100 border-green-500 shadow-inner relative" : "bg-white"}
        hover:bg-blue-50 transition
      `}
      style={{ outline: checked ? '2px solid #22c55e' : undefined }}
    >
      <span className={`${checked ? "font-bold" : ""} z-10`}>
        {day}
      </span>
      {checked &&
        <span className="absolute bottom-1 right-1 text-green-500 text-xs z-20">
          ✓
        </span>
      }
    </button>
  );
}
