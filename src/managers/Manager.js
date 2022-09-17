import Widget from "../util/Widget.js";
import PopupManager from "../PopupManager.js";
import BalanceManager from "./BalanceManager.js";


const WIDGET_TEMPLATE_STRING = document.querySelector("#widget-template").innerHTML.trim(),

// eslint-disable-next-line no-undef
    client = new Appwrite.Client(),
    // eslint-disable-next-line no-undef
    //account = new Appwrite.Account(client),
    // eslint-disable-next-line no-undef
    database = new Appwrite.Databases(client,"6324444bf0c125e7623c");

function setupServerConnection() {
    client
        .setEndpoint("https://appwrite.software-engineering.education/v1") // Your API Endpoint
        .setProject("62f0ca546a9a137d9df7");
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    return null;
}

function getDocument(Id, manager) {
    database.getDocument('63244466832556b90656', Id)
        .then(response => {
            console.log(response);
            console.log(response.data);
            parseJsonDoc(response.data, manager);
        }, error => {
            console.log(error);
        });
}

function parseJsonDoc(json, manager) {
    let parsedData = JSON.parse(json);
    console.log(parsedData);
    console.log(parsedData.length);
    createWidgetsFromJson(parsedData, manager);
}

function createWidgetsFromJson(json, manager) {
    let newWidgetList = [];
    for(let i = 0; i < json.length; i++) {
        let obj = json[i];
        newWidgetList.push(new Widget(obj.amount, obj.title, obj.repeated, obj.category, obj.date, null, null));
    }
    console.log(newWidgetList);
    manager.widgetList = newWidgetList;
    manager.loadWidgetsFromSeverData();
}

class Manager{

    constructor(type) {
        setupServerConnection();
        this.widgetList = [];
        this.popupManager = new PopupManager(this);
        this.balanceManager = new BalanceManager(this, type);
        this.type= type;
        this.userId = getCookie("userId");
        this.widgetList = getDocument(this.userId, this);
        console.log(this.widgetList);
    }

    removeWidget(widget) {
        let index = this.widgetList.indexOf(widget);
        if (index > -1) {
            this.widgetList.splice(index, 1);
        }
        widget.element.remove();
        this.reloadAllWidgets();
    }

    loadWidgetsFromSeverData() {
        for (let i = 0; i < this.widgetList.length; i++) {
            this.widgetList[i].manager = this;
            this.addWidget(this.widgetList[i]);
        }
        this.balanceManager.updateStatistics(this.widgetList);
    }

    reloadAllWidgets() {
        if(!this.widgetList) {
            return;
        }
        for (let i = 0; i < this.widgetList.length; i++) {
            this.widgetList[i].element.remove();
        }
        for (let i = 0; i < this.widgetList.length; i++) {
            this.addWidget(this.widgetList[i]);
        }
        this.balanceManager.updateStatistics(this.widgetList);
        this.updateServerData();
    }
    
    addWidget(widget) {
        let list = document.querySelector(".widgetlist"),
         widgetTemp = document.createElement("li");
        widgetTemp.setAttribute("class","widget");
        widgetTemp.innerHTML = WIDGET_TEMPLATE_STRING;
        list.appendChild(widgetTemp);
        console.log(widgetTemp);
        widget.updatePath(widgetTemp);
        widget.SetDisplay(this.type === "detail");
    }
    
    addNewWidget(amount, title, repeated, category, date) {
        let list = document.querySelector(".widgetlist"),
         widgetTemp = document.createElement("li");
        widgetTemp.setAttribute("class","widget");
        widgetTemp.innerHTML = WIDGET_TEMPLATE_STRING;
        list.appendChild(widgetTemp);
        let widget = new Widget(amount, title, repeated, category, date, widgetTemp, this); // eslint-disable-line
        widget.SetDisplay(this.type ==="detail");
        this.widgetList.push(widget);
        console.log(this.widgetList);
        this.balanceManager.updateStatistics(this.widgetList);
        this.updateServerData();
    }

    generateJsonDoc() {
        let objectList = [];
        for(let i = 0; i < this.widgetList.length; i++) {
            objectList.push(this.widgetList[i].convertToObject());
        }
        // eslint-disable-next-line one-var
        let jsonList = JSON.stringify(objectList);
        console.log(jsonList);
        return jsonList;
    }

    updateServerData() {
        if(this.widgetList.length === 0) {
            return;
        }
        let newData = this.generateJsonDoc();
        console.log(newData);
        database.updateDocument('63244466832556b90656', this.userId, {data: newData})
            .then(response => {
                console.log(response);
                //parseJsonDoc(response.data);
            }, error => {
                console.log(error);
            });
    }
    
}

export default Manager;