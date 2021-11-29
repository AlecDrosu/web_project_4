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
import Api from "../components/Api.js";
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

const config = {
	baseUrl: "https://around.nomoreparties.co/v1/group-11/users/me",
	cardUrl: "https://around.nomoreparties.co/v1/group-11/cards",
	headers: {
		authorization: "807a4335-951b-4493-9e81-0010a6738faf",
		"Content-Type": "application/json",
	},
};

const api = new Api(config);

api.getCards().then((res) => {
	console.log(res);
	res.forEach((item) => {
		renderCard({
			title: item.name,
			image: item.link,
		});
	});
});

// display the cards from the cardsURl array, to the page
const cardsList = new Section(
	{
		items: api.getCards(),
		renderer: (item) => renderCard(item),
	},
	".elements"
);

// First attempt: when the card is created, save it to the server (This does not work)
// function saveCard(item) {
// 	api.createCard(item).then((res) => {
// 		renderCard({
// 			title: res.name,
// 			image: res.link,
// 		});
// 	});
// }

// make and example test for the saveCard function (This also does not work)
// saveCard({
// 	title: "Alec",
// 	image: "https://images.unsplash.com/photo-1558987732-f9ca78462e61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// });

// second attempt: ??????????? Somehow the name and link I have below ended up in the server at the bottom
// I have no idea how or why this happened, but I have not been able to replicate it
// even after directly copying the code. (Does not work?)

// api.createCard = (data) => {
// 	return api.post(config.cardUrl, data);
// };

// addCard.addEventListener("click", () => {
// 	api.createCard({
// 		name: addTitle.value,
// 		link: addImage.value,
// 	});
// 	api.createCard({
// 		name: "Alec Drosu",
// 		link: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
// 	});
// });

// save the userinfo to the server (does not work)
api.editProfile(listTitle.value, listSubtitle.value).then((res) => {
	userInfo.setUserInfo({
		name: res.name,
		job: res.about,
	});
	userInfo.setUserAvatar({
		avatar: res.avatar,
	});
});
// Instead of the code above, maybe figure out how to use userInfoPopup

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

// Whenever the user click the element__trash button, open the popup. Then delete the card from the server when the user click the confirm button
const deleteCardPopup = new PopupWithConfirm({
	popupSelector: ".modal_type_confirm",
	handleConfirmClick: () => {
		deleteCard(cardId);
		deleteCardPopup.close();
	},
});
// deleteCardPopup.open();

// confirmUserDelete.setEventListeners();

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

// const addCardPopup = new PopupWithForm({
// 	popupSelector: ".modal_type_add",
// 	// handle saving the use info data
// 	handleFormSubmit: (data) => {
// 		renderCard(data);
// 		addCardPopup.close();
// 	},
// });

// new addCardPopup

const addCardPopup = new PopupWithForm({
	popupSelector: ".modal_type_add",
	handleFormSubmit: (item) => {
		// item is logged
		console.log(item);
		api
			.createCard(item)
			.then((res) => {
				// res does not exist??
				console.log(res);
				renderCard({
					title: res.name,
					image: res.link,
				});
			})
			.catch((err) => console.log(err))
			.finally(() => addCardPopup.close());
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
// create the addEventListener for the addcard button and createcard api
// addCard.addEventListener("click", () => {
// 	addCardPopup.open();
// 	// createCard({
// 	// 	title: addTitle.value,
// 	// 	image: addImage.value,
// 	// });
// });

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
