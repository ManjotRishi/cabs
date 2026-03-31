export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export const getInitials = (name: string) =>
  name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
