export type Ride = {
  id: string;
  driverName: string;
  driverRating: number;
  carModel: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  seatsAvailable: number;
  duration: string;
  notes: string;
};

export const rideSearchDefaults = {
  pickup: 'Eko Jade Tower',
  dropoff: 'Airport Terminal',
  date: 'Today',
  time: '10:00 AM',
};

export const rides: Ride[] = [
  {
    id: 'ride-1',
    driverName: 'John Doe',
    driverRating: 4.9,
    carModel: 'Tesla Model 3',
    from: 'Eko Jade Tower',
    to: 'Airport Terminal',
    date: 'Today',
    time: '10:00 AM',
    price: 12,
    seatsAvailable: 2,
    duration: '35 min',
    notes: 'Quiet ride with phone charging available.',
  },
  {
    id: 'ride-2',
    driverName: 'Sarah Wilson',
    driverRating: 4.8,
    carModel: 'Toyota Camry',
    from: 'Downtown Hub',
    to: 'City Mall',
    date: 'Today',
    time: '11:30 AM',
    price: 15,
    seatsAvailable: 3,
    duration: '28 min',
    notes: 'Smooth city route, ideal for quick daytime trips.',
  },
  {
    id: 'ride-3',
    driverName: 'Mike Brown',
    driverRating: 4.7,
    carModel: 'Honda Civic',
    from: 'Tech Park',
    to: 'Westside Plaza',
    date: 'Today',
    time: '1:15 PM',
    price: 10,
    seatsAvailable: 1,
    duration: '22 min',
    notes: 'Fastest route with minimal stops.',
  },
];

export const myUpcomingRides = [
  {
    ...rides[0],
    status: 'Upcoming',
  },
  {
    ...rides[1],
    status: 'Confirmed',
  },
];

export const myPastRides = [
  {
    ...rides[2],
    status: 'Completed',
  },
];

export const accountMenuItems = [
  { id: 'profile', label: 'My Profile', icon: 'account-outline' },
  { id: 'vehicles', label: 'My Vehicles', icon: 'car-outline' },
  { id: 'payments', label: 'Payment Methods', icon: 'credit-card-outline' },
  { id: 'notifications', label: 'Notifications', icon: 'bell-outline' },
  { id: 'support', label: 'Help & Support', icon: 'help-circle-outline' },
  { id: 'settings', label: 'Settings', icon: 'cog-outline' },
];
