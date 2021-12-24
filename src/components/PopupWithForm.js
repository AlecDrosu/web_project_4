import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({ handleFormSubmit, popupSelector }) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._submitBtn = this._popupElement.querySelector(".form__submit");
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._submitBtn.textContent = `${this._submitBtn.textContent.slice(0,-1)}ing...`;
			console.log(this._btnText);
		} 
		else if (this._submitBtn.textContent.length > 6) {
			this._submitBtn.textContent = `${this._submitBtn.textContent.slice(0,-6)}e`;
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
				this.renderLoading(true, this._popupElement);
				this._handleSubmit();
			});
	}

	close() {
		super.close();
		this._popupElement.querySelector(".form").reset();
	}
}
