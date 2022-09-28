import Manager from "./managers/Manager.js";

let manager,
    monthList = ["","Januar","Februar","März","April","Mai","Juni","Juli","August","September","Ooktober","November","Dezember"];

function init() {
    console.log("### Starting MME Project ###"); // eslint-disable-line no-console
    let button = document.querySelector("button"),
        monthSelectInput = document.querySelector(".monthSelect"),
        titleHeader = document.querySelector("h1");
    manager = new Manager("detail");
    manager.reloadAllWidgets();
    manager.shownMonth = "";
    button.onclick = function() {
        manager.popupManager.openCreatePopUp();
    };
    monthSelectInput.addEventListener("change", () => {
        let parsedMonth = Math.abs(parseInt(monthSelectInput.value.split("-")[1]));
        if(parsedMonth <= 13 && parsedMonth > 0) {
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