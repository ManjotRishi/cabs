import { formatPrice, getInitials } from '../src/utils/formatters';

describe('formatters', () => {
  it('formats price values', () => {
    expect(formatPrice(12)).toBe('$12.00');
  });

  it('creates initials from names', () => {
    expect(getInitials('Alex Johnson')).toBe('AJ');
  });
});
