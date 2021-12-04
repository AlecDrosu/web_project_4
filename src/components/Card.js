class Card {
	constructor(card, cardSelector, handleCardClick) {
		this._title = card.title;
		this._image = card.image;
		this._likes = card.likes;
		this._owner = card.owner._id;
		this._id = card._id;
		this._handleCardClick = handleCardClick;

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
				this._handleCardClick({ name: this._title, link: this._image })
			);
		// delete the card from the DOM when when the user confirms the deletion of the card on the popup
		// this._element
		// 	.querySelector(".element__trash")
		// 	.addEventListener("click", () => this._handleDelete());

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
		// set likes
		this._element.querySelector(".text__like-count").textContent = this._likes;

		return this._element;
	}
}

export default Card;
