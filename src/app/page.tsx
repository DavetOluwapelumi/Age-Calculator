"use client";

import { useState } from "react";

export default function Home() {
  const [day, setday] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!day || !month || !year) return;

    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  return (
    <main className="min-h-screen flex bg-gray-100 items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Inputs */}
        <h1 className="text-2xl font-bold">Age Calculator</h1>
        <div className="flex flex-col gap-4">
          <input type="number" placeholder="Day" value={day} onChange={(e) => setday(Number(e.target.value))} />
          <input type="number" placeholder="Month" value={month} onChange={(e) => setMonth(Number(e.target.value))} />
          <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(Number(e.target.value))} />
        </div>

        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={calculateAge}>Calculate Age</button>
      </div>

      {age && (
        <div className="text-2xl font-bold">
          {age.years} years, {age.months} months, {age.days} days
        </div>
      )}
    </main>
  )

}