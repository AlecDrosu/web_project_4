import Popup from "./Popup.js";

class PopupWithImages extends Popup {
	open({ link, name }) {
		this._popupElement.querySelector(".modal__caption").textContent = name;
		const image = this._popupElement.querySelector(".modal__img");
		image.src = link;
		image.alt = name;
		super.open();
	}
}
