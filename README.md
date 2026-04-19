# Node.js Express TypeScript API with PostgreSQL

A scalable, production-ready REST API built with Node.js, Express, TypeScript, and PostgreSQL, containerized with Docker.

## 🚀 Features

- ✅ **TypeScript** - Type-safe code
- ✅ **Express.js** - Fast, minimalist web framework
- ✅ **PostgreSQL** - Robust relational database
- ✅ **TypeORM** - Modern ORM for TypeScript
- ✅ **Docker & Docker Compose** - Containerized application
- ✅ **Validation** - Request validation with express-validator
- ✅ **Error Handling** - Centralized error handling
- ✅ **Security** - Helmet.js for security headers
- ✅ **CORS** - Cross-Origin Resource Sharing enabled
- ✅ **Logging** - Morgan for HTTP request logging
- ✅ **Hot Reload** - Nodemon for development

## 📁 Project Structure

```
nodejs-express-ts-api/
├── src/
│   ├── config/           # Configuration files
│   │   └── database.ts   # Database configuration
│   ├── entities/         # TypeORM entities
│   │   └── User.ts
│   ├── repositories/     # Data access layer
│   │   └── UserRepository.ts
│   ├── services/         # Business logic layer
│   │   └── UserService.ts
│   ├── controllers/      # Request handlers
│   │   └── UserController.ts
│   ├── routes/           # API routes
│   │   ├── index.ts
│   │   └── userRoutes.ts
│   ├── middlewares/      # Custom middlewares
│   │   ├── errorHandler.ts
│   │   └── userValidation.ts
│   ├── utils/            # Utility functions
│   │   └── AppError.ts
│   ├── migrations/       # Database migrations
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── .env                  # Environment variables
├── .env.example          # Example environment variables
├── docker-compose.yml    # Production Docker Compose
├── docker-compose.dev.yml # Development Docker Compose
├── Dockerfile            # Production Dockerfile
├── Dockerfile.dev        # Development Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js 4.19
- **Language**: TypeScript 5.5
- **Database**: PostgreSQL 16
- **ORM**: TypeORM 0.3
- **Validation**: express-validator
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Container**: Docker & Docker Compose

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)
- npm or yarn

## 🚀 Getting Started

### Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nodejs-express-ts-api
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run with Docker Compose**

   **Production:**

   ```bash
   docker-compose up -d
   ```

   **Development (with hot reload):**

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

4. **Access the application**
   - API: http://localhost:4000
   - Health Check: http://localhost:4000/api/v1/health
   - pgAdmin: http://localhost:5050 (admin@admin.com / admin)

### Local Development (Without Docker)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Setup PostgreSQL**
   - Install PostgreSQL locally
   - Create a database
   - Update `.env` with your database credentials

3. **Run the application**

   **Development:**

   ```bash
   npm run dev
   ```

   **Build:**

   ```bash
   npm run build
   ```

   **Production:**

   ```bash
   npm start
   ```

## 📚 API Endpoints

### Base URL: `http://localhost:4000/api/v1`

### Health Check

```
GET /health
```

### Users

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | /users       | Get all users       |
| GET    | /users/:id   | Get user by ID      |
| GET    | /users/stats | Get user statistics |
| POST   | /users       | Create a new user   |
| PUT    | /users/:id   | Update user by ID   |
| DELETE | /users/:id   | Delete user by ID   |

### Example Requests

**Create User:**

```bash
curl -X POST http://localhost:4000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890"
  }'
```

**Get All Users:**

```bash
curl http://localhost:4000/api/v1/users
```

**Get User by ID:**

```bash
curl http://localhost:4000/api/v1/users/{user-id}
```

**Update User:**

```bash
curl -X PUT http://localhost:4000/api/v1/users/{user-id} \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "isActive": true
  }'
```

**Delete User:**

```bash
curl -X DELETE http://localhost:4000/api/v1/users/{user-id}
```

## 🔧 Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=4000

# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=myapp_db

# Application
API_PREFIX=/api/v1
```

## 🐳 Docker Commands

**Start services:**

```bash
docker-compose up -d
```

**Stop services:**

```bash
docker-compose down
```

**View logs:**

```bash
docker-compose logs -f app
```

**Rebuild containers:**

```bash
docker-compose up -d --build
```

**Remove volumes:**

```bash
docker-compose down -v
```

## 📊 Database Management

**Access PostgreSQL:**

```bash
docker exec -it nodejs-postgres psql -U postgres -d myapp_db
```

**pgAdmin:**

- URL: http://localhost:5050
- Email: admin@admin.com
- Password: admin

## 🧪 Testing the API

You can test the API using:

- **cURL** (see examples above)
- **Postman** (import the endpoints)
- **Thunder Client** (VS Code extension)
- **Insomnia**

## 🏗️ Scaling the Application

This project structure supports easy scaling:

1. **Add new resources**: Create entity → repository → service → controller → routes
2. **Add middleware**: Create in `middlewares/` folder
3. **Add utilities**: Create in `utils/` folder
4. **Database migrations**: Use TypeORM migration commands

## 📝 Scripts

```json
{
  "dev": "Run development server with hot reload",
  "build": "Build TypeScript to JavaScript",
  "start": "Run production server",
  "migration:generate": "Generate database migration",
  "migration:run": "Run database migrations",
  "migration:revert": "Revert last migration"
}
```

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation
- SQL injection prevention (TypeORM)
- Error handling without leaking sensitive info

## 📄 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email your-email@example.com or open an issue.
