import Popup from "./Popup.js";
import { renderLoading } from "../pages/index.js";

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
		this._handleFormSubmit(this._getInputValues());
	}

	setEventListeners() {
		super.setEventListeners();
		this._popupElement
			.querySelector(".form")
			.addEventListener("submit", (evt) => {
				evt.preventDefault();
				renderLoading(true, this._popupElement);
				this._handleSubmit();
			});
	}

	close() {
		super.close();
		this._popupElement.querySelector(".form").reset();
		setTimeout(() => {
			renderLoading(false, this._popupElement);
		}, 500);
	}
}
