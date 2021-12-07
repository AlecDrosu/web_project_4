import Popup from "./Popup.js";
import { renderLoading } from "../pages/index.js";

export default class PopupWithConfirm extends Popup {
	constructor({ handleConfirm, popupSelector, id }) {
		super(popupSelector);
		this._handleConfirm = handleConfirm;
		this._id = id;
	}

	setEventListeners() {
		super.setEventListeners();
		this._popupElement
			.querySelector(".form")
			.addEventListener("submit", (evt) => {
				evt.preventDefault();
				renderLoading(true, this._popupElement);
				this._handleConfirm(this._id);
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
