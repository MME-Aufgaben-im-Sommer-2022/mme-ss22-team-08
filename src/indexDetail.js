import Manager from "./managers/Manager.js";

let manager,
  monthList = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
    "August", "September", "Ooktober", "November", "Dezember"];

//Initiates the detail page
function init() {
  let button = document.querySelector("button"),
    monthSelectInput = document.querySelector(".monthSelect"),
    titleHeader = document.querySelector("h1");
  manager = new Manager("detail");
  manager.reloadAllWidgets();
  manager.shownMonth = "";
  //Opens popup to create new entry
  button.onclick = function() {
    manager.popupManager.openCreatePopUp();
  };
  //Listens for changes in the month selection and sets month in the manager
  monthSelectInput.addEventListener("change", () => {
    let parsedMonth = Math.abs(parseInt(monthSelectInput.value.split("-")[
      1]));
    if (parsedMonth <= 13 && parsedMonth > 0) {
      manager.shownMonth = monthSelectInput.value;
      titleHeader.innerHTML = "Überblick " + monthList[parsedMonth];
    } else {
      manager.shownMonth = "";
      titleHeader.innerHTML = "Überblick";
    }
    manager.reloadAllWidgets();
  });


}

init();