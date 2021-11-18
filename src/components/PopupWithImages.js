import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	open({ link, name }) {
		this._image = this._popupElement.querySelector(".modal__img");
		this._caption = this._popupElement.querySelector(
			".modal__caption"
		).textContent = name;
		this._image.src = link;
		this._image.alt = name;
		super.open();
	}
}
