import { render, screen } from '@testing-library/react';
import { TrainerList } from '../TrainerList';

const mockTrainers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialties: ['Weight Training', 'HIIT'],
    experience: '8 years',
    rating: 4.8
  }
];

describe('TrainerList Component', () => {
  it('renders trainer cards correctly', () => {
    render(<TrainerList trainers={mockTrainers} />);
    
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Weight Training, HIIT')).toBeInTheDocument();
    expect(screen.getByText('8 years')).toBeInTheDocument();
  });

  it('displays rating correctly', () => {
    render(<TrainerList trainers={mockTrainers} />);
    expect(screen.getByText('4.8/5.0')).toBeInTheDocument();
  });

  it('handles empty trainer list', () => {
    render(<TrainerList trainers={[]} />);
    expect(screen.getByText('No trainers available')).toBeInTheDocument();
  });
});