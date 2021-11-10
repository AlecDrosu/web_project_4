import "./index.css";

import FormValidator from "../components/FormValidator.js";
import initialCards from "../components/utils.js";
import Card from "../components/Card.js";

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
		closeModal(modal);
	}
}

function closeModal(modal) {
	modal.classList.remove("modal_is-open");
	document.removeEventListener("keydown", keyHandler);
}

export function openModal(modal) {
	modal.classList.add("modal_is-open");
	document.addEventListener("keydown", keyHandler);
}

function saveProfile(event) {
	event.preventDefault(editForm);
	infoTitle.textContent = listTitle.value;
	infoSubtitle.textContent = listSubtitle.value;

	closeModal(modalContainer);
}

function createCard(event) {
	event.preventDefault();
	const card = {
		title: addTitle.value,
		image: addImage.value,
	};
	const cardEl = new Card(card, "#elementTemplate").generateCard();
	elements.prepend(cardEl);

	addForm.reset();

	closeModal(addModal);
}

// Event Listeners

editForm.addEventListener("submit", saveProfile);
editProfileButton.addEventListener("click", () => {
	fillEditForm(modalContainer);
	openModal(modalContainer);
});

modalOverlayEdit.addEventListener("click", () => closeModal(modalContainer));
modalOverlayAdd.addEventListener("click", () => closeModal(addModal));
modalOverlayPreview.addEventListener("click", () => closeModal(previewModal));
modalCloseBtn.addEventListener("click", () => closeModal(modalContainer));
addForm.addEventListener("submit", createCard);
addCard.addEventListener("click", () => openModal(addModal));
addModalCloseBtn.addEventListener("click", () => closeModal(addModal));
previewModalCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Actions

initialCards.forEach((card) => {
	const cardEl = new Card(card, "#elementTemplate").generateCard();
	elements.prepend(cardEl);
});

const formValidationConfig = {
	inputSelector: ".form__input",
	submitButtonSelector: ".form__submit",
	inactiveButtonClass: "form__submit_inactive",
	inputErrorClass: "form__input_type_error",
	errorClass: "popup__error_visible",
};

const addFormValidator = new FormValidator(formValidationConfig, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formValidationConfig, editForm);
editFormValidator.enableValidation();
