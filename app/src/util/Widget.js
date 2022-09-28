import Observable from "./Observable.js";

let deleteButton, editButton;

//Initialisiert die Listener
function initEventListener(widget, el) {
  deleteButton = el.querySelector(".delete");
  editButton = el.querySelector(".edit");
  if (deleteButton !== null && editButton !== null) {
    deleteButton.addEventListener("click", widget.onDeleteButtonClicked.bind(
      widget));
    editButton.addEventListener("click", widget.onEditButtonClicked.bind(
      widget));
  }

}

/*  Stores all information available about one entry in object
 *   and handles different operation on these objects as well as correctly filling the screen with the information
 */
class Widget extends Observable {
  constructor(amount, title, repeated, category, date, element, manager,
    person = "") {
    super();
    this.signPositive = amount >= 0;
    this.amount = amount;
    this.title = title;
    this.repeated = repeated;
    this.category = category;
    this.date = date;
    this.person = person;
    this.element = element;
    this.manager = manager;
    if (this.element !== null) {
      initEventListener(this, this.element);
    }
  }

  //All information is filled into the corresponding html-elements
  SetDisplay(showAllInformation) {
    let amountString;
    if (this.signPositive) {
      amountString = "+ " + this.amount + "€";
    } else {
      amountString = "- " + this.amount * -1 + "€";
    }
    this.element.querySelector(".amount").innerHTML = amountString;
    this.element.querySelector(".title").innerHTML = this.title;
    this.element.querySelector("#repeatIcon").style.visibility = (this
      .repeated ? "visible" : "hidden");
    if (showAllInformation) {

      this.element.querySelector(".category").innerHTML = this.category;
      let dateList = this.date.split("-");
      this.element.querySelector(".date").innerHTML = dateList[2] + "." +
        dateList[1] + "." + dateList[0];
      this.element.querySelector("#personIcon").style.visibility = ((this
        .person !== "") ? "visible" : "hidden");
      this.element.querySelector("#personIcon").setAttribute("title", this
        .person);
    }

  }

  //Widgets gets deleted
  onDeleteButtonClicked() {
    this.manager.removeWidget(this);
  }

  //Opens a special editing popup
  onEditButtonClicked() {
    this.manager.popupManager.openEditPopUp(this);
  }

  //Updates the "path" by reassigning a new html-element
  updatePath(element) {
    this.element = element;
    initEventListener(this, this.element);
  }

  //Converts the widget object into a simpler object for json storage
  convertToObject() {
    let obj = {
      amount: this.amount,
      title: this.title,
      repeated: this.repeated,
      category: this.category,
      date: this.date,
      person: this.person,
    };
    return obj;
  }
}

export default Widget;