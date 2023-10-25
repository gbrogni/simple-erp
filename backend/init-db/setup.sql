
do
$$
begin
  if not exists (select * from pg_user where usename = 'erp') then 
    CREATE USER erp WITH PASSWORD 'psd-erp-db';
    end if;
  end
$$
;

SELECT 'CREATE DATABASE erp' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'erp');

GRANT ALL PRIVILEGES ON DATABASE erp TO erp;
