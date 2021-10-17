CREATE TYPE PAYMENT_TYPE AS ENUM ('card', 'cash', 'unknown');

CREATE TABLE IF NOT EXISTS ORDERS (
    id SERIAL PRIMARY KEY ,
    customerName VARCHAR (35) NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_on TIMESTAMP WITH TIME ZONE,
    paid_on TIMESTAMP WITH TIME ZONE,
    payment_type INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS PRODUCT_ORDER (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    adjustment VARCHAR (100) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES ORDERS(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id) ON DELETE CASCADE
);