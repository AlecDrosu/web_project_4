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
const addCard = document.querySelector(".profile__button");
const editProfileImage = document.querySelector(".profile__avatar-edit");
const addSubmitBtn = addModal.querySelector(".form__submit");
const editSubmitBtn = modalContainer.querySelector(".form__submit");
const avatarSubmitBtm = editProfileModal.querySelector(".form__submit");
const deleteSubmitBtn = deleteModal.querySelector(".form__submit");
const userID = "78f85ac28985def725e0e651";

// export all the constants
export {
  editProfileButton,
  modalContainer,
  addModal,
  editForm,
  addForm,
  editProfileModal,
  deleteModal,
  editProfileForm,
  listTitle,
  listSubtitle,
  addCard,
  editProfileImage,
  addSubmitBtn,
  editSubmitBtn,
  avatarSubmitBtm,
  deleteSubmitBtn,
  userID,
};
