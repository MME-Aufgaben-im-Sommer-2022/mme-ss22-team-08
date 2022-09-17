// eslint-disable-next-line no-undef
const client = new Appwrite.Client(),
    // eslint-disable-next-line no-undef
    account = new Appwrite.Account(client),
    // eslint-disable-next-line no-undef
    database = new Appwrite.Databases(client,"6324444bf0c125e7623c");

function setupServerConnection() {
    client
        .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
        .setProject("62f0ca546a9a137d9df7");
}

function loginUserSession(email, password, createNewDocument) {
    account.createEmailSession(email, password)
        .then(response => {
            console.log(response);
            setCookie("userId", response.userId);
            if (createNewDocument) {
                createDocument(response.userId);
            } else {
                window.location.replace("./pageMain.html");
            }
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
            loginUserSession(email, password, true);
            //window.location.replace("./pageMain.html");
        }, error => {
            console.log(error);
        });
}

function createDocument(user) {

    // eslint-disable-next-line no-undef
    const promise = database.createDocument('63244466832556b90656', user, {data: "{}"});

    promise.then(function (response) {
        console.log(response); // Success
        window.location.replace("./pageMain.html");
    }, function (error) {
        console.log(error); // Failure
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
        loginUserSession(inputEmail.value, inputPassword.value, false);
    };

    signUpButton.onclick = function() {
        createUser(inputEmail.value, inputPassword.value, inputName.value);
    };
}

function setCookie(name, value) {
    document.cookie = name + "=" + value;
}

init();