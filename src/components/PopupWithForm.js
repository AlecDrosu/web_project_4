// Create PopupWithForm as a child class of Popup. The PopupWithForm class must comply with the following requirements:
// It takes a callback of the form submission into the constructor, as well as the popup selector. ###### - It stores a private method named _getInputValues(), which collects data from all the input fields.
// It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the submit event handler to the form and the click event listener to the close icon.
// It modifies the close() parent method in order to reset the form once the popup is closed.
// Create an instance of the PopupWithForm class for each popup.

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(submitCallback, popupSelector) {
		super(popupSelector);
		this._submitCallback = submitCallback;
	}

	_getInputValues() {
		return {
			name: this._popupElement.querySelector(".form__input_type_title").value,
			link: this._popupElement.querySelector(".form__input_type_image-url")
				.value,
		};
	}

	_handleSubmit(evt) {
		evt.preventDefault();
		this._submitCallback(this._getInputValues());
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
