ALTER TABLE PRODUCTS ADD COLUMN sequence_order INT,
ADD CONSTRAINT product_seq_order_key UNIQUE (category_id, sequence_order)
     DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE CATEGORIES ADD COLUMN sequence_order INT,
ADD CONSTRAINT categories_seq_order_key UNIQUE (sequence_order)
     DEFERRABLE INITIALLY DEFERRED;