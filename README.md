# DevHub Backend - Node.js Express TypeScript API

A scalable, production-ready REST API built with Node.js, Express 5, TypeScript, and PostgreSQL, containerized with Docker. This backend serves as the core engine for DevHub, managing organizations, branches, departments, and users with robust authentication.

## 🚀 Features

- ✅ **TypeScript** - Type-safe development with modern ES2022 features.
- ✅ **Express 5** - Utilizing the latest Express features and improved error handling.
- ✅ **PostgreSQL & TypeORM** - Reliable relational data management with modern ORM patterns.
- ✅ **JWT Authentication** - Secure token-based authentication and route protection.
- ✅ **Layered Architecture** - Clean separation of concerns (Controller -> Service -> Repository -> Entity).
- ✅ **Dockerized** - Ready for development and production with Docker Compose.
- ✅ **Validation** - Strict request validation using `express-validator`.
- ✅ **Centralized Error Handling** - Consistent error responses using a custom `AppError` class.
- ✅ **Security** - Hardened with Helmet.js, CORS, and Rate Limiting.

## 📁 Project Structure

```
DevHubBackend/
├── src/
│   ├── config/           # Database & App configurations
│   ├── controllers/      # Request handlers (User, Auth, Org, Branch, Dept)
│   ├── entities/         # TypeORM Database models
│   ├── middlewares/      # Auth, Validation, and Error middlewares
│   ├── repositories/     # Data access logic
│   ├── routes/           # API Route definitions
│   │   ├── publicRoutes/    # Publicly accessible (Auth, Health)
│   │   └── protectedRoutes/ # Restricted via JWT (Users, Orgs, etc.)
│   ├── services/         # Business logic layer
│   ├── utils/            # Shared utilities (ApiResponse, AppError)
│   ├── app.ts            # Express application setup
│   └── server.ts         # Server entry point
├── docker-compose.yml    # Production Docker configuration
├── docker-compose.dev.yml # Development Docker configuration
├── Dockerfile            # Production Dockerfile
├── Dockerfile.dev        # Development Dockerfile
├── Makefile              # Shortcut commands
├── .env                  # Environment variables
└── package.json
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express 5.2.x
- **Language**: TypeScript 5.9.x
- **Database**: PostgreSQL 16
- **ORM**: TypeORM 0.3.x
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
   cd DevHubBackend
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Ensure JWT_SECRET and DB credentials are set
   ```

3. **Run with Docker Compose**

   **Development (with Hot Reload):**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

   **Production:**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - API Base: `http://localhost:4000/api/v1`
   - Health Check: `http://localhost:4000/api/v1/health`

### Local Development (Without Docker)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   - Ensure PostgreSQL is running locally.
   - Create a database named `devhub_db` (or as per your `.env`).

3. **Run scripts**
   - `npm run dev`: Start development server with nodemon.
   - `npm run build`: Compile TypeScript to JavaScript.
   - `npm start`: Run the compiled production build.

## 📚 API Endpoints

### Public Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/health` | API Health check |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |
| POST | `/auth/refresh-token` | Refresh expired access token |

### Protected Routes (Requires Bearer Token)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Users** | `/users` | CRUD operations for users |
| **Organizations**| `/organizations` | Manage organization data |
| **Branches** | `/branches` | Manage branches within organizations |
| **Departments** | `/departments` | Manage departments within branches |

## 🔧 Key Environment Variables

```env
PORT=4000
NODE_ENV=development
API_PREFIX=/api/v1

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=devhub_db

# Security
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
```

## 📄 License

This project is licensed under the ISC License.
