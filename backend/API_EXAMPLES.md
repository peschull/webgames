# API Usage Examples

This document provides examples of how to use the Suendenbock Backend API.

## Base URL

```
Local: http://localhost:8080
Production: https://your-domain.com
```

## Authentication Flow

### 1. Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securePassword123"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "33d8303d-2ac3-4e5a-a12f-a08212e1e558",
  "tokenType": "Bearer",
  "expiresIn": 86400000,
  "username": "testuser",
  "emailVerified": false
}
```

### 2. Verify Email

Check your email for the verification link or use the token from the database:

```bash
curl -X GET "http://localhost:8080/api/auth/verify-email?token=YOUR_VERIFICATION_TOKEN"
```

Response:
```
Email verified successfully
```

### 3. Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securePassword123"
  }'
```

Response: Same as registration

### 4. Refresh Access Token

When your access token expires (after 24 hours), use the refresh token:

```bash
curl -X POST "http://localhost:8080/api/auth/refresh?refreshToken=YOUR_REFRESH_TOKEN"
```

Response: New access and refresh tokens

## Game Statistics

### Save Game Statistics

After completing a game session:

```bash
curl -X POST http://localhost:8080/api/game/stats \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "questionsAnswered": 8,
    "correctAnswers": 6,
    "timeSpentSeconds": 120,
    "hintsUsed": 0
  }'
```

Response:
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "username": "testuser",
    ...
  },
  "questionsAnswered": 8,
  "correctAnswers": 6,
  "timeSpentSeconds": 120,
  "hintsUsed": 0,
  "completedAt": "2025-09-30T23:37:50.712293"
}
```

### Get User Statistics

Retrieve your game history:

```bash
curl -X GET http://localhost:8080/api/game/stats \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Response:
```json
[
  {
    "id": 1,
    "questionsAnswered": 8,
    "correctAnswers": 6,
    "timeSpentSeconds": 120,
    "hintsUsed": 0,
    "completedAt": "2025-09-30T23:37:50.712293"
  },
  ...
]
```

### Get Leaderboard

View top 10 players:

```bash
curl -X GET http://localhost:8080/api/game/leaderboard \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Response:
```json
[
  {
    "id": 1,
    "user": {
      "username": "player1"
    },
    "correctAnswers": 8,
    "timeSpentSeconds": 95,
    ...
  },
  ...
]
```

## Admin Endpoints

Requires ADMIN role.

### List All Users

```bash
curl -X GET http://localhost:8080/api/admin/users \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

### Delete User

```bash
curl -X DELETE http://localhost:8080/api/admin/users/1 \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

### Manually Verify User

```bash
curl -X PUT http://localhost:8080/api/admin/users/1/verify \
  -H "Authorization: Bearer YOUR_ADMIN_ACCESS_TOKEN"
```

## Monitoring Endpoints

### Health Check

```bash
curl -X GET http://localhost:8080/actuator/health
```

Response:
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "H2",
        "validationQuery": "isValid()"
      }
    },
    "diskSpace": {
      "status": "UP"
    },
    "ping": {
      "status": "UP"
    }
  }
}
```

### Prometheus Metrics

```bash
curl -X GET http://localhost:8080/actuator/prometheus
```

Returns metrics in Prometheus format.

## Error Handling

### Rate Limit Exceeded

```bash
# Making too many requests
curl -X POST http://localhost:8080/api/auth/login ...
```

Response (429 Too Many Requests):
```json
{
  "timestamp": "2025-09-30T23:37:50.712293",
  "status": 429,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded"
}
```

### Invalid Token

```bash
curl -X GET http://localhost:8080/api/game/stats \
  -H "Authorization: Bearer INVALID_TOKEN"
```

Response (403 Forbidden):
```json
{
  "timestamp": "2025-09-30T23:37:50.712293",
  "status": 403,
  "error": "Forbidden",
  "message": "Access Denied"
}
```

### Validation Errors

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ab",
    "email": "invalid-email",
    "password": "123"
  }'
```

Response (400 Bad Request):
```json
{
  "timestamp": "2025-09-30T23:37:50.712293",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    "Username must be between 3 and 50 characters",
    "Email must be valid",
    "Password must be at least 8 characters"
  ]
}
```

## Integration Examples

### JavaScript/TypeScript

```typescript
// Register user
const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  
  return await response.json();
};

// Save game stats
const saveGameStats = async (accessToken: string, stats: GameStats) => {
  const response = await fetch('http://localhost:8080/api/game/stats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(stats),
  });
  
  return await response.json();
};
```

### Python

```python
import requests

# Register user
def register_user(username, email, password):
    response = requests.post(
        'http://localhost:8080/api/auth/register',
        json={
            'username': username,
            'email': email,
            'password': password
        }
    )
    return response.json()

# Save game stats
def save_game_stats(access_token, stats):
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        'http://localhost:8080/api/game/stats',
        headers=headers,
        json=stats
    )
    return response.json()
```

## Testing with Swagger UI

1. Open http://localhost:8080/swagger-ui.html
2. Click "Authorize" button
3. Enter your access token in the format: `Bearer YOUR_TOKEN`
4. Try out the endpoints interactively

## WebSocket Support (Future Enhancement)

For real-time multiplayer features, WebSocket support can be added:

```javascript
const socket = new WebSocket('ws://localhost:8080/ws');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

socket.send(JSON.stringify({
  type: 'GAME_UPDATE',
  payload: { ... }
}));
```

## Best Practices

1. **Store tokens securely**: Use HttpOnly cookies or secure storage
2. **Handle token expiration**: Implement automatic refresh logic
3. **Rate limit client-side**: Don't hammer the API
4. **Validate input**: Client-side validation before API calls
5. **Error handling**: Gracefully handle all error responses
6. **HTTPS in production**: Always use HTTPS for API calls
