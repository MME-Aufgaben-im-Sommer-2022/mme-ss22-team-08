// eslint-disable-next-line no-undef
const client = new Appwrite.Client(),
    // eslint-disable-next-line no-undef
    account = new Appwrite.Account(client);

function setupServerConnection() {
    client
        .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
        .setProject("62f0ca546a9a137d9df7");
}

function loginUserSession(email, password) {
    account.createEmailSession(email, password)
        .then(response => {
            console.log(response);
            setCookie("userId", response.userId);
        }, error => {
            console.log(error);
        });
}

function createUser(email, password, name) {
    // Register User
    account.create('unique()', email, password, name)
        .then(response => {
            console.log(response);
            setCookie("userId", response.$id);
        }, error => {
            console.log(error);
        });
}

function init() {
    setupServerConnection();
    let signUpButton = document.querySelector(".signUp"),
        signInButton = document.querySelector(".signIn"),
        inputEmail = document.querySelector(".email"),
        inputName = document.querySelector(".name"),
        inputPassword = document.querySelector(".password");
    signInButton.onclick = function() {
        loginUserSession(inputEmail.value, inputPassword.value);
    };

    signUpButton.onclick = function() {
        createUser(inputEmail.value, inputPassword.value, inputName.value);
    };
}

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

init();