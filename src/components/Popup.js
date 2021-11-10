export default class Popup {
	constructor(popupSelector) {
		this._popupElement = document.querySelector(popupSelector);
		this._keyHandler = this._keyHandler.bind(this);
	}

	_keyHandler(evt) {
		evt.preventDefault();
		if (evt.key === "Escape") {
			this.close();
		}
	}

	setEventListeners() {
		this._popupElement.addEventListener("click", () => this.close());
	}

	open() {
		this._popupElement.classList.add("modal_is-open");
		document.addEventListener("keydown", this._keyHandler);
	}

	close() {
		this._popupElement.classList.remove("modal_is-open");
		document.removeEventListener("keydown", this._keyHandler);
	}
}
