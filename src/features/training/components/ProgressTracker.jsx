// src/features/training/components/ProgressTracker.jsx
import React, { useState, useEffect } from 'react';
import { trainingService } from '../../../services/training';

export const ProgressTracker = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await trainingService.getTrainingHistory();
        setSessions(history);
      } catch (error) {
        console.error('Error fetching training history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Training Progress</h3>
        <p className="text-gray-500">Loading progress data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Training Progress</h3>
      
      <div className="space-y-6">
        {/* Progress Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Sessions</p>
            <p className="text-2xl font-bold text-blue-700">{sessions.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">This Month</p>
            <p className="text-2xl font-bold text-green-700">
              {sessions.filter(s => new Date(s.date).getMonth() === new Date().getMonth()).length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Types</p>
            <p className="text-2xl font-bold text-purple-700">
              {new Set(sessions.map(s => s.type)).size}
            </p>
          </div>
        </div>

        {/* Session History */}
        <div>
          <h4 className="text-md font-medium mb-3">Recent Sessions</h4>
          <div className="space-y-3">
            {sessions.map((session, index) => (
              <div 
                key={index}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{session.type}</p>
                    <p className="text-sm text-gray-500">with {session.trainer}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(session.date).toLocaleDateString()}
                  </span>
                </div>
                {session.notes && (
                  <p className="mt-2 text-sm text-gray-600">{session.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};