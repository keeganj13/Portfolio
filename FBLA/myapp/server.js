const express = require('express');
const fs = require('fs');

// Constants
const port = 3000;
const usersJSON = require('./users.json');
let users = usersJSON.users;

// App
const app = express();
const server = app.listen(port, listening);

function listening() {
    console.log(`Running on http://127.0.0.1:${port}`)
}

app.use(express.static('login'));

app.get('/login/:user/:pass?', checkLogin);

function checkLogin(request, response) {
    let data = request.params;
    let username = data.user;
    let password = data.pass;
    let reply;
    if (!username || !password) {
        reply = {
            attempted: 1,
            status: -1
        };
    } else {
        let userExists = false;
        let correctPassAndUser = false;
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (username === user.username) {
                userExists = true;
                if (password === user.password) {
                    correctPassAndUser = true;
                }
            }
        }
        if (userExists && !correctPassAndUser) {
            reply = {
                attempted: 1,
                status: -2
            };
        } else if (!userExists && !correctPassAndUser) {
            reply = {
                attempted: 1,
                status: -3
            };
        } else if (userExists && correctPassAndUser) {
            reply = {
                attempted: 1,
                status: 1
            };
        }
    }
    response.send(reply);
}

app.get('/signup/:username/:password?', signUp);

function signUp(request, response) {
    let data = request.params;
    let username = data.username;
    let password = data.password;
    let reply;

    if (!username || !password) {
        reply = {
            attempted: 2,
            status: -1
        };
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
                attempted: 2,
                status: -4
            };
        } else {
            let newUser = {
                username: username,
                password: password
            };
            users.push(newUser);
            let newUsers = {
                users: users
            };
            fs.writeFile('users.json', JSON.stringify(newUsers), finished);

            function finished(err) {
                console.log('all set');
            }
            reply = {
                attempted: 2,
                status: 1
            };
        }
    }
    response.send(reply);
}

function generateKey(length) {
    let symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let key = "";
    for (let i = 0; i < length; i++) {
        key += symbols[randomInt(symbols.length - 1)];
    }
    console.log(key);
    return key;
}