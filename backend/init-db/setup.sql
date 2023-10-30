DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_user WHERE usename = 'erp') THEN
    CREATE USER erp WITH PASSWORD 'root123';
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'pg-technical-test') THEN
    CREATE DATABASE "pg-technical-test" WITH OWNER = erp;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS productCategories ( 
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    discount NUMERIC(10, 2) NOT NULL
);

INSERT INTO productCategories (id, name, discount)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Smartphones', 2.55),
  ('d825be17-84e3-4b72-bf6b-3cc11b7983cf', 'Furniture', 3),
  ('5e1e3ae3-6e72-4f4c-94eb-3d44af019e8b', 'Electronics', 4.3),
  ('8b71c4d7-fec1-47d0-8d92-6a822b161a1c', 'Appliances', 5),
  ('2a7d7d28-9f87-493e-a4f9-3f5b68ebc3e5', 'Refrigerators', 7.5);

CREATE TABLE IF NOT EXISTS products ( 
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    description TEXT NOT NULL,
    color VARCHAR(50) NOT NULL,
    productCategoryId UUID NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    promotionalPrice NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (id, name, description, color, productCategoryId, price, promotionalPrice)
VALUES
  ('9e37a0e6-1a9d-4a17-94c7-88eb144de547', 'iPhone', 'iPhone 15 Pro Max', 'Natural Titanium', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 10.999, 10.718);
  ('4f2f8e13-9630-4a7d-936d-c6f39d21025c', 'Wardrobe 4 doors, 6 drawers', 'Varnish', 'd825be17-84e3-4b72-bf6b-3cc11b7983cf', '799.89', 775.89),
  ('e6a07d14-d2d2-4e96-a6f2-dff0136e3836', 'Home theater Bluetooth wireless soundbar', 'Silver', '5e1e3ae3-6e72-4f4c-94eb-3d44af019e8b', 1299.00, 1243.14),
  ('5a16a56f-4d6d-4ab5-8a1c-00ec91601c35', 'Toaster Space for 66 slices of bread', 'Black', '8b71c4d7-fec1-47d0-8d92-6a822b161a1c', 149.90, 142.40),
  ('c50a13c0-4e62-4c77-bab3-8238d786f8b9', 'Refrigerator 2 doors with freezer', 'White', '2a7d7d28-9f87-493e-a4f9-3f5b68ebc3e5', 4789.89, 4430.64);

ALTER TABLE products
ADD CONSTRAINT fk_category
FOREIGN KEY (productCategoryId)
REFERENCES productCategories (id);