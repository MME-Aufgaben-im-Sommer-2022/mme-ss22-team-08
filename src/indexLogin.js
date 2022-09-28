// eslint-disable-next-line no-undef
const client = new Appwrite.Client(),
  // eslint-disable-next-line no-undef
  account = new Appwrite.Account(client),
  // eslint-disable-next-line no-undef
  database = new Appwrite.Databases(client, "6324444bf0c125e7623c");

let stateSignIn = false;

//Setting up Server connection to the Appwrite Server
function setupServerConnection() {
  client
    .setEndpoint(
    "https://appwrite.software-engineering.education/v1") // Your API Endpoint
    .setProject("62f0ca546a9a137d9df7");
}

//Tries to login user via presented email and password
//Creates a new document if its a first time user
function loginUserSession(email, password, createNewDocument) {
  account.createEmailSession(email, password)
    .then(response => {
      setCookie("userId", response.userId);
      if (createNewDocument) {
        createDocument(response.userId);
      } else {
        window.location.replace("./pageMain.html");
      }
    }, error => {
      let message = document.querySelector(".errorMessage");
      switch (error.code) {
        case 401:
          message.innerHTML = "Falsche Email-Adresse und/oder Passwort";
          break;
        case 400:
          message.innerHTML = "Inkorrekte Email-Adresse oder Passwort";
          break;
        default:
          message.innerHTML = "Ein Fehler ist aufgetreten - Error: " + error
            .code;
          break;
      }
    });
}

//Creates the account in the Appwrite Server
function createUser(email, password, name) {
  // Register User
  account.create("unique()", email, password, name)
    .then(response => {
      setCookie("userId", response.$id);
      loginUserSession(email, password, true);
      //window.location.replace("./pageMain.html");
    }, error => {
      let message = document.querySelector(".errorMessage");
      switch (error.code) {
        case 409:
          message.innerHTML = "Account existiert bereits";
          break;
        case 400:
          message.innerHTML = "Inkorrekte Email-Adresse oder Passwort";
          break;
        default:
          message.innerHTML = "Ein Fehler ist aufgetreten - Error: " + error
            .code;
          break;
      }
    });
}

//Creates a new document in the Appwrite Database with the user Id as the documentId
function createDocument(user) {
  // eslint-disable-next-line no-undef
  const promise = database.createDocument("63244466832556b90656",
  user, { data: "{}" });

  promise.then(function(response) {
    console.log(response); // Success
    window.location.replace("./pageMain.html");
  }, function(error) {
    console.log(error); // Failure
  });
}

//Initiates the Login Page
function init() {
  setupServerConnection();
  let proceedButton = document.querySelector(".proceed"),
    toggleButton = document.querySelector(".toggleType"),
    inputEmail = document.querySelector(".email"),
    inputName = document.querySelector(".name"),
    inputPassword = document.querySelector(".password");
  makePageSignIn();
  //Takes the information from the inputs and tries to sign in/ sign up the user depending on the page state
  proceedButton.onclick = function() {
    if (stateSignIn) {
      loginUserSession(inputEmail.value, inputPassword.value, false);
    } else {
      createUser(inputEmail.value, inputPassword.value, inputName.value);
    }

  };
  //toggles the page state between signing in and signing up
  toggleButton.onclick = function() {
    if (stateSignIn) {
      makePageSignUp();
    } else {
      makePageSignIn();
    }
  };
}

//configures the page visuals to represent a sign in page
function makePageSignIn() {
  let usernameTag = document.querySelector(".nameTag"),
    usernameInput = document.querySelector(".name");
  usernameTag.remove();
  usernameInput.remove();
  document.querySelector(".proceed").innerHTML = "Anmelden";
  document.querySelector(".toggleType").innerHTML = "Registrieren";
  document.querySelector("h2").innerHTML = "Wilkommen zurück";
  stateSignIn = true;
}

//configures the page visuals to represent a sign up page
function makePageSignUp() {
  let container = document.querySelector(".Info"),
    usernameTag = document.createElement("p"),
    usernameInput = document.createElement("input");
  document.querySelector("h2").innerHTML = "Account erstellen";
  usernameTag.setAttribute("class", "nameTag");
  usernameTag.innerHTML = "Benutzername:";
  usernameInput.setAttribute("class", "name");
  container.insertBefore(usernameInput, container.firstChild);
  container.insertBefore(usernameTag, container.firstChild);
  document.querySelector(".proceed").innerHTML = "Registrieren";
  document.querySelector(".toggleType").innerHTML = "Anmelden";
  stateSignIn = false;
}

//Sets the userId as a cookie
function setCookie(name, value) {
  document.cookie = name + "=" + value;
}

init();