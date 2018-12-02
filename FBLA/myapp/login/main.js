const login = document.querySelector('#login');
const signup = document.querySelector('#signUp');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const output = document.querySelector('#output');

let users;

function setup() {
    noCanvas();
}

function handleData(data) {
    users = data;
    let status = users.status;
    let attempted = users.attempted;
    if (status > 0 && attempted === 1) {
        output.innerText = 'You have successfully logged in!';
    } else if (status > 0 && attempted === 2) {
        output.innerText = 'You have successfully signed up!';
    } else if (status === -1) {
        output.innerText = 'Username or Password was not entered.'
    } else if (status === -2) {
        output.innerText = 'The entered password is incorrect.'
    } else if (status === -3) {
        output.innerText = 'The entered username does not exist.'
    } else if (status === -4) {
        output.innerText = 'The entered username already exists.'
    }
    console.log(users);
}

login.onclick = function () {
    if (username.value !== "" || password.value !== "") {
        loadJSON(`/login/${username.value}/${password.value}`, handleData);
    }
    if (username.value === "") {
        console.log('Please Enter a Username');
    }

    if (password.value === "") {
        console.log('Please Enter a Password');
    }
}

signup.onclick = function () {
    if (username.value !== "" || password.value !== "") {
        loadJSON(`/signup/${username.value}/${password.value}`, handleData);
    }
    if (username.value === "") {
        console.log('Please Enter a Username');
    }

    if (password.value === "") {
        console.log('Please Enter a Password');
    }
}

function randomInt(min, max) {
    if (!isNaN(min) && !isNaN(max)) {
        return Math.round(Math.random());
    } else if (!isNaN(min) && isNaN(max)) {
        return Math.round(Math.random() * min);
    } else {
        return Math.round(Math.random() * (max - min) + min);
    }
}