const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employeeInfo = [
    {
        type: 'input',
        name: 'name',
        message: 'Name of Employee:'
    }, 
    {
        type: 'input',
        name: 'id',
        message: 'Emplyoee ID:'
    }, 
    {
        type: 'input',
        name: 'email',
        message: 'Employee\'s email address:'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Employee\'s position:',
        choices: [
            'manager',
            'engineer',
            'intern'
        ]
    }
]

const managerInfo = 
{
    type: 'input',
    name: 'office',
    message: 'Manger\'s office number:'
}

const engineerInfo = 
{
    type: 'input',
    name: 'github',
    message: 'Employee\'s github username:'
}

const internInfo = 
{
    type: 'input',
    name: 'school',
    message: 'School attending:'
}

function promptUser() {
    return inquirer.prompt(employeeInfo)
    .then(data => {
        if (data.role === 'manager') {
            return inquirer.prompt([managerInfo]);
        } else if (data.role === 'engineer') {
            return inquirer.prompt([engineerInfo]);
        } else {
            return inquirer.prompt([internInfo]);
        }
    })
}

promptUser();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

