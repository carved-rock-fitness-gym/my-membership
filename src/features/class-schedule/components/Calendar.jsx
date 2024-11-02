// src/features/class-schedule/components/Calendar.jsx
import React from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export const Calendar = ({ selectedDate, onDateSelect }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <CalendarComponent
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md border"
      />
    </div>
  );
};