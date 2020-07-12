CREATE TABLE shipments (
    id SERIAL PRIMARY KEY NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    lot VARCHAR(255) NOT NULL,
    batch VARCHAR(255) NOT NULL,
    sender VARCHAR(255) REFERENCES users(username),
    receiver VARCHAR(255) REFERENCES users(username)
);