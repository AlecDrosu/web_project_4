import "./index.css";

import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/constants.js";
import Card from "../components/Card.js";
// import the rest of the javascript files
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImages.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
// import { search } from "core-js/fn/symbol";

// Query Selectors

const editProfileButton = document.querySelector(".title__button");
const modalContainer = document.querySelector(".modal_type_edit");
const addModal = document.querySelector(".modal_type_add");
const editForm = modalContainer.querySelector(".form");
const addForm = addModal.querySelector(".form");
const listTitle = document.querySelector("#list-title");
const listSubtitle = document.querySelector("#list-subtitle");
const addTitle = addForm.querySelector(".form__input_type_title");
const addImage = addForm.querySelector(".form__input_type_image-url");
const addCard = document.querySelector(".profile__button");

// Functions

// ! ================ UserInfo, popupWithForm, PopupWithImage ==================

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
	handleFormSubmit: () => {
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
	handleFormSubmit: () => {
		renderCard({
			title: addTitle.value,
			image: addImage.value,
		});
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

// create the add card popup using the PopupWithImage class
const popupImage = new PopupWithImage(".modal_type_preview");

// run setEventListeners on the popupImage
popupImage.setEventListeners();

// ! ============================== Section ===================================

// create a common renderer function to not duplicate code
function renderCard(item) {
	const cardEl = new Card(item, "#elementTemplate", (data) => {
		popupImage.open(data);
	}).generateCard();
	cardsList.addItem(cardEl);
}

// initialize the cards
const cardsList = new Section(
	{
		items: initialCards,
		// render each card using the renderCard function
		renderer: (item) => renderCard(item),
	},
	".elements"
);

// render the cards
cardsList.renderItems();

// Event Listeners
addCard.addEventListener("click", () => addCardPopup.open()); //create an add popup class with userinfoform

// Actions

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
