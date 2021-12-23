import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({ handleFormSubmit, popupSelector }) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
	}

	_renderLoading(isLoading) {
		if (isLoading) {
			this._popupElement.querySelector(".form__submit").textContent = `${this._popupElement.querySelector(".form__submit").textContent.slice(0,-1)}ing...`;
			console.log(this._btnText);
		} 
		else if (this._popupElement.querySelector(".form__submit").textContent.length > 8) {
			this._popupElement.querySelector(".form__submit").textContent = `${this._popupElement.querySelector(".form__submit").textContent.slice(0,-6)}e`;
			console.log(this._btnText);

		}
	}

	_getInputValues() {
		const values = {};
		Array.from(this._popupElement.querySelectorAll(".form__input")).forEach(
			(input) => {
				values[input.name] = input.value;
			}
		);
		return values;
	}

	_handleSubmit() {
		this._handleFormSubmit(this._getInputValues());
	}

	setEventListeners() {
		super.setEventListeners();
		this._popupElement
			.querySelector(".form")
			.addEventListener("submit", (evt) => {
				evt.preventDefault();
				this._renderLoading(true, this._popupElement);
				this._handleSubmit();
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
