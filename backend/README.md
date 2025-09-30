# Suendenbock Game Backend

Spring Boot backend for the "Finde den Sündenbock" game with authentication, caching, rate limiting, and observability features.

## Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with access and refresh tokens
- **Refresh token rotation** for enhanced security
- **Email verification flow** with token-based verification
- **Role-based access control** (USER, ADMIN)
- **BCrypt password encryption**

### ⚡ Rate Limiting
- **Spring AOP-based rate limiting** using Bucket4j
- Configurable capacity and refill rates per endpoint
- IP and user-based rate limiting

### 💾 Caching
- **Spring Cache** with Caffeine implementation
- Cached endpoints: user stats, leaderboard
- Automatic cache eviction on updates

### 📊 Observability
- **Micrometer metrics** exported to Prometheus
- **Spring Actuator** health checks and monitoring
- Custom application metrics

### 📧 Email Verification
- Async email sending with Spring Mail
- Token-based verification with expiry
- Customizable email templates

### 🔒 Security Features
- CORS configuration
- Stateless session management
- Admin-only endpoints with role checking

## Tech Stack

```
Framework:     Spring Boot 3.2.0
Language:      Java 17
Build Tool:    Maven
Database:      H2 (dev), PostgreSQL (prod)
Cache:         Caffeine
Security:      Spring Security + JWT
Monitoring:    Micrometer + Prometheus
API Docs:      SpringDoc OpenAPI
```

## Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- (Optional) Docker & Docker Compose
- (Optional) PostgreSQL for production

### Run with Maven

```bash
cd backend
mvn spring-boot:run
```

### Run with Script

```bash
cd backend
./start.sh
```

### Run with Docker Compose

```bash
cd backend
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 8080
- Prometheus on port 9090
- Grafana on port 3001

### Build

```bash
mvn clean package
java -jar target/suendenbock-backend-1.0.0.jar
```

## Configuration

### Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Then configure:

```bash
# JWT Secret (generate a secure random string)
JWT_SECRET=your-base64-encoded-secret-key

# Database (for production)
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/suendenbock
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres

# Email Configuration
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# CORS (add your frontend URLs)
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Generate JWT Secret

```bash
# Generate a random base64-encoded secret
echo -n "$(openssl rand -hex 32)" | base64
```

### Application Properties

Key configurations in `application.yml`:

- **JWT expiration**: 24 hours for access tokens, 7 days for refresh tokens
- **Rate limiting**: 100 requests per second (configurable per endpoint)
- **Cache TTL**: 5 minutes for user stats and leaderboard
- **Email verification**: 24 hours token expiry

## API Endpoints

### Authentication

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/auth/register` | Register new user | 10/min |
| POST | `/api/auth/login` | Login user | 20/min |
| POST | `/api/auth/refresh` | Refresh access token | - |
| GET | `/api/auth/verify-email?token=` | Verify email | - |

### Game Stats

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/game/stats` | Save game statistics | Yes |
| GET | `/api/game/stats` | Get user statistics | Yes |
| GET | `/api/game/leaderboard` | Get top 10 players | Yes |

### Admin

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/users` | Get all users | ADMIN |
| DELETE | `/api/admin/users/{id}` | Delete user | ADMIN |
| PUT | `/api/admin/users/{id}/verify` | Manually verify user | ADMIN |

### Monitoring

| Endpoint | Description |
|----------|-------------|
| `/actuator/health` | Health check |
| `/actuator/metrics` | Application metrics |
| `/actuator/prometheus` | Prometheus metrics |

### API Documentation

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

## Testing

Run unit and integration tests:

```bash
mvn test
```

Run with coverage:

```bash
mvn clean test jacoco:report
```

## Database

### H2 Console (Development)

Access at: http://localhost:8080/h2-console

- **JDBC URL**: `jdbc:h2:mem:suendenbock`
- **Username**: `sa`
- **Password**: (empty)

### PostgreSQL (Production)

```sql
CREATE DATABASE suendenbock;
```

Update `application.yml` or use environment variables.

## Monitoring

### Prometheus Metrics

Available at `/actuator/prometheus`:

- JVM metrics
- HTTP request metrics
- Cache statistics
- Custom application metrics

### Grafana Dashboard

Import the Prometheus metrics to Grafana for visualization.

## Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Generate strong JWT secret** - Use a cryptographically secure random string
3. **Enable HTTPS** in production
4. **Configure CORS** properly for your frontend domain
5. **Use PostgreSQL** in production (not H2)
6. **Monitor rate limits** and adjust as needed

## Development

### Adding New Endpoints

1. Create controller in `controller` package
2. Add `@RateLimited` annotation if needed
3. Use `@PreAuthorize` for role-based access
4. Document with OpenAPI annotations

### Adding New Cache

1. Add cache name to `CacheConfig`
2. Use `@Cacheable` on service methods
3. Use `@CacheEvict` for updates

### Custom Metrics

```java
@Autowired
private MeterRegistry meterRegistry;

Counter.builder("custom.metric")
    .register(meterRegistry)
    .increment();
```

## Deployment

### Docker

Build and run with Docker:

```bash
# Build the image
docker build -t suendenbock-backend .

# Run the container
docker run -p 8080:8080 \
  -e JWT_SECRET=your-secret \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/suendenbock \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=postgres \
  suendenbock-backend
```

### Docker Compose

Full stack with database and monitoring:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

Services:
- Backend: http://localhost:8080
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: suendenbock-backend
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: backend
        image: suendenbock-backend:latest
        ports:
        - containerPort: 8080
        env:
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: secret
```

## Troubleshooting

### Common Issues

1. **JWT validation fails**: Check that JWT_SECRET matches on all instances
2. **Email not sending**: Verify SMTP credentials and app password
3. **Rate limit too aggressive**: Adjust `@RateLimited` parameters
4. **Cache not working**: Verify `@EnableCaching` is present

## License

MIT License - Free for educational and activism purposes

---

**Built with ❤️ for critical thinking and democracy**
