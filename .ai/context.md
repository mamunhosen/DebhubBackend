# Project Context

## Architecture

- Layered architecture:
  controller → service → repository → entity
- No business logic in controllers
- Services handle orchestration and validation logic
- Repositories are the only layer interacting with TypeORM

## Tech Stack

- Node.js + Express + TypeScript
- TypeORM (Data Mapper pattern)
- PostgreSQL

## Conventions

- Use async/await only
- Use AppError for all custom errors
- All routes must go through validation middleware
- Controllers must not access DB directly

## Folder Responsibilities

- entities/: database schema
- repositories/: DB queries
- services/: business logic
- controllers/: HTTP layer
- routes/: route definitions

## Existing Patterns

- User module follows:
  UserController → UserService → UserRepository → User entity

## API Rules

- Base path: /api/v1
- Always return JSON
- Standard error format handled in errorHandler middleware
