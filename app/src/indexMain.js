import Manager from "./managers/Manager.js";

let manager;

//Initiates the Main/Home page
function init() {
  let newButton = document.querySelector(".new"),
    moreDetailsButton = document.querySelector(".moreDetails"),
    changeSavingsButton = document.querySelector(".changeSavings");
  manager = new Manager("main");
  manager.balanceManager.element = document.querySelector(".flex-container");
  //Opens the popup to create a new entry
  newButton.onclick = function() {
    manager.popupManager.openCreatePopUp();
  };
  //Changes page to the detail page
  moreDetailsButton.onclick = function() {
    window.location.replace("./pageDetail.html");
  };
  //Changes page to the savings page
  changeSavingsButton.onclick = function() {
    window.location.replace("./pageSaving.html");
  };

}
init();