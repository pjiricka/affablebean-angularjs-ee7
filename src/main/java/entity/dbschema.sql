CREATE TABLE product (id INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL, last_update TIMESTAMP, name VARCHAR(255), price DECIMAL(15,2), category_id SMALLINT, PRIMARY KEY (id));
CREATE TABLE customer (id INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL, address VARCHAR(255), cc_number VARCHAR(255), city_region VARCHAR(255), email VARCHAR(255), name VARCHAR(255), phone VARCHAR(255), PRIMARY KEY (id));
CREATE TABLE category (id SMALLINT GENERATED BY DEFAULT AS IDENTITY NOT NULL, name VARCHAR(255), PRIMARY KEY (id));
CREATE TABLE customer_order (id INTEGER GENERATED BY DEFAULT AS IDENTITY NOT NULL, amount DECIMAL(15), confirmation_number INTEGER, date_created TIMESTAMP, customer_id INTEGER, PRIMARY KEY (id));
CREATE TABLE ordered_product (quantity SMALLINT, customer_order_id INTEGER NOT NULL, product_id INTEGER NOT NULL, PRIMARY KEY (customer_order_id, product_id));
ALTER TABLE product ADD CONSTRAINT productcategory_id FOREIGN KEY (category_id) REFERENCES category (id);
ALTER TABLE customer_order ADD CONSTRAINT cstmrordercstmerid FOREIGN KEY (customer_id) REFERENCES customer (id);
ALTER TABLE ordered_product ADD CONSTRAINT rdrdprdctcstmrrdrd FOREIGN KEY (customer_order_id) REFERENCES customer_order (id);
ALTER TABLE ordered_product ADD CONSTRAINT rdrdproductprdctid FOREIGN KEY (product_id) REFERENCES product (id);