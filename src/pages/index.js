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

// get rid of all the above variables except for the 4 buttons

// Functions

// ! ================ UserInfo, popupWithForm, PopupWithImages ==================

// create the constant userInfo and pass in the selectors of infoTitle and infoSubtitle
const userInfo = new UserInfo({
	userNameSelector: ".title__name",
	userJobSelector: ".info__job",
});

// getUserInfo should take care of fillEditForm
// setUserInfo should take care of saveProfile

// create the user info popup
const userInfoPopup = new PopupWithForm({
	popupSelector: ".modal_type_edit",
	// change the title__name class to what the user inputs into #list-title, and the info__job class to what the user inputs into #list-subtitle
	handleFormSubmit: (event) => {
		event.preventDefault();
		userInfo.setUserInfo({
			name: listTitle.value,
			job: listSubtitle.value,
		});
		userInfoPopup.close();
	},
});

// run setEventListeners on the userInfoPopup
userInfoPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
	popupSelector: ".modal_type_add",
	// handle saving the use info data
	handleFormSubmit: (data) => {
		const card = new Card(data, "#elementTemplate").generateCard();
		cardsList.addItem(card);
		addCardPopup.close();
	},
});

addCardPopup.setEventListeners();

// editProfileButton opens the profile

editProfileButton.addEventListener("click", () => {
	// set the user info from what is stored before opening the popup
	const { name, job } = userInfo.getUserInfo();
	listTitle.value = name; // set the value of the input to the name
	listSubtitle.value = job; // set the value of the input to the job

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

// initialize the cards
const cardsList = new Section(
	{
		items: initialCards,
		// render each card
		renderer: (card) => {
			const cardEl = new Card(card, "#elementTemplate", (data) => {
				popupImage.open(data);
			}).generateCard();
			// elements.prepend(cardEl);
			cardsList.addItem(cardEl);
		},
	},
	".elements"
);

// render the cards
cardsList.renderItems();

// initialize the form
// const formRenderer = new Section(
// 	{
// 		items: [],
// 	},
// 	".form"
// );
// finish initializing the form using formRenderer
// formRenderer.setEventListeners();

// Event Listeners

// editForm.addEventListener("submit", saveProfile);

modalOverlayEdit.addEventListener("click", () =>
	userInfoPopup.close(modalContainer)
);
modalOverlayAdd.addEventListener("click", () => addCardPopup.close(addModal));
modalCloseBtn.addEventListener("click", () =>
	userInfoPopup.close(modalContainer)
);
// addForm.addEventListener("submit", createCard);
addCard.addEventListener("click", () => addCardPopup.open()); //create an add popup class with userinfoform
addModalCloseBtn.addEventListener("click", () => addCardPopup.close());

// Actions

// initialCards.forEach((card) => {
// 	const cardEl = new Card(card, "#elementTemplate").generateCard();
// 	elements.prepend(cardEl);
// });

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

// cardsList.renderItems(InitialCards);

// openEditFormButton.addEventListener("click", () => {
// 	const currentForm = document.querySelector(".form_is-open");
// }

// should be addItem to section class
