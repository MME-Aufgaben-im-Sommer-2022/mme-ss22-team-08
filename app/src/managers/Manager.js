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
    if(json.length === undefined) {return;}
    manager.updatedMonth = json[0].updateDate;
    if(json[0].startCredit !== undefined) {
        manager.balanceManager.startCredit = parseInt(json[0].startCredit);
    }
    if(json[0].savingGoal !== undefined) {
        manager.balanceManager.savingGoal = parseInt(json[0].savingGoal);
    }
    let newWidgetList = [];
    for(let i = 1; i < json.length; i++) {
        let obj = json[i];
        newWidgetList.push(new Widget(obj.amount, obj.title, obj.repeated, obj.category, obj.date, null, null, obj.person));
    }

    for (let i = 0; i < newWidgetList.length; i++) {
        if (newWidgetList[i].repeated) {
            if(!manager.updatedMonth) {
                manager.updatedMonth= "12-3000";
                console.log("Escape Error");
            }
            if(newWidgetList[i].date.split("-")[0] === manager.updatedMonth.split("-")[1] && newWidgetList[i].date.split("-")[1] === manager.updatedMonth.split("-")[0]) {
                manager.repeatedList.push(newWidgetList[i]);
            }
        }
    }

    newWidgetList = checkForNewRepeated(newWidgetList, manager);

    newWidgetList.sort((a,b) => (new Date(a.date) < new Date(b.date)) ? 1 : -1);
    manager.repeatedList = [];


    console.log(newWidgetList);
    manager.widgetList = newWidgetList;
    manager.loadWidgetsFromSeverData();
}

function checkForNewRepeated(list, manager) {
    console.log("Checking for Months");
    console.log(manager.repeatedList);
    let oldYear = manager.updatedMonth.split("-")[1],
        newYear =manager.month.split("-")[1],
        oldMonth = manager.updatedMonth.split("-")[0],
        newMonth =manager.month.split("-")[0],
        oldDate = new Date(oldYear + "-" + oldMonth + "-01"),
        newDate = new Date(newYear + "-" + newMonth + "-01"),
        months = 0;

    months = (newDate.getFullYear() - oldDate.getFullYear()) * 12;
    months -= oldDate.getMonth();
    months += newDate.getMonth();
    console.log(months <= 0 ? 0 : months);

    // eslint-disable-next-line one-var
    let month = oldDate.getMonth() +1,
        year = oldDate.getFullYear();
    for(let i = 0; i < months; i++ ) {
        month++;
        if(month > 12) {
            month = 1;
            year++;
        }
        for (let k = 0; k < manager.repeatedList.length; k++) {
            let w = manager.repeatedList[k],
                widget = new Widget(w.amount,w.title,w.repeated,w.category,w.date,null,manager, w.person),
                day = widget.date.split("-")[2];
            widget.date = year + "-" + month + "-" + day;
            list.push(widget);
        }
    }
    manager.updatedMonth = newMonth + "-" + newYear;
    console.log(list);
    return list;
    //
}

class Manager{

    constructor(type) {
        setupServerConnection();
        this.widgetList = [];
        this.repeatedList = [];
        this.popupManager = new PopupManager(this);
        this.balanceManager = new BalanceManager(this, type);
        this.type= type;
        this.userId = getCookie("userId");
        this.widgetList = [];
        getDocument(this.userId, this);
        let today = new Date();
        this.month = (today.getMonth()+1) + "-" + today.getFullYear();
        this.updatedMonth = "8-2022";
        this.shownMonth = "";
        console.log(this.month);
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
        if (this.type==="detail" && this.shownMonth !== "") {
            let month = this.shownMonth.split("-")[1], year = this.shownMonth.split("-")[0];
            for (let i = 0; i < this.widgetList.length; i++) {
                if (this.widgetList[i].date.split("-")[1] === month && this.widgetList[i].date.split("-")[0] === year) {
                    this.addWidget(this.widgetList[i]);
                }
            }
        } else {
            for (let i = 0; i < this.widgetList.length; i++) {
                this.addWidget(this.widgetList[i]);
            }
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
        widget.updatePath(widgetTemp);
        widget.SetDisplay(this.type === "detail");
    }
    
    addNewWidget(amount, title, repeated, category, date, person) {
        let list = document.querySelector(".widgetlist"),
         widgetTemp = document.createElement("li");
        widgetTemp.setAttribute("class","widget");
        widgetTemp.innerHTML = WIDGET_TEMPLATE_STRING;
        list.appendChild(widgetTemp);
        let widget = new Widget(amount, title, repeated, category, date, widgetTemp, this, person); // eslint-disable-line
        widget.SetDisplay(this.type ==="detail");
        console.log(widget);
        console.log(this.widgetList);
        this.widgetList.push(widget);
        this.balanceManager.updateStatistics(this.widgetList);
        this.updateServerData();
    }

    generateJsonDoc() {
        let objectList = [],
            meta = {
                updateDate: this.updatedMonth,
                startCredit: this.balanceManager.startCredit,
                savingGoal: this.balanceManager.savingGoal,
            };
        objectList.push (meta);
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