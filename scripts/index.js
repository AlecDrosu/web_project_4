// Query Selectors

const editProfileButton = document.querySelector(".title__button");
const infoTitle = document.querySelector(".title__name");
const infoSubtitle = document.querySelector(".info__job");
const previewModal = document.querySelector(".modal_type_preview");

const modalContainer = document.querySelector(".modal_type_edit");
const addModal = document.querySelector(".modal_type_add");
const modalCloseBtn = modalContainer.querySelector(".modal__close-btn");
const elementTemplate = document
	.querySelector("#elementTemplate")
	.content.querySelector(".element");
const elements = document.querySelector(".elements");

const editForm = modalContainer.querySelector(".form");
const addForm = addModal.querySelector(".form");

const listTitle = document.querySelector("#list-title");
const listSubtitle = document.querySelector("#list-subtitle");
const addTitle = addForm.querySelector(".form__input_type_title");
const addImage = addForm.querySelector(".form__input_type_image-url");

const addCard = document.querySelector(".profile__button");
const addModalCloseBtn = addModal.querySelector(".modal__close-btn");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImg = previewModal.querySelector(".modal__img");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const modalOverlayEdit = modalContainer.querySelector(".modal__overlay");
const modalOverlayAdd = addModal.querySelector(".modal__overlay");
const modalOverlayPreview = previewModal.querySelector(".modal__overlay");

// Functions

function fillEditForm(modal) {
	if (!modal.classList.contains("modal_is-open")) {
		listTitle.value = infoTitle.textContent;
		listSubtitle.value = infoSubtitle.textContent;
	}
}

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

function saveProfile(event) {
	event.preventDefault(editForm);
	infoTitle.textContent = listTitle.value;
	infoSubtitle.textContent = listSubtitle.value;

	toggleForm(modalContainer);
}

function showPreview(card) {
	previewModalImg.src = card.image;
	previewModalImg.alt = card.title;
	previewModalCaption.textContent = card.title;
	toggleForm(previewModal);
}

function generateCard(card) {
	// use template
	const cardEl = elementTemplate.cloneNode(true);

	const cardImage = cardEl.querySelector(".element__img");
	const trash = cardEl.querySelector(".element__trash");

	// set title
	cardEl.querySelector(".text__label").textContent = card.title;
	// set image
	cardEl.querySelector(".element__img").src = card.image;
	cardEl.querySelector(".element__img").alt = card.title;
	// Attach Events
	cardImage.addEventListener("click", () => showPreview(card));

	cardEl.addEventListener("click", function (evt) {
		evt.target.classList.toggle("text__heart_active");
	});

	trash.addEventListener("click", function () {
		cardEl.parentNode.removeChild(cardEl);
	});

	return cardEl;
}

function createCard(event) {
	event.preventDefault(addForm);
	const card = {
		title: addTitle.value,
		image: addImage.value,
	};
	const cardEl = generateCard(card);
	elements.prepend(cardEl);

	toggleForm(addModal);
}

// Event Listeners

editForm.addEventListener("submit", saveProfile);
editProfileButton.addEventListener("click", () => {
	fillEditForm(modalContainer);
	toggleForm(modalContainer);
});

modalOverlayEdit.addEventListener("click", () => removeForm(modalContainer));
modalOverlayAdd.addEventListener("click", () => removeForm(addModal));
modalOverlayPreview.addEventListener("click", () => removeForm(previewModal));
modalCloseBtn.addEventListener("click", () => toggleForm(modalContainer));
addForm.addEventListener("submit", createCard);
addCard.addEventListener("click", () => toggleForm(addModal));
addModalCloseBtn.addEventListener("click", () => toggleForm(addModal));
previewModalCloseBtn.addEventListener("click", () => toggleForm(previewModal));

// Actions

initialCards.forEach((card) => {
	cardEl = generateCard(card);

	elements.append(cardEl);
});
