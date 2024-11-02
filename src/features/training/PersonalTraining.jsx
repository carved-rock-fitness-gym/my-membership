import React, { useState } from 'react';
import { TrainerList } from './components/TrainerList';
import { SessionBooking } from './components/SessionBooking';
import { ProgressTracker } from './components/ProgressTracker';

export const PersonalTraining = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Personal Training</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrainerList
          onTrainerSelect={(trainer) => {
            setSelectedTrainer(trainer);
            setShowBooking(true);
          }}
        />
        {selectedTrainer && showBooking && (
          <SessionBooking
            trainer={selectedTrainer}
            onBookingComplete={() => setShowBooking(false)}
          />
        )}
      </div>
      <ProgressTracker />
    </div>
  );
};