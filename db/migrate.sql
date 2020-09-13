DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(25),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

DROP TABLE IF EXISTS reports;
CREATE TABLE IF NOT EXISTS reports (
    week INT NOT NULL,
    title VARCHAR(255),
    description VARCHAR(6000)
);
