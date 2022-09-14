const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const util = require('util');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_DB'
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw err;
    menu();
})

console.table(
    "------------------------------------------",
    "------------------------------------------",
    "------------------------------------------",
    "------------------------------------------",
    "------------ EMPLOYEE TRACKER ------------",
    "------------------------------------------",
    "------------------------------------------",
    "------------------------------------------",
    "------------------------------------------"
)

function menu() {
    inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What is your course of action?',
            choices: [
                'Employees',
                'Departments',
                'Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Update an Employee Role',
                'Quit'
            ]
        }).then(function (input) {        
        switch (input.action) {
            case 'Employees':
                showEmp();
                break;
            case 'Departments':
                showDept();
                break;
            case 'Roles':
                showRole();
                break;
            case 'Add an Employee':
                newEmp();
                break
            case 'Add a Department':
                newDept();
                break
            case 'Add a Role':
                newRole();
                break
            case 'Update an Employee Role':
                empUpdate();
                break
            case 'Quit':
                connection.end();
                break;
        }
    });
}

function showEmp() {
    console.log('Current Employees');
        let query = 'SELECT * FROM employee';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let employeeInfo = [];
            res.forEach(employee => employeeInfo.push(employee));
            console.table(employeeInfo);
            menu();
        });
}

function showDept() {
    console.log('Current Departments');    
        let query = 'SELECT * FROM department';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let departmentInfo = [];
            res.forEach(department => departmentInfo.push(department));
            console.table(departmentInfo);
            menu();
        });
    
}

function showRole() {
    console.log('Current Roles');
    
        let query = 'SELECT * FROM role';
        connection.query(query, function (err, res) {
            if (err) throw err;
            let roleInfo = [];
            res.forEach(role => roleInfo.push(role));
            console.table(roleInfo);
            menu();
        });
}

const newEmp = async () => {
    try {
        console.log('Employee Add');
        let role = await connection.query("SELECT * FROM role");
        let manager = await connection.query("SELECT * FROM employee");
        let input = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "Employee's First Name?"
            },
            {
                name: 'lastName',
                type: 'input',
                message: "Employee's Last name?"
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: role.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "Employee's role id?"
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: manager.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "Employee's Manager's Id?"
            }
        ])

        await connection.query("INSERT INTO employee SET ?", {
            first_name: input.firstName,
            last_name: input.lastName,
            role_id: input.employeeRoleId,
            manager_id: input.employeeManagerId
        });

        console.log(`${input.firstName} ${input.lastName} added.\n`);
        menu();

    } catch (err) {
        console.log(err);
        menu();
    };
}

const newDept = async () => {
    try {
        console.log('Add a new Department');
        let input = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'New department name?'
            }
        ]);

        await connection.query("INSERT INTO department SET ?", {
            department_name: input.deptName
        });

        console.log(`${input.deptName} added.\n`)
        menu();

    } catch (err) {
        console.log(err);
        menu();
    };
}

const newRole = async () => {
    try {
        console.log('Role Add');
        let departments = await connection.query("SELECT * FROM department")
        let input = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'New role title?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'New role salary?'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'New role department ID?',
            }
        ]);
        
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === input.choice) {
                chosenDepartment = departments[i];
            };
        }
        await connection.query("INSERT INTO role SET ?", {
            title: input.title,
            salary: input.salary,
            department_id: input.departmentId
        })

        console.log(`${input.title} added.\n`)
        menu();

    } catch (err) {
        console.log(err);
        menu();
    };
}

const empUpdate = async () => {
    try {
        console.log('Employee Update');        
        let employees = await connection.query("SELECT * FROM employee");
        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Update which employee?'
            }
        ]);

        let role = await connection.query("SELECT * FROM role");
        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: role.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Which role to update to?'
            }
        ]);

        await connection.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);
        console.log(`Role updated.\n`);
        menu();

    } catch (err) {
        console.log(err);
        menu();
    };
}