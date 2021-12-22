import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
	constructor({ handleConfirm, popupSelector }) {
		super(popupSelector);
		this._handleConfirm = handleConfirm;
	}

	_renderLoading(isLoading) {
		if (isLoading) {
			this._popupElement.querySelector(".form__submit").textContent = "Deleting...";
		} 
		else  {
			this._popupElement.querySelector(".form__submit").textContent = "Yes";
		}
	}

	setEventListeners() {
		super.setEventListeners();
		this._popupElement
			.querySelector(".form")
			.addEventListener("submit", (evt) => {
				evt.preventDefault();
				this._renderLoading(true, this._popupElement);
				this._handleConfirm();
			});
	}

	close() {
		super.close();
		this._popupElement.querySelector(".form").reset();
		setTimeout(() => {
			this._renderLoading(false, this._popupElement);
		}, 500);
	}
}
