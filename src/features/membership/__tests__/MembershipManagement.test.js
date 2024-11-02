import { render } from '@testing-library/react';
import { MembershipManagement } from '../MembershipManagement';
import { membershipService } from '../../../services/membership';

jest.mock('../../../services/membership');

describe('MembershipManagement', () => {
	it('should render without crashing', () => {
		render(<MembershipManagement />);
	});

	it('should not throw errors', () => {
		expect(() => render(<MembershipManagement />)).not.toThrow();
	});

	it('should handle async operations', () => {
		membershipService.getCurrentMembership.mockResolvedValue({});
		render(<MembershipManagement />);
	});
});