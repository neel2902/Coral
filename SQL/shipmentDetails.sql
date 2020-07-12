CREATE TABLE shipmentdetails (
    id SERIAL PRIMARY KEY NOT NULL,
	shipmentid INT REFERENCES shipments(id),
    productid VARCHAR(255) REFERENCES products(id),
    quantity INT NOT NULL
);