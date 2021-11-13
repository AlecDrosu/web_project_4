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