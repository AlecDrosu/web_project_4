class Card {
  constructor(
    card,
    cardSelector,
    handleCardClick,
    userId,
    handleLike,
    handleDelete
  ) {
    this._title = card.title;
    this._image = card.image;
    this._likes = card.likes;
    this._owner = card.owner;
    this._id = card.id;
    this._userLikes = card.userLikes;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
  }
  // if the card was not created by the user, then the delete button is not displayed
  _setDeleteButton() {
    if (this._userId !== this._owner) {
      this._element.querySelector(".element__trash").style.display = "none";
    }
  }
  // if the user likes a card, then the button should have the text__heart_active class
  _setLikeButton() {
    if (
      this._userLikes.filter((user) => user._id === this._userId).length > 0
    ) {
      this._element
        .querySelector(".text__heart")
        .classList.add("text__heart_active");
    }
  }

  updateLikes() {
    this._element.querySelector('.text__heart').classList.add('text__heart_active');
    this._element.querySelector('.text__like-count').textContent = this._likes + 1;
  }

  updateDislikes() {
    this._element.querySelector('.text__heart').classList.remove('text__heart_active');
    this._element.querySelector('.text__like-count').textContent = this._likes - 1;
  }

  remove() {
    this._element.remove();
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

    this._element
      .querySelector(".text__heart")
      .addEventListener("click", () => this._handleLike({ cardId: this._id }));

    // when the user clicks on the trash icon, the cardDeletePopup is activated, and if it is submitted, the card is deleted
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._handleDelete({ cardId: this._id });
      });

    this._setDeleteButton();
    this._setLikeButton();
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
