class BalanceManager {
    constructor(manager, type) {
        this.manager = manager;
        this.balance = 0;
        this.balanceNegative = 0;
        this.balancePositive = 0;
        this.startCredit = 0;
        this.element = null;
        this.type = type;
        this.widgetList = [];
        this.weekChart = null;
        this.categoryChart = null;
        this.savingChart = null;
    }

    updateStatistics(widgetList) {
        this.widgetList = widgetList;
        let credit = this.startCredit,
         creditLoss = 0, creditGain = 0, today = new Date();
        for(let i = 0; i< widgetList.length; i++) {
            credit += parseFloat(widgetList[i].amount);

            console.log("0" + (today.getMonth()+1) + " // " + widgetList[i].date.split("-")[1]);
            if(today.getMonth()+1 === widgetList[i].date.split("-")[1] || "0" + (today.getMonth()+1) === widgetList[i].date.split("-")[1]) {
                if (widgetList[i].signPositive) {
                    creditGain += parseFloat(widgetList[i].amount);
                } else {
                    creditLoss += parseFloat(widgetList[i].amount);
                }
            }
            
        }
        this.balance = credit;
        this.balancePositive = creditGain;
        this.balanceNegative = creditLoss;
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

                if(this.categoryChart !== null) {
                    this.categoryChart.destroy();
                }

                // eslint-disable-next-line one-var
                let chartCategoryElement = this.element.querySelector("#categoryChart");
                // eslint-disable-next-line no-undef
                this.categoryChart = new Chart(
                    chartCategoryElement,
                    this.updateCategoryChart(),
                  );
                
                if(this.savingChart !== null) {
                    this.savingChart.destroy();
                }

                // eslint-disable-next-line one-var
                let chartSavingElement = this.element.querySelector("#savingChart");
                // eslint-disable-next-line no-undef
                this.savingChart = new Chart(
                    chartSavingElement,
                    this.updateSavingsChart(),
                  );
            }
        }
    }

    updateWeekChart() {
        let day = new Date(),
         weekday = day.getDay() -1;

        if (weekday < 0) {weekday = 6;}

        // eslint-disable-next-line one-var
        let firstWeekDay = day.getDate() - weekday,
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

    updateCategoryChart() {
        const categories = [
            "Freizeit",
            "Haushalt",
            "Unterhaltung",
            "Fortbewegung",
            "Lebensmittel",
            "Versicherung",
            "Sonstiges",
        ];
        
        let date = new Date(),
            categoryData = [],
            currentMonth = date.getMonth()+1;

        for (let i = 0; i < categories.length; i++) {
            categoryData[i] = 0;
            for (let j = 0; j < this.widgetList.length; j++) {
                let month = this.widgetList[j].date.split("-")[1];
                if((currentMonth === month || "0" + currentMonth === month) && this.widgetList[j].category === categories[i]) {
                    console.log(this.widgetList[j].amount);
                    categoryData[i] += parseFloat(this.widgetList[j].amount);
                }
            }
        }
        
        // eslint-disable-next-line one-var
        const data = {
            labels: categories,
            datasets: [{
              label: 'Ausgabenkategorien',
              data: categoryData,
              backgroundColor: [
                'rgb(179, 116, 134)',
                'rgb(124, 152, 166)',
                'rgb(214, 125, 83)',
                'rgb(91, 152, 119)',
                'rgb(83, 77, 107)',
                'rgb(230, 189, 87)',
                'rgb(158, 158, 158)',
              ],
              hoverOffset: 4,
            }],
          },

          config = {
            type: 'doughnut',
            data: data,
          };

          return config;
    }

    updateSavingsChart() {
        const data = {
            datasets: [{
                label: 'My First Dataset',
                data: [50, 10],
                backgroundColor: [
                'rgb(0, 140, 255)',
                'rgb(0,0,0,0)',
                ],
                hoverOffset: 4,
            }],
            },


            config = {
                type: 'doughnut',
                data: data,
                options: {cutout: "90%",
                        scale: "50%"},
                };

        return config;
    }
}

export default BalanceManager;