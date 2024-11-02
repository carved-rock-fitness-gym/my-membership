// src/features/class-schedule/components/BookingModal.jsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PropTypes from 'prop-types'

export const BookingModal = ({ isOpen, onClose, classData }) => {
  if (!classData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Class</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">{classData.name}</h3>
            <p className="text-sm text-gray-500">Instructor: {classData.instructor}</p>
            <p className="text-sm text-gray-500">Time: {classData.time}</p>
            <p className="text-sm text-gray-500">Duration: {classData.duration} minutes</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle booking logic here
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

BookingModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	classData: PropTypes.shape({
		name: PropTypes.string.isRequired,
		instructor: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired
	}).isRequired
}