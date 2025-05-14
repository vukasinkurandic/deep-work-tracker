export default function MonthNavigation({ month, year, onPrev, onNext, canGoPrev, canGoNext, months }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={onPrev} disabled={!canGoPrev} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300 transition">◀</button>
      <div className="text-lg font-bold">{months[month]} {year}</div>
      <button onClick={onNext} disabled={!canGoNext} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300 transition">▶</button>
    </div>
  );
}
