"use client";

import { useState } from "react";

export default function Home() {
  const [day, setday] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [errors, setErrors] = useState<{ day?: string; month?: string; year?: string; form?: string }>({});

  const isValidDate = (d: number, m: number, y: number) => {
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m - 1 ||
      date.getDate() !== d
    ) {
      return false;
    }
    const today = new Date();
    return date <= today; // cannot be in the future
  };

  const calculateAge = () => {
    const d = Number(day);
    const m = Number(month);
    const y = Number(year);

    const newErrors: { day?: string; month?: string; year?: string; form?: string } = {};
    if (!d) newErrors.day = "Required";
    if (!m) newErrors.month = "Required";
    if (!y) newErrors.year = "Required";

    if (!newErrors.day && (d < 1 || d > 31)) newErrors.day = "Must be 1-31";
    if (!newErrors.month && (m < 1 || m > 12)) newErrors.month = "Must be 1-12";
    if (!newErrors.year && y < 1) newErrors.year = "Invalid";

    if (Object.keys(newErrors).length === 0 && !isValidDate(d, m, y)) {
      newErrors.form = "Enter a valid date in the past";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setAge(null);
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const resultOrDash = (value?: number) => (value !== undefined ? value : "--");

  return (
    <main className="min-h-screen flex bg-gray-100 items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl rounded-br-[100px] shadow-lg w-full max-w-xl">
        <div className="flex flex-row gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="day" className="text-xs tracking-widest text-gray-500">DAY</label>
            <input
              id="day"
              type="number"
              placeholder="DD"
              value={day}
              onChange={(e) => setday(e.target.value)}
              className={`border rounded-md p-3 w-24 text-lg font-bold focus:outline-none ${errors.day ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.day && <span className="text-xs text-red-600">{errors.day}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="month" className="text-xs tracking-widest text-gray-500">MONTH</label>
            <input
              id="month"
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={`border rounded-md p-3 w-24 text-lg font-bold focus:outline-none ${errors.month ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.month && <span className="text-xs text-red-600">{errors.month}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="year" className="text-xs tracking-widest text-gray-500">YEAR</label>
            <input
              id="year"
              type="number"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={`border rounded-md p-3 w-28 text-lg font-bold focus:outline-none ${errors.year ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.year && <span className="text-xs text-red-600">{errors.year}</span>}
          </div>
        </div>

        <div className="relative flex items-center mb-6">
          <hr className="w-full border-gray-200" />
          <button
            type="button"
            onClick={calculateAge}
            aria-label="Calculate age"
            className="absolute right-0 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full w-14 h-14 grid place-items-center text-white"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M12 19l-6-6M12 19l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        {errors.form && (
          <div className="text-sm text-red-600 mb-2">{errors.form}</div>
        )}

        <div className="space-y-2">
          <div className="text-5xl font-extrabold italic leading-tight">
            <span className="text-purple-600 mr-2">{resultOrDash(age?.years)}</span>
            <span className="text-gray-900">years</span>
          </div>
          <div className="text-5xl font-extrabold italic leading-tight">
            <span className="text-purple-600 mr-2">{resultOrDash(age?.months)}</span>
            <span className="text-gray-900">months</span>
          </div>
          <div className="text-5xl font-extrabold italic leading-tight">
            <span className="text-purple-600 mr-2">{resultOrDash(age?.days)}</span>
            <span className="text-gray-900">days</span>
          </div>
        </div>
      </div>
    </main>
  );
}