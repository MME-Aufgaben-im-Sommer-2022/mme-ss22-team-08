const WIDGET_TEMPLATE_STRING = document.querySelector("#widget-template").innerHTML.trim();

import Widget from "./util/Widget.js";
import Manager from "./Manager.js";

let manager;

function init() {
    console.log("### Starting MME Project ###"); // eslint-disable-line no-console
    let button = document.querySelector("button"),
     buttonPopUp = document.querySelector(".closePopup"),
     buttonClosePopUp = document.querySelector(".exitPopup");
    manager = new Manager();
    reloadAllWidgets();
    button.onclick = function() {
        //addNewWidget(10, false, "Games", false, ["Bum", "Bam"], "19.12.2024");
        openPopUp();
    };
    buttonPopUp.onclick = function() {
        closePopUp(true);
    };
    buttonClosePopUp.onclick = function() {
        closePopUp(false);
    };

}

function reloadAllWidgets() {
    for (let i = 0; i < manager.widgetList.length; i++) {
        addWidget(manager.widgetList[i]);
    }
}

function addWidget(widget) {
    let list = document.querySelector(".widgetlist"),
     widgetTemp = document.createElement("li");
    widgetTemp.setAttribute("class","widget");
    widgetTemp.innerHTML = WIDGET_TEMPLATE_STRING;
    list.appendChild(widgetTemp);
    widget.SetDisplay();
}

function addNewWidget(amount, sign, title, repeated, category, date) {
    let list = document.querySelector(".widgetlist"),
     widgetTemp = document.createElement("li");
    widgetTemp.setAttribute("class","widget");
    widgetTemp.innerHTML = WIDGET_TEMPLATE_STRING;
    list.appendChild(widgetTemp);
    let widget = new Widget(amount, sign, title, repeated, category, date, widgetTemp);
    widget.SetDisplay();
    manager.widgetList.push(widget);
}

function openPopUp() {
    let frozen = document.querySelector(".frozen"),
        popup = document.querySelector(".popup");
    frozen.classList.add("frozen-open");
    popup.classList.add("popup-open");
}

function closePopUp(successful) {
    if (successful) {
        readInput();
    }
    clearPopup();
    let frozen = document.querySelector(".frozen"),
        popup = document.querySelector(".popup");
    frozen.classList.remove("frozen-open");
    popup.classList.remove("popup-open");
}

function readInput() {
        let amount = document.querySelector(".inputAmount").value,
        title = document.querySelector(".inputTitle").value,
        date = document.querySelector(".inputDate").value,
        repeated = document.querySelector(".inputRepeat").checked;

        addNewWidget(amount,true,title,repeated,[],date);
    
}

function clearPopup() {
    document.querySelector(".inputAmount").value ="";
    document.querySelector(".inputTitle").value = "";
    document.querySelector(".inputDate").value ="";
    document.querySelector(".inputRepeat").checked= false;
}

init();