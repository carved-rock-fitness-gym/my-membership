// src/features/class-schedule/components/ClassList.jsx
import React from 'react';
import { classScheduleService } from '../../../services/classSchedule';
import PropTypes from 'prop-types'

export const ClassList = ({ date, onClassSelect }) => {
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const data = await classScheduleService.getClassesByDate(date);
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [date]);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="text-center text-gray-500">Loading classes...</p>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="text-center text-gray-500">No classes available for this date.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Available Classes</h2>
      <div className="space-y-4">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onClassSelect(classItem)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{classItem.name}</h3>
                <p className="text-sm text-gray-500">Instructor: {classItem.instructor}</p>
                <p className="text-sm text-gray-500">Time: {classItem.time}</p>
                <p className="text-sm text-gray-500">Duration: {classItem.duration} minutes</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {classItem.enrolled}/{classItem.capacity} spots
                </span>
                <p className="text-xs text-gray-500 mt-1">{classItem.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ClassList.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	onClassSelect: PropTypes.func.isRequired
}