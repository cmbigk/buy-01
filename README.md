# E-Commerce Microservices Platform

A comprehensive e-commerce platform built with Spring Boot microservices architecture and Angular frontend.

## Architecture Overview

### Microservices
1. **User Service** (Port 8081) - User authentication, registration, and profile management
2. **Product Service** (Port 8082) - Product CRUD operations (seller-only)
3. **Media Service** (Port 8083) - Image upload and management
4. **API Gateway** (Port 8080) - Routes requests and handles authentication

### Technologies
- **Backend**: Spring Boot 3.2.0, MongoDB, Kafka, JWT
- **Frontend**: Angular 17+
- **Infrastructure**: Docker, Docker Compose

## Features

### User Management
- User registration as CLIENT or SELLER
- JWT-based authentication
- Profile management
- Avatar upload for sellers (2MB limit)
- Password hashing with BCrypt

### Product Management
- CRUD operations (sellers only)
- Product image associations
- Kafka events for product changes
- Seller ownership validation

### Media Management
- Image upload with validation
- 2MB file size limit
- Image type validation
- Secure storage

### Security
- HTTPS encryption
- Role-based access control
- Password hashing and salting
- JWT token authentication
- Input validation
- Sensitive data protection

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Java 17+ (for local development)
- Node.js 18+ & npm (for frontend development)

### Running with Docker

```bash
# Clone and start
git clone https://github.com/cmbigk/buy-01.git
cd buy-01
docker-compose up --build
```

### Access Points
- Frontend: http://localhost:4200
- API Gateway: http://localhost:8080
- User Service: http://localhost:8081
- Product Service: http://localhost:8082
- Media Service: http://localhost:8083

## API Endpoints

### User Service
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (auth required)
- `PUT /api/auth/profile` - Update profile (auth required)
- `POST /api/auth/avatar` - Upload avatar (seller only)

### Product Service
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/{id}` - Update product (owner only)
- `DELETE /api/products/{id}` - Delete product (owner only)

### Media Service
- `POST /api/media/upload` - Upload media (seller only)
- `GET /api/media/{id}` - Get media by ID
- `DELETE /api/media/{id}` - Delete media (owner only)

## Testing with Postman

1. **Register as Seller**
```json
POST /api/auth/register
{
  "email": "seller@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Seller",
  "role": "SELLER"
}
```

2. **Login** to get JWT token

3. **Create Product** with Bearer token

4. **Upload Image** with product ID

## License

MIT License