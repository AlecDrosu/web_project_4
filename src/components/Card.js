import PopupWithImages from "./PopupWithImages.js";

const previewModal = document.querySelector(".modal_type_preview");
const previewModalImg = previewModal.querySelector(".modal__img");
const previewModalCaption = previewModal.querySelector(".modal__caption");

class Card {
	constructor(card, cardSelector, handleClick) {
		this._title = card.title;
		this._image = card.image;
		this._handleClick = handleClick;

		this._cardSelector = cardSelector;
	}

	_getTemplate() {
		const cardEl = document
			.querySelector(this._cardSelector)
			.content.querySelector(".element")
			.cloneNode(true);
		return cardEl;
	}

	_setupEventListeners() {
		this._element
			.querySelector(".element__img")
			.addEventListener("click", () =>
				this._handleClick({ name: this._title, link: this._image })
			);
		// this._element
		// 	.querySelector(".text__label")
		// 	.addEventListener("click", () => this._showPreview());
		this._element
			.querySelector(".element__trash")
			.addEventListener("click", () => this._handleDelete());
		this._element
			.querySelector(".text__heart")
			.addEventListener("click", () => this._handleLike());
	}

	_handleLike() {
		this._element
			.querySelector(".text__heart")
			.classList.toggle("text__heart_active");
	}

	_handleDelete() {
		this._element.remove();
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setupEventListeners();

		this._element.querySelector(".text__label").textContent = this._title;
		// set image
		this._element.querySelector(".element__img").src = this._image;
		// set alt
		this._element.querySelector(".element__img").alt = this._title;

		return this._element;
	}
}

export default Card;
