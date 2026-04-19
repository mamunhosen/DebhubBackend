.PHONY: help install dev build start docker-up docker-down docker-logs docker-restart clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

dev: ## Run development server locally
	npm run dev

build: ## Build the application
	npm run build

start: ## Start production server locally
	npm start

docker-up: ## Start Docker containers (production)
	docker-compose up -d

docker-up-dev: ## Start Docker containers (development)
	docker-compose -f docker-compose.dev.yml up

docker-down: ## Stop Docker containers
	docker-compose down

docker-down-dev: ## Stop Docker containers (development)
	docker-compose -f docker-compose.dev.yml down

docker-logs: ## View Docker logs
	docker-compose logs -f app

docker-logs-dev: ## View Docker logs (development)
	docker-compose -f docker-compose.dev.yml logs -f app

docker-restart: ## Restart Docker containers
	docker-compose restart

docker-build: ## Rebuild Docker containers
	docker-compose up -d --build

docker-build-dev: ## Rebuild Docker containers (development)
	docker-compose -f docker-compose.dev.yml up --build

clean: ## Remove node_modules and dist
	rm -rf node_modules dist

docker-clean: ## Remove Docker containers and volumes
	docker-compose down -v

db-shell: ## Access PostgreSQL shell
	docker exec -it nodejs-postgres psql -U postgres -d myapp_db

test-api: ## Test API health endpoint
	curl http://localhost:4000/api/v1/health
