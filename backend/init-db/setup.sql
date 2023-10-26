DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_user WHERE usename = 'erp') THEN
    CREATE USER erp WITH PASSWORD 'root123';
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'pg-technical-test') THEN
    CREATE DATABASE "pg-technical-test";
    ALTER USER erp WITH PASSWORD 'root123';
    GRANT ALL PRIVILEGES ON DATABASE "pg-technical-test" TO erp;
  END IF;
END $$;

\c pg-technical-test 

CREATE TABLE IF NOT EXISTS products ( 
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    description TEXT NOT NULL,
    color VARCHAR(50) NOT NULL,
    productCategory VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    promotionalPrice NUMERIC(10, 2) NOT NULL
);