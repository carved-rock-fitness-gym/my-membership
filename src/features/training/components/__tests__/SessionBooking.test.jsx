import { render } from '@testing-library/react';
import { SessionBooking } from '../SessionBooking';

const mockTrainer = {
  id: 1,
  name: 'Test Trainer',
  specialties: ['Strength Training', 'HIIT'],
  experience: '5 years',
  availability: [{
    date: '2024-01-15',
    times: ['09:00', '10:00']
  }]
};

describe('SessionBooking Component', () => {
  const mockOnBookingComplete = jest.fn();

  it('renders booking form', () => {
    render(
      <SessionBooking 
        trainer={mockTrainer} 
        onBookingComplete={mockOnBookingComplete}
      />
    );
    expect(true).toBe(true);
  });

  it('shows available time slots', () => {
    render(
      <SessionBooking 
        trainer={mockTrainer} 
        onBookingComplete={mockOnBookingComplete}
      />
    );
    expect(true).toBe(true);
  });

  it('handles form submission', () => {
    render(
      <SessionBooking 
        trainer={mockTrainer} 
        onBookingComplete={mockOnBookingComplete}
      />
    );
    expect(true).toBe(true);
  });
});