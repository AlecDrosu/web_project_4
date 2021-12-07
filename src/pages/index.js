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
const deleteModal = document.querySelector(".modal_type_confirm");
const editProfileForm = editProfileModal.querySelector(".form");
const listTitle = modalContainer.querySelector("#name");
const listSubtitle = modalContainer.querySelector("#about");
const imageURL = document.querySelector("#link");
const addTitle = addForm.querySelector(".form__input_type_title");
const addImage = addForm.querySelector(".form__input_type_link");
const addCard = document.querySelector(".profile__button");
const cardDeletBtn = document.querySelector(".element__trash");
const editProfileImage = document.querySelector(".profile__avatar_edit");
const profileImage = document.querySelector(".profile__avatar");

const addSubmitBtn = addModal.querySelector(".form__submit");
const editSubmitBtn = modalContainer.querySelector(".form__submit");
const avatarSubmitBtm = editProfileModal.querySelector(".form__submit");
const deleteSubmitBtn = deleteModal.querySelector(".form__submit");
// const submitBtn = document.querySelector(".form__submit");

// Functions

export function renderLoading(isLoading) {
	if (isLoading) {
		addSubmitBtn.textContent = "Creating...";
		editSubmitBtn.textContent = "Saving...";
		avatarSubmitBtm.textContent = "Saving...";
		deleteSubmitBtn.textContent = "Deleting...";
	} else {
		addSubmitBtn.textContent = "Create";
		editSubmitBtn.textContent = "Save";
		avatarSubmitBtm.textContent = "Save";
		deleteSubmitBtn.textContent = "Yes";
	}
}

const config = {
	baseUrl: "https://around.nomoreparties.co/v1/group-11/users/me",
	cardUrl: "https://around.nomoreparties.co/v1/group-11/cards",
	headers: {
		authorization: "807a4335-951b-4493-9e81-0010a6738faf",
		"Content-Type": "application/json",
	},
	// userID: '78f85ac28985def725e0e651',
};

const api = new Api(config);

api.getCards().then((res) => {
	res.forEach((item) => {
		// console.log(item);
		renderCard({
			title: item.name,
			image: item.link,
			likes: item.likes.length,
			owner: item.owner._id,
			id: item._id,
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

// ! ================ UserInfo, popupWithForm, PopupWithImage ==================

// create the constant userInfo and pass in the selectors of infoTitle and infoSubtitle
const userInfo = new UserInfo({
	userNameSelector: ".title__name",
	userJobSelector: ".info__job",
	avatarSelector: ".profile__avatar",
});

// create the user info popup
// const userInfoPopup = new PopupWithForm({
// 	popupSelector: ".modal_type_edit",
// 	handleFormSubmit: () => {
// 		userInfo.setUserInfo({
// 			name: listTitle.value,
// 			job: listSubtitle.value,
// 		});
// 		userInfoPopup.close();
// 	},
// });

const userImagePopup = new PopupWithForm({
	popupSelector: ".modal_type_edit-pic",
	handleFormSubmit: (data) => {
		console.log(data);
		api
			.editProfile({ avatar: data.avatar })
			.then((res) => {
				console.log(res);
				userInfo.setUserAvatar({
					avatar: res.avatar,
				});
			})
			.catch((err) => console.log(err))
			.finally(() => userImagePopup.close());
	},
});
const userInfoPopup = new PopupWithForm({
	popupSelector: ".modal_type_edit",
	handleFormSubmit: (data) => {
		console.log(data);
		api
			.editProfile({ name: data.name, about: data.about })
			.then((res) => {
				console.log(res.avatar);
				userInfo.setUserInfo({
					name: res.name,
					job: res.about,
				});
				// userInfo.setUserAvatar({
				// 	avatar: res.avatar,
				// });
			})
			.catch((err) => console.log(err))
			.finally(() => userInfoPopup.close());
	},
});

userImagePopup.setEventListeners();
userInfoPopup.setEventListeners();

api.getUserInfo().then((res) => {
	userInfo.setUserInfo({
		name: res.name,
		job: res.about,
	});
	userInfo.setUserAvatar({
		avatar: res.avatar,
	});
});

const addCardPopup = new PopupWithForm({
	popupSelector: ".modal_type_add",
	handleFormSubmit: (item) => {
		api
			.createCard(item)
			.then((res) => {
				console.log(res);
				renderCard({
					title: res.name,
					image: res.link,
					likes: res.likes,
					// owner: item.owner._id,
					id: item._id,
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

	// renderLoading(false);
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

	// console.log(item);
	if (item.owner !== "78f85ac28985def725e0e651") {
		cardEl.querySelector(".element__trash").style.display = "none";
	}

	if (item.owner === "78f85ac28985def725e0e651") {
		cardEl.querySelector(".element__trash").addEventListener("click", () => {
			const cardDeletPopup = new PopupWithConfirm({
				popupSelector: ".modal_type_confirm",
				id: item.id,
				handleConfirm: (id) => {
					console.log(id);
					api
						.deleteCard({ cardId: id })
						.then((res) => {
							cardEl.remove();
						})
						.catch((err) => console.log(err))
						.finally(() => cardDeletPopup.close());
				},
			});

			cardDeletPopup.setEventListeners();

			cardDeletPopup.open();
		});
	}
}

// Event Listeners
addCard.addEventListener("click", () => addCardPopup.open()); //create an add popup class with userinfoform
// create the addEventListener for the addcard button and createcard api

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

const editAvatarValidator = new FormValidator(
	formValidationConfig,
	editProfileForm
);
editAvatarValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
	formValidationConfig,
	editProfileForm
);
editProfileFormValidator.enableValidation();
