-- Initialize the databases if they don't exist
-- This script runs when the PostgreSQL container starts for the first time

-- Development database is already created by POSTGRES_DB env var
-- but we can add any additional initialization here

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Set up any additional database configurations
ALTER DATABASE transactions_tracker_dev SET timezone TO 'UTC';