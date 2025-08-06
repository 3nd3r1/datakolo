.PHONY: dev db down

# Start all services for development
dev:
	docker compose up mongodb backend frontend

# Start only the mongodb database publicly
db:
	docker compose up mongodb-public

# Stop and remove all containers
down:
	docker compose down
