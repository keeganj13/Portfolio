const express = require('express');
const fs = require('fs');

// Constants
const port = 3000;
const json = require('./users.json');
let users = json.users;

// App
const app = express();
const server = app.listen(port, listening);

function listening() {
    console.log(`Running on ${port}`)
}

app.use(express.static('login'));

app.get('/all', (request, response) => {
    response.send(users);
});

app.get('/login/:user/:pass?', checkLogin);

function checkLogin(request, response) {
    let data = request.params;
    let username = data.user;
    let password = data.pass;
    let reply;
    if (!username || !password) {
        reply = {
            msg: "Username or password is missing.",
            status: 'failed'
        }
    } else {
        let usernameExists = false;
        let correctPassAndUser = false;
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (username === user.username) {
                usernameExists = true;
                if (password === user.password) {
                    correctPassAndUser = true;
                }
            }
        }
        if (usernameExists && !correctPassAndUser) {
            reply = {
                msg: 'The password you entered was incorrect',
                status: 'failed'
            }
        } else if (!usernameExists && !correctPassAndUser) {
            reply = {
                msg: 'That user does not exist',
                status: 'failed'
            }
        } else if (usernameExists && correctPassAndUser) {
            reply = {
                msg: 'You have successfully logged in',
                status: 'success'
            }
        }
    }
    response.send(reply)
}

app.get('/signup/:username/:password?', signUp);

function signUp(request, response) {
    let data = request.params;
    let username = data.username;
    let password = data.password;
    let reply;

    if (!username || !password) {
        reply = {
            msg: 'Please enter a username and a password',
            status: 'failed'
        }
    } else {
        let usernameExists = false;
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (username === user.username) {
                usernameExists = true;
            }
        }

        if (usernameExists) {
            reply = {
                msg: 'That username alreade exists. Please log in.',
                status: 'failed'
            }
        } else {
            let newUser = {
                username: username,
                password: password
            };
            users.push(newUser);
            let newUsers = {
                users: users
            }
            fs.writeFile('users.json', JSON.stringify(newUsers), finished);

            function finished(err) {
                console.log('all set');
            }
            reply = {
                msg: 'You have successfully signed up.',
                status: 'success'
            }
        }
    }
    response.send(reply);
}