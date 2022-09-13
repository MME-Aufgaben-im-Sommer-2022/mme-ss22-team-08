
let buttonClosePopUp = document.querySelector(".closePopup"),
    buttonCancelPopUp = document.querySelector(".exitPopup");

function setupButtons(manager) {
    buttonClosePopUp.onclick = function() {
        manager.popupManager.closePopUp(true);
    };
    buttonCancelPopUp.onclick = function() {
        manager.popupManager.closePopUp(false);
    };
}

class PopupManager{
    constructor(manager) {
        this.manager = manager;
        this.frozen = document.querySelector(".frozen");
        this.popup = document.querySelector(".popup");
        this.isEditing = false;
        this.editingWidget = null;
        setupButtons(this.manager);
    }

    openPopUp() {
        this.frozen.classList.add("frozen-open");
        this.popup.classList.add("popup-open");
    }

    openCreatePopUp() {
        this.openPopUp();
        let title = this.popup.querySelector("h2");
        title.innerHTML = "Neuen Eintrag erstellen";
    }

    openEditPopUp(widget) {
        let title = this.popup.querySelector("h2");
        title.innerHTML = "Eintrag bearbeiten";
        this.openPopUp();

        document.querySelector(".inputAmount").value = widget.amount;
        document.querySelector(".inputTitle").value = widget.title;
        document.querySelector(".inputDate").value =widget.date;
        document.querySelector(".inputRepeat").checked= widget.repeated;

        this.editingWidget = widget;
        this.isEditing = true;
    }
    
    closePopUp(successful) {
        if (successful) {
            if(this.isEditing) {
                //here
            } else {
                this.readInput();
            }
            
        }
        this.clearPopup();
        this.frozen.classList.remove("frozen-open");
        this.popup.classList.remove("popup-open");
    }
    
    readInput() {
            let amount = document.querySelector(".inputAmount").value,
            title = document.querySelector(".inputTitle").value,
            date = document.querySelector(".inputDate").value,
            repeated = document.querySelector(".inputRepeat").checked;
    
            this.manager.addNewWidget(amount,true,title,repeated,[],date);
        
    }
    
    clearPopup() {
        document.querySelector(".inputAmount").value ="";
        document.querySelector(".inputTitle").value = "";
        document.querySelector(".inputDate").value ="";
        document.querySelector(".inputRepeat").checked= false;
    }

    


}

export default PopupManager;