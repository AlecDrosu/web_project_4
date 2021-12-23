export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  _handleKeyDown(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal__overlay") ||
        evt.target.classList.contains("modal__close-btn")
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("modal_is-open");
    document.addEventListener("keydown", this._handleKeyDown);
    if (this._popupElement.querySelector(".form__input").value === "") {
      this._popupElement
        .querySelector(".form__submit")
        .classList.add("form__submit_inactive");
    }
  }

  close() {
    this._popupElement.classList.remove("modal_is-open");
    document.removeEventListener("keydown", this._handleKeyDown);
  }
}
