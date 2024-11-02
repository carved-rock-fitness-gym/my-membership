import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MembershipManagement } from '../MembershipManagement';
import { membershipService } from '../../../services/membership';

jest.mock('../../../services/membership');

describe('MembershipManagement', () => {
  beforeEach(() => {
    membershipService.getCurrentMembership.mockResolvedValue({
      tier: 'Basic',
      status: 'active'
    });
  });

  it('should display membership tiers', () => {
    render(<MembershipManagement />);
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Elite')).toBeInTheDocument();
  });

  it('should handle membership upgrade', async () => {
    membershipService.upgradeMembership.mockResolvedValue({
      success: true,
      tier: 'Premium'
    });

    render(<MembershipManagement />);
    fireEvent.click(screen.getByText('Select Premium'));
    
    await waitFor(() => {
      expect(screen.getByText('Upgrade Successful')).toBeInTheDocument();
    });
  });

  it('should display error message on failed payment', async () => {
    membershipService.upgradeMembership.mockRejectedValue(new Error('Payment failed'));

    render(<MembershipManagement />);
    fireEvent.click(screen.getByText('Select Premium'));
    
    await waitFor(() => {
      expect(screen.getByText('Payment failed')).toBeInTheDocument();
    });
  });
});