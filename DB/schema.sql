DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(69) NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(69) NOT NULL,
    last_name VARCHAR(69) NOT NULL,
    role_id INT NOT NUll,
    manager_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(69) NOT NULL,
    PRIMARY KEY(id)
);

