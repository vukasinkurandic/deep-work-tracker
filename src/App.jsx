import React, { useState, useEffect } from "react";

// Helper functions
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getToday() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

// Storage helpers
function loadCheckedDates() {
  try {
    return JSON.parse(localStorage.getItem("checkedDates") || "{}");
  } catch {
    return {};
  }
}
function saveCheckedDates(data) {
  localStorage.setItem("checkedDates", JSON.stringify(data));
}

const START_MONTH = 4; // 0-based index, May is 4
const START_YEAR = 2025;
const END_MONTH = 11;
const END_YEAR = 2025;

export default function App() {
  // Initial displayed month
  const [currentMonth, setCurrentMonth] = useState(START_MONTH);
  const [currentYear, setCurrentYear] = useState(START_YEAR);
  const [checkedDates, setCheckedDates] = useState({});
  
  useEffect(() => {
    setCheckedDates(loadCheckedDates());
  }, []);
  
  // Helper for storage key
  const getKey = (y, m) => `${y}-${String(m + 1).padStart(2, '0')}`;
  
  // Clicked day
  const toggleDay = (day) => {
    const key = getKey(currentYear, currentMonth);
    const days = new Set(checkedDates[key] || []);
    if (days.has(day)) days.delete(day);
    else days.add(day);
    
    const updated = { ...checkedDates, [key]: Array.from(days) };
    setCheckedDates(updated);
    saveCheckedDates(updated);
  };
  
  // Navigation logic
  const canGoPrev =
    currentYear > START_YEAR || (currentYear === START_YEAR && currentMonth > START_MONTH);
  const canGoNext =
    currentYear < END_YEAR || (currentYear === END_YEAR && currentMonth < END_MONTH);

  function goPrev() {
    if (!canGoPrev) return;
    if (currentMonth === 0) {
      setCurrentYear(y => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(m => m - 1);
    }
  }

  function goNext() {
    if (!canGoNext) return;
    if (currentMonth === 11) {
      setCurrentYear(y => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(m => m + 1);
    }
  }

  // For highlighting today
  const today = getToday();
  const isCurrentMonth = (today.year === currentYear && today.month === currentMonth);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0: Sunday

  // e.g. [Sun, Mon ...] header
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const key = getKey(currentYear, currentMonth);
  const checkedSet = new Set(checkedDates[key] || []);

  // Fill days array for grid including blanks for first week offset
  let days = [];
  for (let i = 0; i < firstDayOfWeek; ++i) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; ++d) {
    days.push(d);
  }

  // UI
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={goPrev} 
            disabled={!canGoPrev}
            className={`p-2 rounded hover:bg-gray-100 disabled:text-gray-300 transition`}
          >
            ◀
          </button>
          <div className="text-lg font-bold">{MONTHS[currentMonth]} {currentYear}</div>
          <button
            onClick={goNext}
            disabled={!canGoNext}
            className={`p-2 rounded hover:bg-gray-100 disabled:text-gray-300 transition`}
          >
            ▶
          </button>
        </div>
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center gap-1 mb-1 text-xs tracking-wide text-gray-500">
          {weekDays.map(day => <div key={day}>{day}</div>)}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            if (d == null) return <div key={i}></div>;
            let isToday = isCurrentMonth && d === today.day;
            let checked = checkedSet.has(d);
            return (
              <button
                key={i}
                onClick={() => toggleDay(d)}
                className={`
                  w-full aspect-square flex items-center justify-center
                  rounded-lg border
                  ${isToday 
                    ? "border-blue-400 text-blue-600 font-bold" 
                    : "border-transparent text-black"
                  }
                  ${checked 
                    ? "bg-green-100 border-green-500 shadow-inner relative"
                    : "bg-white"
                  }
                  hover:bg-blue-50 transition
                `}
                style={{ outline: checked ? '2px solid #22c55e' : undefined }}
              >
                <span className={`${checked ? "font-bold" : ""} z-10`}>
                  {d}
                </span>
                {checked &&
                  // Checkmark overlay
                  <span className="absolute bottom-1 right-1 text-green-500 text-xs z-20">
                    ✓
                  </span>
                }
              </button>
            );
          })}
        </div>
        <div className="mt-8 text-xs text-gray-500 text-center">
          Click dates to mark your deep work. Data stays in your browser.
        </div>
      </div>
    </div>
  );
}
