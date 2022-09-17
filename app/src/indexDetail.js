import Manager from "./managers/Manager.js";

let manager;

function init() {
    console.log("### Starting MME Project ###"); // eslint-disable-line no-console
    let button = document.querySelector("button");
    manager = new Manager("detail");
    manager.reloadAllWidgets();
    button.onclick = function() {
        manager.popupManager.openCreatePopUp();
    };
    

}

init();