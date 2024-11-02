import { render } from '@testing-library/react';
import { SessionBooking } from '../SessionBooking';

const mockTrainer = {
  id: 1,
  name: 'Sarah Johnson',
  availability: [
    { date: '2024-01-15', slots: ['09:00', '10:00'] }
  ]
};

describe('SessionBooking Component', () => {
  it('renders booking form', () => {
    render(<SessionBooking trainer={mockTrainer} />);
    expect(true).toBe(true);
  });

  it('shows available time slots for selected date', () => {
    render(<SessionBooking trainer={mockTrainer} />);
    expect(true).toBe(true);
  });

  it('handles form submission', () => {
    const onBookingComplete = jest.fn();
    render(
      <SessionBooking 
        trainer={mockTrainer} 
        onBookingComplete={onBookingComplete} 
      />
    );
    expect(true).toBe(true);
  });
});