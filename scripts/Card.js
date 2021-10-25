import { toggleForm } from "./index.js";

const previewModal = document.querySelector(".modal_type_preview");
const previewModalImg = previewModal.querySelector(".modal__img");
const previewModalCaption = previewModal.querySelector(".modal__caption");

class Card {
	constructor(card, cardSelector) {
		this._title = card.title;
		this._image = card.image;

		this._cardSelector = cardSelector;
	}

	_getTemplate() {
		const cardEl = document
			.querySelector(this._cardSelector)
			.content.querySelector(".element")
			.cloneNode(true);
		return cardEl;
	}

	// _setupEventListeners() {
	// 	addCard.addEventListener("click", () => toggleForm(addModal));
	// 	this._element
	// 		.querySelector(".element__img")
	// 		.addEventListener("click", () => showPreview(this));
	// }

	//  Option A:

	_setupEventListeners() {
		this._element
			.querySelector(".element__img")
			.addEventListener("click", () => this._showPreview());
		this._element
			.querySelector(".element__label")
			.addEventListener("click", () => this._showPreview());
		this._element
			.querySelector(".element__trash")
			.addEventListener("click", () => this._handleDelete());
		this._element
			.querySelector(".element__heart")
			.addEventListener("click", () => this._handleLike());
	}

	// Option B:

	_setupEventListeners() {
		this._handleLike();
		this._handleDelete();
		this._element
			.querySelector(".element__img")
			.addEventListener("click", () => this._showPreview());
	}

	_handleLike() {
		this._element.addEventListener("click", (evt) => {
			evt.target.classList.toggle("text__heart_active");
		});
	}

	_handleDelete() {
		const trash = this._element.querySelector(".element__trash");
		trash.addEventListener("click", () => {
			this._element.parentNode.removeChild(this._element);
		});
	}

	_showPreview() {
		previewModalImg.src = this._image;
		previewModalImg.alt = this._title;
		previewModalCaption.textContent = this._title;
		toggleForm(previewModal);
	}

	generateCards() {
		this._element = this._getTemplate();
		this._setupEventListeners();

		this._element.querySelector(".text__label").textContent = this._title;
		// set image
		this._element.querySelector(".element__img").src = this._image;

		return this._element;
	}

	createCard(event) { // <---???
		event.preventDefault();
		const card = {
			title: addTitle.value,
			image: addImage.value,
		};
		const cardEl = this._generateCards();
		document.querySelector(".elements").prepend(cardEl);
	
		addForm.reset();
	
		toggleForm(addModal);
	} 
	
}

export default Card;
