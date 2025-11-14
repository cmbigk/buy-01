# Project Setup and Build Instructions

## Overview
This is a comprehensive E-Commerce Microservices platform. The project includes:
- **User Service**: Authentication, registration, and profile management
- **Product Service**: Product CRUD operations (to be implemented)
- **Media Service**: Image upload and management (to be implemented)
- **API Gateway**: Request routing and authentication (to be implemented)
- **Frontend**: Angular application (to be implemented)

## Current Status
✅ User Service - Complete with all functionalities
⏳ Product Service - To be implemented
⏳ Media Service - To be implemented
⏳ API Gateway - To be implemented  
⏳ Frontend - To be implemented

## Prerequisites
Before starting, ensure you have:
- Java 17 or higher
- Maven 3.8+
- Docker & Docker Compose
- Node.js 18+ & npm (for frontend)
- Postman (for API testing)

## Quick Start with Docker

```bash
# Start all services
docker-compose up --build

# Stop all services
docker-compose down

# Remove volumes and rebuild
docker-compose down -v
docker-compose up --build
```

## Local Development Setup

### User Service

```bash
cd user-service

# Build the project
mvn clean install

# Run the service
mvn spring-boot:run
```

The User Service will start on `http://localhost:8081`

## Testing the User Service

### 1. Register as a Seller

```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "role": "SELLER"
  }'
```

### 2. Register as a Client

```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@example.com",
    "password": "password123",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+0987654321",
    "role": "CLIENT"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@example.com",
    "password": "password123"
  }'
```

Response will include a JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": "user-id",
  "email": "seller@example.com",
  "role": "SELLER"
}
```

### 4. Get Profile (Authenticated)

```bash
curl -X GET http://localhost:8081/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Update Profile

```bash
curl -X PUT http://localhost:8081/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Updated",
    "phone": "+1111111111"
  }'
```

### 6. Upload Avatar (Seller Only)

```bash
curl -X POST http://localhost:8081/api/auth/avatar \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

## Database Access

### MongoDB (User Service)

```bash
# Connect to MongoDB container
docker exec -it mongodb-user mongosh

# Use the database
use userdb

# Authenticate
db.auth('admin', 'admin123')

# List all users
db.users.find()

# Find user by email
db.users.findOne({email: "seller@example.com"})
```

## Kafka Topics

The User Service publishes events to Kafka:
- `user-registered`: When a new user registers

### Viewing Kafka Messages

```bash
# Enter Kafka container
docker exec -it kafka /bin/bash

# View topics
kafka-topics --bootstrap-server localhost:9092 --list

# Consume messages from user-registered topic
kafka-console-consumer --bootstrap-server localhost:9092 \
  --topic user-registered --from-beginning
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 8081
lsof -i :8081

# Kill the process
kill -9 PID
```

### MongoDB Connection Issues

```bash
# Check MongoDB container status
docker ps | grep mongodb-user

# View MongoDB logs
docker logs mongodb-user

# Restart MongoDB container
docker restart mongodb-user
```

### Build Errors

```bash
# Clean Maven cache
mvn clean

# Skip tests
mvn clean install -DskipTests

# Update dependencies
mvn dependency:purge-local-repository
```

## Security Features

### Password Hashing
- All passwords are hashed using BCrypt with salt factor of 10
- Passwords are never stored in plain text
- Passwords are never returned in API responses

### JWT Token
- Tokens expire after 24 hours
- Secret key is configured in `application.properties`
- Tokens include user email and role information

### File Upload Security
- Maximum file size: 2MB
- Only image files (image/*) are allowed
- Files are validated before storage
- Unique filenames prevent collisions

### Access Control
- `/api/auth/register` and `/api/auth/login` are public
- All other endpoints require authentication
- Avatar upload is restricted to authenticated users
- Profile operations are restricted to the owner

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get current user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| POST | `/api/auth/avatar` | Upload avatar | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/{id}` | Get user by ID | Yes |

## Error Responses

All error responses follow this format:
```json
{
  "status": 400,
  "message": "Error description",
  "timestamp": "2025-11-14T10:30:00"
}
```

### Common Status Codes
- `200 OK`: Successful request
- `201 CREATED`: Resource created successfully
- `400 BAD REQUEST`: Invalid request data
- `401 UNAUTHORIZED`: Missing or invalid token
- `403 FORBIDDEN`: Insufficient permissions
- `404 NOT_FOUND`: Resource not found
- `409 CONFLICT`: Resource already exists
- `413 PAYLOAD_TOO_LARGE`: File size exceeds limit
- `500 INTERNAL_SERVER_ERROR`: Server error

## Next Steps

To complete the project, implement:
1. **Product Service**: CRUD operations for products
2. **Media Service**: Advanced media management
3. **API Gateway**: Centralized routing and authentication
4. **Frontend**: Angular application with all UI pages

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Docker logs: `docker logs <container-name>`
3. Verify environment variables in `docker-compose.yml`
4. Ensure all ports are available

## License

MIT License
