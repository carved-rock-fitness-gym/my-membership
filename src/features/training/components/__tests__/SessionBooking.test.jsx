import { render, screen, fireEvent } from '@testing-library/react';
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
    
    expect(screen.getByLabelText('Select Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Time')).toBeInTheDocument();
  });

  it('shows available time slots for selected date', () => {
    render(<SessionBooking trainer={mockTrainer} />);
    
    fireEvent.change(screen.getByLabelText('Select Date'), {
      target: { value: '2024-01-15' }
    });
    
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    const onBookingComplete = jest.fn();
    render(
      <SessionBooking 
        trainer={mockTrainer} 
        onBookingComplete={onBookingComplete} 
      />
    );
    
    fireEvent.change(screen.getByLabelText('Select Date'), {
      target: { value: '2024-01-15' }
    });
    fireEvent.change(screen.getByLabelText('Select Time'), {
      target: { value: '09:00' }
    });
    fireEvent.click(screen.getByText('Book Session'));
    
    expect(onBookingComplete).toHaveBeenCalled();
  });
});