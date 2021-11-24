import "./index.css";

import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/constants.js";
import Card from "../components/Card.js";
// import the rest of the javascript files
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImages.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
// import { search } from "core-js/fn/symbol";

// Query Selectors

const editProfileButton = document.querySelector(".title__button");
const modalContainer = document.querySelector(".modal_type_edit");
const addModal = document.querySelector(".modal_type_add");
const editForm = modalContainer.querySelector(".form");
const addForm = addModal.querySelector(".form");
const editProfileModal = document.querySelector(".modal_type_edit-pic");
const editProfileForm = editProfileModal.querySelector(".form");
const listTitle = document.querySelector("#list-title");
const listSubtitle = document.querySelector("#list-subtitle");
const imageURL = document.querySelector("#image-url");
const addTitle = addForm.querySelector(".form__input_type_title");
const addImage = addForm.querySelector(".form__input_type_image-url");
const addCard = document.querySelector(".profile__button");
const cardDeletBtn = document.querySelector(".element__trash");
const editProfileImage = document.querySelector(".profile__avatar_edit");
const profileImage = document.querySelector(".profile__avatar");

// Functions

// when the user presses the delete button, open the popupwithconfirm popup, and pass the function to delete the card

const popupWithConfirm = new PopupWithConfirm({
	popupSelector: ".modal_type_delete-card",
	// delete the card when the user confirms the popup, then close the popup
	handleConfirm: () => {
		const cardId = cardDeletBtn.dataset.id;
		const card = cardsList.addItem(cardId);
		cardsList.deleteItem(cardId);
		card.deleteCard();
	},
});
// popupWithConfirm.open();

// PopupWithConfirm.setEventListeners();

// // ! ===========================================================================
// // ! ============================ SPRINT 9 =====================================
// // ! ===========================================================================

// // ! ================ Load user information from the server =====================

// const baseUrl = "https://around.nomoreparties.co/v1/group-11/users/me";
// // fetch the url with the token: 807a4335-951b-4493-9e81-0010a6738faf

// fetch(baseUrl, {
// 	headers: {
// 		authorization: "807a4335-951b-4493-9e81-0010a6738faf",
// 		"Content-Type": "application/json",
// 	},
// });

// // ! ====================== Load initial cards from the server =========================

// // GET the initial cards from the server
// const getCards = () => {
// 	// fetch the url with the token: 807a4335-951b-4493-9e81-0010a6738faf
// 	fetch(`https://around.nomoreparties.co/v1/group-11/cards`, {
// 		headers: {
// 			authorization: "807a4335-951b-4493-9e81-0010a6738faf",
// 			"Content-Type": "application/json",
// 		},
// 	})
// 		.then((res) => {
// 			if (res.ok) {
// 				return res.json();
// 			}
// 		})
// 		.then((res) => {
// 			// console.log(res);
// 			res.forEach((item) => {
// 				const card = new Card(
// 					{
// 						name: item.name,
// 						link: item.link,
// 					},
// 					"#elementTemplate",
// 					{
// 						handleCardClick: () => {
// 							PopupWithImage.open(item.name, item.link);
// 						},
// 						handleDeleteClick: () => {
// 							PopupWithConfirm.open(
// 								"Are you Sure?",
// 								() => {
// 									deleteCard(item._id);
// 								}
// 							);
// 						},
// 					}
// 				);
// 				card.generateCard();
// 				cardsList.addItem(card.cardElement);
// 			});
// 		});
// };

// // display the cards from the cardsURl array, to the page
const cardsList = new Section(
	{
		items: initialCards,
		renderer: (item) => renderCard(item),
	},
	".elements"
);

cardsList.renderItems();

// getCards();

// ! ===========================================================================
// ! ===========================================================================
// ! ===========================================================================

// ! ================ UserInfo, popupWithForm, PopupWithImage ==================

// create the constant userInfo and pass in the selectors of infoTitle and infoSubtitle
const userInfo = new UserInfo({
	userNameSelector: ".title__name",
	userJobSelector: ".info__job",
	avatarSelector: ".profile__avatar",
});

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

// create the change profile image popup
const userImagePopup = new PopupWithForm({
	popupSelector: ".modal_type_edit-pic",
	handleFormSubmit: () => {
		userInfo.setUserAvatar({
			avatar: imageURL.value,
		});

		userImagePopup.close();
	},
});

// run setEventListeners on the userImagePopup
userImagePopup.setEventListeners();

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

// ! ================ DeleteCardPopup ====================

// ! ======================================================

// add an eventlistener to the editprofileimage button, so that the profile__avatar image changes to whatever image is in the input
editProfileImage.addEventListener("click", () => userImagePopup.open());
// cardDeletBtn.addEventListener("click", () => daleteCardPopup.open());

// ! ============================== Section ===================================

// create a common renderer function to not duplicate code
function renderCard(item) {
	const cardEl = new Card(item, "#elementTemplate", (data) => {
		popupImage.open(data);
	}).generateCard();
	cardsList.addItem(cardEl);
}

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

const editProfileFormValidator = new FormValidator(
	formValidationConfig,
	editProfileForm
);
editProfileFormValidator.enableValidation();