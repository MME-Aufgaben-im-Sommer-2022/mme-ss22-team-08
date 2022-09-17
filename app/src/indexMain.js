import Manager from "./managers/Manager.js";

let manager;

function init() {
    let button = document.querySelector("button");
    console.log("### Starting MME Project ###"); // eslint-disable-line no-console
    manager = new Manager("main");
    manager.balanceManager.element = document.querySelector(".flex-container");
    //manager.reloadAllWidgets();
    button.onclick = function() {
        manager.popupManager.openCreatePopUp();
    };

}
init();