import React, { useState, useEffect } from "react";
import MonthNavigation from "./components/MonthNavigation";
import Calendar from "./components/Calendar";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const START_MONTH = 4, START_YEAR = 2025, END_MONTH = 11, END_YEAR = 2025;

function getToday() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}
function getKey(y, m) { return `${y}-${String(m + 1).padStart(2, '0')}`; }
function loadCheckedDates() {
  try { return JSON.parse(localStorage.getItem("checkedDates") || "{}"); } catch { return {}; }
}
function saveCheckedDates(data) {
  localStorage.setItem("checkedDates", JSON.stringify(data));
}

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(START_MONTH);
  const [currentYear, setCurrentYear] = useState(START_YEAR);
  const [checkedDates, setCheckedDates] = useState({});
  useEffect(() => { setCheckedDates(loadCheckedDates()); }, []);

  const today = getToday();

  const canGoPrev = currentYear > START_YEAR || (currentYear === START_YEAR && currentMonth > START_MONTH);
  const canGoNext = currentYear < END_YEAR || (currentYear === END_YEAR && currentMonth < END_MONTH);
  function goPrev() {
    if (!canGoPrev) return;
    if (currentMonth === 0) {
      setCurrentYear(y => y - 1);
      setCurrentMonth(11);
    } else setCurrentMonth(m => m - 1);
  }
  function goNext() {
    if (!canGoNext) return;
    if (currentMonth === 11) {
      setCurrentYear(y => y + 1);
      setCurrentMonth(0);
    } else setCurrentMonth(m => m + 1);
  }

  const key = getKey(currentYear, currentMonth);
  const checkedSet = new Set(checkedDates[key] || []);
  const onToggleDay = (d) => {
    const days = new Set(checkedDates[key] || []);
    if (days.has(d)) days.delete(d); else days.add(d);
    const updated = { ...checkedDates, [key]: Array.from(days) };
    setCheckedDates(updated);
    saveCheckedDates(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <MonthNavigation
          month={currentMonth}
          year={currentYear}
          onPrev={goPrev}
          onNext={goNext}
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          months={MONTHS}
        />
        <Calendar
          month={currentMonth}
          year={currentYear}
          checkedSet={checkedSet}
          onToggleDay={onToggleDay}
          today={today}
        />
        <div className="mt-8 text-xs text-gray-500 text-center">
          Click dates to mark your deep work. Data stays in your browser.
        </div>
      </div>
    </div>
  );
}
