# Missed It Backend (PHP)

A simple PHP backend for the Missed It application.

## Getting Started

1. **Install PHP** (if not already installed):
   ```bash
   # On macOS with Homebrew
   brew install php
   
   # On Ubuntu/Debian
   sudo apt install php
   ```

2. **Start the PHP development server**:
   ```bash
   cd backend
   php -S localhost:8000
   ```

3. **Test the API**:
   - Main endpoint: `http://localhost:8000/`
   - Events API: `http://localhost:8000/api/events`
   - Users API: `http://localhost:8000/api/users`

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events?id=1` - Get specific event
- `POST /api/events` - Create new event
- `PUT /api/events?id=1` - Update event
- `DELETE /api/events?id=1` - Delete event

### Users
- `GET /api/users` - Get all users
- `GET /api/users?id=1` - Get specific user
- `POST /api/users` - Create new user
- `PUT /api/users?id=1` - Update user

## Example Usage

### Create an event:
```bash
curl -X POST http://localhost:8000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title": "My Event", "date": "2025-12-01", "location": "Venue"}'
```

### Get all events:
```bash
curl http://localhost:8000/api/events
```

## Next Steps for Learning PHP

1. **Add a real database** (MySQL/PostgreSQL)
2. **Implement authentication** (JWT tokens)
3. **Add input validation** and sanitization
4. **Error handling** and logging
5. **Add middleware** for common tasks
6. **Learn about PHP frameworks** (Laravel, Symfony)

## File Structure
```
backend/
├── index.php       # Main entry point and routing
├── config.php      # Configuration and database connection
├── api/
│   ├── events.php  # Events API endpoints
│   └── users.php   # Users API endpoints
└── README.md       # This file
```