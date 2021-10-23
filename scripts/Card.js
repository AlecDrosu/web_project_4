const previewModalImg = previewModal.querySelector(".modal__img");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const addTitle = addForm.querySelector(".form__input_type_title");
const addImage = addForm.querySelector(".form__input_type_image-url");
const previewModal = document.querySelector(".modal_type_preview");

function keyHandler(evt) {
	const modal = document.querySelector(".modal_is-open");
	if (evt.key === "Escape") {
		removeForm(modal);
	}
}

function removeForm(modal) {
	modal.classList.remove("modal_is-open");
	document.removeEventListener("keydown", keyHandler);
}

function toggleForm(modal) {
	modal.classList.toggle("modal_is-open");
	document.addEventListener("keydown", keyHandler);
}

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

	_handleLike() {
		this._element.addEventListener("click", function (evt) {
			evt.target.classList.toggle("text__heart_active");
		});
	}

	_handleDelete() {
		const trash = this._element.querySelector(".element__trash");
		trash.addEventListener("click", function () {
			this._element.parentNode.removeChild(this._element);
		});
	}

	_showPreview() {
		previewModalImg.src = this._image;
		previewModalImg.alt = this._title;
		previewModalCaption.textContent = this._title;
		toggleForm(previewModal);
	}

	_setupEventListeners() {}

	generateCards() {
		this._element = this._getTemplate();
		this._setupEventListeners();

		this._element.querySelector(".text__label").textContent = this._title;
		// set image
		this._element.querySelector(".element__img").src = this._image;

		return this._element;
	}
}

export default Card;
