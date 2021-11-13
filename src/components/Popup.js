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
		this._popupElement.classList.add(this._popupElement);
		document.addEventListener("keydown", this._keyHandler);
	}

	close() {
		this._popupElement.classList.remove(this._popupElement);
		document.removeEventListener("keydown", this._keyHandler);
	}
}
 