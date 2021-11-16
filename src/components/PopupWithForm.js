import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor({handleFormSubmit, popupSelector}) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
	}

	_getInputValues() {
		return {

			// return the name and the link of the new card
			name: this._popupElement.querySelector(".form__input_type_name").value,
			link: this._popupElement.querySelector(".form__input_type_link").value
		};
	}

	_handleSubmit(evt) {
		evt.preventDefault();
		this._handleFormSubmit(this._getInputValues());
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