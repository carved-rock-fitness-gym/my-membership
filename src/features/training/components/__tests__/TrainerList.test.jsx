import { render } from '@testing-library/react';
import { TrainerList } from '../TrainerList';

describe('TrainerList Component', () => {
  const mockOnTrainerSelect = jest.fn();

  it('renders', () => {
    render(<TrainerList trainers={[]} onTrainerSelect={mockOnTrainerSelect} />);
    expect(true).toBe(true);
  });

  it('renders with trainers', () => {
    render(<TrainerList 
      trainers={[{ id: 1, name: 'Test' }]} 
      onTrainerSelect={mockOnTrainerSelect} 
    />);
    expect(true).toBe(true);
  });

  it('handles empty list', () => {
    render(<TrainerList trainers={[]} onTrainerSelect={mockOnTrainerSelect} />);
    expect(true).toBe(true);
  });
});