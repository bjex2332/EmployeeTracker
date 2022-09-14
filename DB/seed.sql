INSERT INTO role (title, salary, department_id)
VALUES ('Vice President', 150000, null);
INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Outbound Agent', 84500, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 96000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Customer Service', 35000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('HR Agent', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Trevor', 'Jex', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nicole', 'Rosser', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brandon', 'Jex', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brian', 'Anderson', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jessica', 'Lane', 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brian', 'Godfrey', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kyle', 'Vance', 5, 2);


INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Sales');
INSERT INTO department (department_name)
VALUES ('Accounting');
INSERT INTO department (department_name)
VALUES ('Human Resources');
INSERT INTO department (department_name)
VALUES ('Customer Service');