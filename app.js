const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const util = require("util");
const open = require('open');



const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const writeFileAsync = util.promisify(fs.writeFile);

const managerInfo = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }, 
    {
        type: 'input',
        name: 'id',
        message: 'What is your your Employee ID?'
    }, 
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
    },
    {
        type: 'input',
        name: 'office',
        message: 'What is your office number?'
    }
]

const whichRole = [
    {
        type: 'list',
        name: 'role',
        message: 'Please select the position of the employee whose info you\'d like to input:',
        choices: [
            'engineer',
            'intern'
        ]
    }
]

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
    }
]

const engineerInfo = [
    {
        type: 'input',
        name: 'github',
        message: 'Employee\'s github username:'
    }
]

const internInfo = [
    {
        type: 'input',
        name: 'school',
        message: 'School attending:'
    }
]

let employees = [];

const enterAnotherEmployee = () => {
    return inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Would you like to enter in info for another employee?"
        }
      ])
      .then(val => {
        if (val.choice) {
          return promptTeamInfo();
        } else {
            open('output/team.html');
        }
      });
}

const promptTeamInfo = () => {
    return inquirer.prompt(whichRole)
        .then(data => {
            if (data.role === 'engineer') {
                return inquirer.prompt([...employeeInfo, ...engineerInfo])
                .then(data => {
                    employees.push(new Engineer(data.name, data.id, data.email, data.github))
                    return enterAnotherEmployee();
                })
                
            }
            if (data.role === 'intern') {
                return inquirer.prompt([...employeeInfo, ...internInfo])
                .then(data => {
                    employees.push(new Intern(data.name, data.id, data.email, data.school))
                    return enterAnotherEmployee();
                });
            }
        })
}

const promptUser = () => {
    return inquirer.prompt(managerInfo)
    .then(data => {
        employees.push(new Manager(data.name, data.id, data.email, data.office))
        return promptTeamInfo()
    })
    .then(function() {
        const teamHTML = render(employees);
        writeFileAsync(outputPath, teamHTML);
    })
    .catch(function(err) {
        console.log(err);
    });
}

promptUser();


