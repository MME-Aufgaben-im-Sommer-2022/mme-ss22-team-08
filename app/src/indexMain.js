import Manager from "./managers/Manager.js";

let manager;

function init() {
    let newButton = document.querySelector(".new"),
        moreDetailsButton = document.querySelector(".moreDetails");
    console.log("### Starting MME Project ###"); // eslint-disable-line no-console
    manager = new Manager("main");
    manager.balanceManager.element = document.querySelector(".flex-container");
    //manager.reloadAllWidgets();
    newButton.onclick = function() {
        manager.popupManager.openCreatePopUp();
    };
    moreDetailsButton.onclick = function() {
        window.location.replace("./pageDetail.html");
    };

}
init();