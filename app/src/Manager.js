const WIDGET_TEMPLATE_STRING = document.querySelector("#widget-template").innerHTML.trim();

import Widget from "./util/Widget.js";
import PopupManager from "./PopupManager.js";

class Manager{

    constructor() {
        this.widgetList = [];
        this.popupManager = new PopupManager(this);
    }

    removeWidget(widget) {
        let index = this.widgetList.indexOf(widget);
        if (index > -1) {
            this.widgetList.splice(index, 1);
        }
        widget.element.remove();
        this.reloadAllWidgets();
    }

    reloadAllWidgets() {
        for (let i = 0; i < this.widgetList.length; i++) {
            this.widgetList[i].element.remove();
        }
        for (let i = 0; i < this.widgetList.length; i++) {
            this.addWidget(this.widgetList[i]);
        }
    }
    
    addWidget(widget) {
        let list = document.querySelector(".widgetlist"),
         widgetTemp = document.createElement("li");
        widgetTemp.setAttribute("class","widget");
        widgetTemp.innerHTML = WIDGET_TEMPLATE_STRING;
        list.appendChild(widgetTemp);
        widget.updatePath(widgetTemp);
        widget.SetDisplay();
    }
    
    addNewWidget(amount, sign, title, repeated, category, date) {
        let list = document.querySelector(".widgetlist"),
         widgetTemp = document.createElement("li");
        widgetTemp.setAttribute("class","widget");
        widgetTemp.innerHTML = WIDGET_TEMPLATE_STRING;
        list.appendChild(widgetTemp);
        let widget = new Widget(amount, sign, title, repeated, category, date, widgetTemp, this); // eslint-disable-line
        widget.SetDisplay();
        this.widgetList.push(widget);
        console.log(this.widgetList);
    }
    
}

export default Manager;