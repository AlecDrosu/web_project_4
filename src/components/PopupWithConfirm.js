import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._handleConfirm = handleConfirm;
    this._submitBtn = this._popupElement.querySelector(".form__submit");
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = "Deleting...";
    } else {
      this._submitBtn.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this.renderLoading(true, this._popupElement);
        this.handleConfirm();
      });
  }

  handleConfirm(data) {
    data;
  }
}
