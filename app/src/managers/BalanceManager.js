class BalanceManager {
    constructor(manager, type) {
        this.manager = manager;
        this.balance = 0;
        this.balanceNegative = 0;
        this.balancePositive = 0;
        this.startCredit = 100;
        this.element = null;
        this.type = type;
    }

    updateStatistics(widgetList) {
        let credit = this.startCredit,
         creditLoss = 0, creditGain = 0;
        for(let i = 0; i< widgetList.length; i++) {
            credit += parseFloat(widgetList[i].amount);
            
            console.log(credit);
            if (widgetList[i].signPositive) {
                creditGain += parseFloat(widgetList[i].amount);
            } else {
                creditLoss += parseFloat(widgetList[i].amount);
            }
        }
        this.balance = credit;
        this.balancePositive = creditGain;
        this.balanceNegative = creditLoss;
        console.log("Try to update");
        console.log(this.balance);
        this.updatePanels();
    }

    updatePanels() {
        if (this.element !== null) {
            if (this.type === "main") {
                this.element.querySelector(".balance").innerHTML = this.balance;
                this.element.querySelector(".balanceGain").innerHTML = "Plus:  + " + this.balancePositive;
                this.element.querySelector(".balanceLoss").innerHTML = "Minus:  - " + Math.abs(this.balanceNegative);
            }
        }
    }
}

export default BalanceManager;