# Database Package (@repo/db)

This package contains the database configuration, schema, and utilities for the Transactions Tracker application.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ installed

### Setup Development Database

1. **Start the database:**
   ```bash
   npm run docker:up
   ```

2. **Run migrations and seed data:**
   ```bash
   npm run dev:setup
   ```

3. **Or do everything at once:**
   ```bash
   npm run dev:full  # from root directory
   ```

## 🐳 Docker Configuration

The setup includes two PostgreSQL containers:

### Development Database
- **Container**: `transactions-tracker-postgres-dev`
- **Port**: `5432`
- **Database**: `transactions_tracker_dev`
- **User**: `dev_user`
- **Password**: `dev_password`

### Test Database (Optional)
- **Container**: `transactions-tracker-postgres-test`
- **Port**: `5433`
- **Database**: `transactions_tracker_test`
- **User**: `test_user`
- **Password**: `test_password`

## 📋 Available Scripts

### Docker Management
```bash
# Start database in background
npm run docker:up

# Stop database
npm run docker:down

# View database logs
npm run docker:logs

# Restart database
npm run docker:restart

# Clean all data and volumes
npm run docker:clean

# Start test database
npm run docker:test

# Stop test database
npm run docker:test:down
```

### Database Operations
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate:dev

# Push schema without migrations
npm run db:push

# Seed database with sample data
npm run db:seed
```

### Development Workflows
```bash
# Complete setup: start docker + migrate + seed
npm run dev:setup

# Reset everything: clean + setup
npm run dev:reset

# Setup and start Next.js (from root)
npm run dev:full
```

## 🌍 Environment Variables

Copy `.env.example` to `.env` and modify as needed:

```env
# Development Database
POSTGRES_DB=transactions_tracker_dev
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password
POSTGRES_PORT=5432

# Database URLs for Prisma
DATABASE_URL="postgresql://dev_user:dev_password@localhost:5432/transactions_tracker_dev?schema=public"
```

## 🔧 Configuration

### Health Checks
Both containers include health checks to ensure they're ready:
- Interval: 10 seconds
- Timeout: 5 seconds
- Retries: 5

### Volumes
- `postgres_dev_data`: Persistent storage for development data
- `postgres_test_data`: Persistent storage for test data

### Networks
- `transactions_tracker_network`: Bridge network for service communication

## 🚫 Troubleshooting

### Port Already in Use
```bash
# Check what's using port 5432
lsof -i :5432

# Stop existing PostgreSQL service
brew services stop postgresql
# or
sudo systemctl stop postgresql
```

### Reset Database
```bash
# Complete reset with data loss
npm run dev:reset
```

### View Container Status
```bash
docker ps -a | grep transactions-tracker
```

### Connect to Database
```bash
# Using psql
psql -h localhost -p 5432 -U dev_user -d transactions_tracker_dev

# Using docker exec
docker exec -it transactions-tracker-postgres-dev psql -U dev_user -d transactions_tracker_dev
```

## 📁 File Structure

```
packages/database/
├── src/
│   ├── index.ts          # Package exports
│   └── seed.ts           # Database seeding script
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Migration files
├── init-scripts/
│   └── 01-init.sql      # Database initialization
├── docker-compose.yml    # Docker services configuration
├── .env.example         # Environment template
├── package.json         # Package configuration
└── README.md           # This file
```

## 🏗️ Architecture

This package follows monorepo best practices:

- **Self-contained**: All database-related code and configuration
- **Environment isolation**: Separate dev/test databases
- **Health monitoring**: Container health checks
- **Data persistence**: Named volumes for data safety
- **Network isolation**: Dedicated Docker network
- **Script consistency**: Uniform command interface

## 🧪 Testing

The test database runs on a separate port (5433) and can be managed independently:

```bash
# Start test database
npm run docker:test

# Run tests against test database
DATABASE_URL=$DATABASE_TEST_URL npm test
```