// eslint-disable-next-line no-undef
const client = new Appwrite.Client(),
  // eslint-disable-next-line no-undef
  database = new Appwrite.Databases(client, "6324444bf0c125e7623c");
// eslint-disable-next-line no-undef

let lastData = "";

//Gets the userId via the cookie
function getCookie(name) {
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    return match[2];
  }
  return null;
}

//Sets up the Appwrite server connection
function setupServerConnection() {
  client
    .setEndpoint(
    "https://appwrite.software-engineering.education/v1") // Your API Endpoint
    .setProject("62f0ca546a9a137d9df7");
}

//Initiates the savings page
function init() {
  setupServerConnection();
  let changeAmountButton = document.querySelector("button"),
    userId = getCookie("userId");
  getData(userId);
  changeAmountButton.onclick = function() {
    if (document.querySelector("input").value === "") { return; }
    updateData(lastData, userId);
  };
}

//Gets user document via the user id
function getData(userId) {
  database.getDocument("63244466832556b90656", userId)
    .then(response => {
      let data = JSON.parse(response.data);
      lastData = data;
      loadPage(data);
    }, error => {
      console.log(error);
    });
}

//Configures all the data shown on the page
function loadPage(data) {
  let date = new Date(),
    currentMonth = date.getMonth() + 1,
    currentGoal = data[0].savingGoal,
    currentProgress = 0,
    daysLeft = 30 - date.getDate(),
    weeksLeft = parseInt(daysLeft / 7) + 1;
  for (let i = 1; i < data.length; i++) {
    let month = data[i].date.split("-")[1];
    if (currentMonth === month || "0" + currentMonth === month) {
      if (data[i].category === "Sparen") {
        currentProgress += parseFloat(Math.abs(data[i].amount));
      }
    }
  }
  document.querySelector(".goal").innerHTML = "Aktuelles Sparziel: " + currentGoal + "€";
  document.querySelector(".progress").innerHTML = "Aktuell gesparrt: " + currentProgress + "€";
  if (currentGoal > currentProgress) {
    document.querySelector(".leftAmount").innerHTML =
      "Sie müssen jede Woche noch " + ((currentGoal - currentProgress) / weeksLeft) + "€ sparen um ihr Sparziel zu erreichen";
  } else {
    document.querySelector(".leftAmount").innerHTML =
      "Toll! Sie haben ihr Sparziel erreicht";
  }
}

//Updates the user document
function updateData(newData, userId) {
  let meta = {
    updateDate: newData[0].updateDate,
    startCredit: newData[0].startCredit,
    savingGoal: document.querySelector("input").value,
  };
  newData[0] = meta;

  database.updateDocument("63244466832556b90656", userId, { data: JSON.stringify(newData) })
    .then(response => {
      console.log(response);
      window.location.replace("./pageSaving.html");
    }, error => {
      console.log(error);
    });
}

init();