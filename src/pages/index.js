import "./index.css";

import FormValidator from "../components/FormValidator.js";
import initialCards from "../components/utils.js";
import Card from "../components/Card.js";
// import the rest of the javascript files
import UserInfo from "../components/UserInfo.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";

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

// create an instance of the Popup class

const popup = new Popup(".modal_is-open");

// ! ================ UserInfo, popupWithForm, PopupWithImages ==================

const userInfo = new UserInfo(
	document.querySelector("#list-title"),
	document.querySelector("#list-subtitle")
);
// getUserInfo should take care of fillEditForm
// setUserInfo should take care of saveProfile

// create the user info popup
const userInfoPopup = new PopupWithForm({
	popupSelector: ".modal_type_add",
	// handle saving the use info data
	handleFormSubmit: (data) => {
		userInfo.setUserInfo(listTitle.value, listSubtitle.value);
		// what is the purpose of passing the data to the function?
	},
});

// run setEventListeners on the userInfoPopup
userInfoPopup.setEventListeners();

// editProfileButton opens the profile

editProfileButton.addEventListener("click", () => {
	// set the user info from what is stored before opening the popup
	userInfoPopup.getUserInfo();

	userInfoPopup.open();
});

// create the add card popup using the popupWithImages class
const popupImage = new PopupWithImages(".modal_type_preview");

// run setEventListeners on the popupImage
popupImage.setEventListeners();

modalOverlayPreview.addEventListener("click", () => popupImage.close());
previewModalCloseBtn.addEventListener("click", () => popupImage.close());

// ! ==========================================================================
// ! ============================== Section ===================================

// ! ==========================================================================

function fillEditForm(modal) {
	if (!modal.classList.contains("modal_is-open")) {
		// listTitle.value = infoTitle.textContent;
		// listSubtitle.value = infoSubtitle.textContent;
		return userInfo.getUserInfo(modal);
	}
}

function keyHandler(evt) {
	const modal = document.querySelector(".modal_is-open");
	if (evt.key === "Escape") {
		closeModal(modal);
	}
}

function saveProfile(event) {
	event.preventDefault(editForm);

	return userInfo.setUserInfo(listTitle.value, listSubtitle.value);
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

modalOverlayEdit.addEventListener("click", () => popup.close(modalContainer));
modalOverlayAdd.addEventListener("click", () => popup.close(addModal));
modalCloseBtn.addEventListener("click", () => popup.close(modalContainer));
addForm.addEventListener("submit", createCard);
addCard.addEventListener("click", () => popup.open(addModal));
addModalCloseBtn.addEventListener("click", () => popup.close(addModal));

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
