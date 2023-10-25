CREATE TABLE IF NOT EXISTS products ( 
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    description TEXT NOT NULL,
    color VARCHAR(50) NOT NULL,
    productCategory VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    promotionalPrice NUMERIC(10, 2) NOT NULL,
);
