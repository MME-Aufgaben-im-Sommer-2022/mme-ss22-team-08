class Widget{
    constructor(amount, sign, title, repeated ,category, date, element){
        this.deployed = false;
        this.signPositive = sign;
        this.amount = amount;
        this.title = title;
        this.repeated = repeated;
        this. category = category;
        this.date = date;
        this.element = element;
    }

    //alle Wetterinformationen werden den zugehörigen HTML-Elementen zugeordnet
    SetDisplay() {
        let amountString;
        if(this.signPositive) {
            amountString = "+ " + this.amount + "€";
        } else {
            amountString = "- " + this.amount + "€";
        }
        this.element.querySelector(".amount").innerHTML = amountString;
        this.element.querySelector(".title").innerHTML = this.title;
        //this.element.querySelector(".icons").children[1].innerHTML =;
        for(let i = 0; i < this.category.length; i++) {
            this.element.querySelector(".category").children[i].innerHTML = this.category[i];
        }
        this.element.querySelector(".date").innerHTML = this.date;
    }

    //Setzt deployed auf wahr und lässt den WidgetManager das Widget zur Liste hinzufügen 
    deployWidget() {
        this.deployed = true;
        this.manager.addWidgetToList(this);
    }

    //Widget wird gelöscht
    onDeleteButtonClicked() {
        //
    }

    //Wetterdaten werden nochmals abgefragt bzw. aktualisiert
    onRefreshButtonClicked() {
        //
    }
}

export default Widget;