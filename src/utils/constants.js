const editProfileButton = document.querySelector(".title__button");
const modalContainer = document.querySelector(".modal_type_edit");
const addModal = document.querySelector(".modal_type_add");
const editForm = modalContainer.querySelector(".form");
const addForm = addModal.querySelector(".form");
const editProfileModal = document.querySelector(".modal_type_edit-pic");
const deleteModal = document.querySelector(".modal_type_confirm");
const editAvatarForm = editProfileModal.querySelector(".form");
const listTitle = modalContainer.querySelector("#name");
const listSubtitle = modalContainer.querySelector("#about");
const addCard = document.querySelector(".profile__button");
const editProfileImage = document.querySelector(".profile__avatar-edit");
const addSubmitBtn = addModal.querySelector(".form__submit");
const editSubmitBtn = modalContainer.querySelector(".form__submit");
const avatarSubmitBtm = editProfileModal.querySelector(".form__submit");
const deleteSubmitBtn = deleteModal.querySelector(".form__submit");
const userID = "78f85ac28985def725e0e651";

const formValidationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__error_visible",
};

const config = {
  baseUrl: "https://around.nomoreparties.co/v1/group-11",
  cardUrl: "https://around.nomoreparties.co/v1/group-11/cards",
  headers: {
    authorization: "807a4335-951b-4493-9e81-0010a6738faf",
    "Content-Type": "application/json",
  },
};

// export all the constants
export {
  editProfileButton,
  modalContainer,
  addModal,
  editForm,
  addForm,
  editProfileModal,
  deleteModal,
  editAvatarForm,
  listTitle,
  listSubtitle,
  addCard,
  editProfileImage,
  addSubmitBtn,
  editSubmitBtn,
  avatarSubmitBtm,
  deleteSubmitBtn,
  userID,
  formValidationConfig,
  config,
};
