// Create the PopupWithImage class as a child class of Popup. This class has to change the parent open() method. In the open() method of the PopupWithImage class, you need to add an image to the popup and the corresponding image src attribute along with a caption for the image.
import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._images = this._popupElement.querySelector(".modal__img");
		this._caption = this._popupElement.querySelector(".modal__caption");
	}

	open({ link, name }) {
		super.open();
		this._caption.textContent = name;
		this._images.src = link;
		this._images.alt = name;
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
