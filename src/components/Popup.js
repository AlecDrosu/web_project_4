export default class Popup {
	constructor(popupSelector) {
		this._popupElement = document.querySelector(popupSelector);
		this._keyHandler = this._keyHandler.bind(this);
	}

	_keyHandler(evt) {
		if (evt.key === "Escape") {
			this.close();
		}
	}

	setEventListeners() {
		this._popupElement.addEventListener("click", (evt) => {
			if (
				evt.target.classList.contains("modal") ||
				evt.target.classList.contains("modal__close-btn")
			) {
				this.close();
			}
		});
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
