import React, { useState } from 'react';
import { Calendar } from './components/Calendar';
import { ClassList } from './components/ClassList';
import { BookingModal } from './components/BookingModal';

export const ClassSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Class Schedule</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        <ClassList 
          date={selectedDate}
          onClassSelect={(classItem) => {
            setSelectedClass(classItem);
            setShowBookingModal(true);
          }}
        />
      </div>
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        classData={selectedClass}
      />
    </div>
  );
};