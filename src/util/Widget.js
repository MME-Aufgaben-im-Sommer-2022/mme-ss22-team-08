import Observable from "./Observable.js";

let deleteButton, editButton;

//Initialisiert die Listener
function initEventListener(widget, el) {
    deleteButton = el.querySelector(".delete");
    editButton = el.querySelector(".edit");
    if (deleteButton !== null && editButton !== null) {
        deleteButton.addEventListener("click", widget.onDeleteButtonClicked.bind(widget));
        editButton.addEventListener("click", widget.onEditButtonClicked.bind(widget));
    }
    
}


class Widget extends Observable{
    constructor(amount, title, repeated ,category, date, element, manager){
        super();
        this.deployed = false;
        this.signPositive = amount >= 0;
        this.amount = amount;
        this.title = title;
        this.repeated = repeated;
        this.category = category;
        this.date = date;
        this.element = element;
        this.manager = manager;
        initEventListener(this, this.element);
    }

    //alle Wetterinformationen werden den zugehörigen HTML-Elementen zugeordnet
    SetDisplay(showAllInformation) {
        let amountString;
        if(this.signPositive) {
            amountString = "+ " + this.amount + "€";
        } else {
            amountString = "- " + this.amount*-1 + "€";
        }
        this.element.querySelector(".amount").innerHTML = amountString;
        this.element.querySelector(".title").innerHTML = this.title;
        //this.element.querySelector(".icons").children[1].innerHTML =;
        if(showAllInformation) {
            for(let i = 0; i < this.category.length; i++) {
                this.element.querySelector(".category").children[i].innerHTML = this.category[i];
            }
            this.element.querySelector(".date").innerHTML = this.date;
        }
        
    }

    //Setzt deployed auf wahr und lässt den WidgetManager das Widget zur Liste hinzufügen 
    deployWidget() {
        this.deployed = true;
        this.manager.addWidgetToList(this);
    }

    //Widget wird gelöscht
    onDeleteButtonClicked() {
        this.manager.removeWidget(this);
    }

    //Wetterdaten werden nochmals abgefragt bzw. aktualisiert
    onEditButtonClicked() {
        this.manager.popupManager.openEditPopUp(this);
    }

    updatePath(element) {
        this.element = element;
        initEventListener(this, this.element);
    }
}

export default Widget;