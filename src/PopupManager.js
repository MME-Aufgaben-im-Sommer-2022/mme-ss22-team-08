let buttonClosePopUp = document.querySelector(".closePopup"),
  buttonCancelPopUp = document.querySelector(".exitPopup");

//Sets up the buttons on the pop up
function setupButtons(manager) {
  buttonClosePopUp.onclick = function() {
    manager.popupManager.closePopUp(true);
  };
  buttonCancelPopUp.onclick = function() {
    manager.popupManager.closePopUp(false);
  };
}

/*  Handles the popup to create and edit new entries, which is available across multiple sites.
 *   It collects the data from the popup and sends them to the Manager to create/edit widgets
 */
class PopupManager {
  constructor(manager) {
    this.manager = manager;
    this.frozen = document.querySelector(".frozen");
    this.popup = document.querySelector(".popup");
    this.isEditing = false;
    this.editingWidget = null;
    setupButtons(this.manager);
  }

  //Makes the background blurry and opens a popup
  openPopUp() {
    this.frozen.classList.add("frozen-open");
    this.popup.classList.add("popup-open");
  }

  //Opens a create popup and changes the values to accommodate for that
  openCreatePopUp() {
    this.openPopUp();
    document.querySelector("#sonstiges").checked = true;
    let title = this.popup.querySelector("h2");
    title.innerHTML = "Neuen Eintrag erstellen";
    buttonClosePopUp.innerHTML = "Eintrag erstellen";
    document.querySelector(".inputDate").valueAsDate = new Date();
  }

  //Opens a create popup, sets the widget to edit and changes the values to accommodate for that
  openEditPopUp(widget) {
    let title = this.popup.querySelector("h2");
    title.innerHTML = "Eintrag bearbeiten";
    buttonClosePopUp.innerHTML = "Eintrag bearbeiten";
    this.openPopUp();

    document.querySelector("#" + (widget.category).toLowerCase()).checked =
      true;
    document.querySelector(".inputAmount").value = widget.amount;
    document.querySelector(".inputTitle").value = widget.title;
    document.querySelector(".inputDate").value = widget.date;
    document.querySelector(".inputRepeat").checked = widget.repeated;

    this.editingWidget = widget;
    this.isEditing = true;
  }

  //Closes the popup and depending on "successful" either reads the data in or discards it
  closePopUp(successful) {
    if (successful) {
      if (this.isEditing) {
        this.updateInput(this.editingWidget);
        this.isEditing = false;
        this.manager.reloadAllWidgets();
      } else {
        this.readInput();
      }

    }
    this.clearPopup();
    this.frozen.classList.remove("frozen-open");
    this.popup.classList.remove("popup-open");
  }

  //Reads the input and hands them to the Manager to create a new widget
  readInput() {
    let amount = document.querySelector(".inputAmount").value,
      title = document.querySelector(".inputTitle").value,
      date = document.querySelector(".inputDate").value,
      categoryId = document.querySelector('input[name="category"]:checked')
      .id,
      category = document.querySelector("label[for=" + categoryId + "]")
      .firstChild.innerHTML,
      person = document.querySelector(".inputPerson").value,
      repeated = document.querySelector(".inputRepeat").checked;

    if (amount === "") {
      return;
    }

    this.manager.addNewWidget(amount, title, repeated, category, date,
    person);

  }

  //Updates the values of the editing widget to the inputs
  updateInput(widget) {
    widget.amount = document.querySelector(".inputAmount").value;
    widget.title = document.querySelector(".inputTitle").value;
    widget.date = document.querySelector(".inputDate").value;
    widget.person = document.querySelector(".inputPerson").value;
    widget.category = document.querySelector('input[name="category"]:checked')
      .value;
    widget.repeated = document.querySelector(".inputRepeat").checked;
  }

  //Clears the popup inputs
  clearPopup() {
    document.querySelector(".inputAmount").value = "";
    document.querySelector(".inputTitle").value = "";
    document.querySelector(".inputDate").value = "";
    document.querySelector(".inputPerson").value = "";
    document.querySelector(".inputRepeat").checked = false;
  }

}

export default PopupManager;