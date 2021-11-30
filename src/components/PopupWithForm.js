import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({ handleFormSubmit, popupSelector }) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
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
		this._handleFormSubmit(
			this._getInputValues({
				title: this._popupElement.querySelector(".form__input_type_title")
					.value,
				image: this._popupElement.querySelector(".form__input_type_link").value,
			})
		);
	}

	setEventListeners() {
		super.setEventListeners();
		this._popupElement
			.querySelector(".form")
			.addEventListener("submit", this._handleSubmit.bind(this));
	}

	close() {
		super.close();
		this._popupElement.querySelector(".form").reset();
	}
}
