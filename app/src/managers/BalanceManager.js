class BalanceManager {
    constructor(manager, type) {
        this.manager = manager;
        this.balance = 0;
        this.balanceNegative = 0;
        this.balancePositive = 0;
        this.startCredit = 100;
        this.element = null;
        this.type = type;
        this.widgetList = [];
        this.weekChart = null;
    }

    updateStatistics(widgetList) {
        this.widgetList = widgetList;
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
                let balanceElement = this.element.querySelector(".balancePanel");
                balanceElement.querySelector(".balance").innerHTML = this.balance;
                balanceElement.querySelector(".balanceGain").innerHTML = "Plus:  + " + this.balancePositive;
                balanceElement.querySelector(".balanceLoss").innerHTML = "Minus:  - " + Math.abs(this.balanceNegative);

                if(this.weekChart !== null) {
                    this.weekChart.destroy();
                }

                // eslint-disable-next-line one-var
                let chartElement = this.element.querySelector("#weekChart");
                // eslint-disable-next-line no-undef
                this.weekChart = new Chart(
                    chartElement,
                    this.updateWeekChart(),
                  );
            }
        }
    }

    updateWeekChart() {
        let day = new Date(),
         firstWeekDay = day.getDate() - day.getDay() + 1,
         today = day.getDate(),
         month = day.getMonth() + 1,
         year = day.getFullYear(),

         Einnahmen = [],
         Ausgaben = [];

        for(let iDay = firstWeekDay; iDay <= today; iDay++) {
            let dayPlus = 0,
                dayMinus = 0;
            for(let i = 0; i< this.widgetList.length; i++) {
                if(this.widgetList[i].date === year+"-"+month+"-"+iDay || this.widgetList[i].date === year+"-0"+month+"-"+iDay) {
                    if (this.widgetList[i].signPositive) {
                        dayPlus += parseFloat(this.widgetList[i].amount);
                    } else {
                        dayMinus += parseFloat(Math.abs(this.widgetList[i].amount));
                    }
                }

            }
            Einnahmen.push(dayPlus);
            Ausgaben.push(dayMinus);
        }
        
        console.log(firstWeekDay + "." + month + ".");
        const labels = [
            'Montag',
            'Dienstag',
            'Mittwoch',
            'Donnerstag',
            'Freitag',
            'Samstag',
            'Sonnstag',
          ],
        
          data = {
            labels: labels,
            datasets: [{
                label: 'Einnahmen',
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.5,
                data: Einnahmen,
              },{
              label: 'Ausgaben',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.5,
              data: Ausgaben,
            }],
          },
        
          config = {
            type: 'line',
            data: data,
          };

          return config;
    }
}

export default BalanceManager;