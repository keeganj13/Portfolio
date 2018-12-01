let login = document.querySelector('#login');
let signup = document.querySelector('#signUp');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let users;

function setup() {
    loadJSON('/all', handleData);
    noCanvas();
}

function handleData(data) {
    users = data;
    console.log(users)
}

login.onclick = function () {
    if (username.value !== "" || password.value !== "") {
        loadJSON(`/login/${username.value}/${password.value}`, handleData)
    }
    if (username.value === "") {
        console.log('Please Enter a Username')
    }

    if (password.value === "") {
        console.log('Please Enter a Password')
    }
}

signup.onclick = function () {
    if (username.value !== "" || password.value !== "") {
        loadJSON(`/signup/${username.value}/${password.value}`, handleData)
    }
    if (username.value === "") {
        console.log('Please Enter a Username')
    }

    if (password.value === "") {
        console.log('Please Enter a Password')
    }
}