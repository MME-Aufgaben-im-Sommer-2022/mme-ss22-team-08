import Manager from "./Manager.js";

let manager;

function init() {
    let button = document.querySelector("button");
    console.log("### Starting MME Project ###"); // eslint-disable-line no-console
    manager = new Manager("main");
    //manager.reloadAllWidgets();
    button.onclick = function() {
        manager.popupManager.openCreatePopUp();
    };
    

}

init();