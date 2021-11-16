import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
	open({ link, name }) {
		this._images = this._popupElement.querySelector(".modal__img");
		this._caption = this._popupElement.querySelector(
			".modal__caption"
		).textContent = name;
		this._images.src = link;
		this._images.alt = name;
		super.open();
	}
}

// Code from Live Coding Session:

// import Popup from "./Popup.js";

// export default class PopupWithImages extends Popup {
// 	open({ link, name }) {
// 		this._popupElement.querySelector(".modal__caption").textContent = name;
// 		const image = this._popupElement.querySelector(".modal__img");
// 		image.src = link;
// 		image.alt = name;
// 		super.open();
// 	}
// }
