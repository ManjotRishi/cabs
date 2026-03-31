# Ride Backend

Production-ready Node.js + Express + MongoDB backend with JWT auth, refresh tokens, role-based auth, ride publishing, booking, and transaction-safe seat booking.

## Quick Start

1. Install MongoDB locally with replica set support, or use Docker Compose.
2. The project already has a local `.env` file configured for port `5000`.
3. Start the API:

```bash
npm run dev
```

4. Seed demo data:

```bash
npm run seed
```

## Docker Compose

If Docker is installed on your machine, you can start MongoDB with replica set init plus the API:

```bash
docker compose up --build
```

## Demo Users

All seeded users use password `Password123`.

- `admin@example.com`
- `driver@example.com`
- `rider@example.com`

## Useful Endpoints

- `GET /health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/rides/publish`
- `GET /api/v1/rides?page=1&limit=10&from=Delhi&to=Chandigarh&date=2026-04-02`
- `GET /api/v1/rides/:id`
- `POST /api/v1/rides/book`
- `GET /api/v1/rides/my-rides`
- `GET /api/v1/user/profile`
- `PATCH /api/v1/user/profile`

## Sample Requests

Register:

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "password": "Password123"
  }'
```

Login:

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "driver@example.com",
    "password": "Password123"
  }'
```

Publish ride:

```bash
curl -X POST http://localhost:5000/api/v1/rides/publish \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Delhi",
    "to": "Jaipur",
    "date": "2026-04-05T00:00:00.000Z",
    "time": "08:30",
    "price": 699,
    "seats": 4,
    "vehicle": "Toyota Innova",
    "notes": "Morning departure"
  }'
```

Book ride:

```bash
curl -X POST http://localhost:5000/api/v1/rides/book \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rideId": "RIDE_ID_HERE",
    "seats": 2
  }'
```
