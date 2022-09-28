// eslint-disable-next-line no-undef
const client = new Appwrite.Client(),
  // eslint-disable-next-line no-undef
  account = new Appwrite.Account(client),
  // eslint-disable-next-line no-undef
  database = new Appwrite.Databases(client, "6324444bf0c125e7623c");
// eslint-disable-next-line no-undef

//Gets the userId via the cookie
function getCookie(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    return match[2];
  }
  return null;
}

//Sets up the server connection to the Appwrite server
function setupServerConnection() {
  client
    .setEndpoint(
    "https://appwrite.software-engineering.education/v1") // Your API Endpoint
    .setProject("62f0ca546a9a137d9df7");
}

//Initiate the option page
function init() {
  setupServerConnection();
  let changeAmountButton = document.querySelector("#changeStartAmount"),
    changeMailButton = document.querySelector("#changeMail"),
    deleteItemsButton = document.querySelector("#deleteItems"),
    deleteSessionButton = document.querySelector("#deleteSession"),
    userId = getCookie("userId");
  //Gets the user document and sets the start amount to the new value
  changeAmountButton.onclick = function() {
    if (document.querySelector(".inputStartAmount").value === "") { return; }
    database.getDocument("63244466832556b90656", userId)
      .then(response => {
        let data = JSON.parse(response.data),
          meta = {
            updateDate: data[0].updateDate,
            startCredit: document.querySelector(".inputStartAmount").value,
          };
        data[0] = meta;
        updateData(JSON.stringify(data), userId);
      }, error => {
        console.log(error);
      });
  };
  //Changes the mail of the account
  changeMailButton.onclick = function() {
    let mailElement = document.querySelector(".inputNewMail"),
      passwordElement = document.querySelector(".inputPassword");
    account.updateEmail(mailElement.value, passwordElement.value)
      .then(response => {
        document.querySelector("#mailText").innerHTML =
          "Email-Adresse erfolgreich zu " + mailElement.value +
          " geändert.";
        mailElement.value = "";
        passwordElement.value = "";
        console.log(response);
      }, error => {
        console.log(error);
      });
  };
  //Deletes all entries in the user document
  deleteItemsButton.onclick = function() {
    let newData = {};
    database.updateDocument("63244466832556b90656", userId, { data: JSON
          .stringify(newData) })
      .then(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  };
  //Ends the user Session and brings the user back to the login screen
  deleteSessionButton.onclick = function() {
    document.cookie = "userId=";
    window.location.replace("./pageLogin.html");
  };
}

//Updates the data of the given document
function updateData(newData, userId) {
  database.updateDocument("63244466832556b90656", userId, { data: newData })
    .then(response => {
      console.log(response);
      //parseJsonDoc(response.data);
    }, error => {
      console.log(error);
    });
}

init();