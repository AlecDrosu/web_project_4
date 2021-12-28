import "./index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
// import the rest of the javascript files
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImages.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import {
  editProfileButton,
  editForm,
  addForm,
  editAvatarForm,
  listTitle,
  listSubtitle,
  addCard,
  editProfileImage,
  formValidationConfig,
  config,
} from "../utils/constants.js";

// Query Selectors

// Functions

const api = new Api(config);

// display the cards from the cardsURl array, to the page
const cardsList = new Section(
  {
    renderer: (item) =>
      renderCard({
        title: item.name,
        image: item.link,
        likes: item.likes.length,
        owner: item.owner._id,
        id: item._id,
        userLikes: item.likes,
      }),
  },
  ".elements"
);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInf, cards]) => {
    userInfo.setUserInfo({
      name: userInf.name,
      job: userInf.about,
      _id: userInf._id,
    });
    userInfo.setUserAvatar({
      avatar: userInf.avatar,
    });
    cardsList.renderItems(cards);
  })
  .catch((err) => console.log(err));

// create the constant userInfo and pass in the selectors of infoTitle and infoSubtitle
const userInfo = new UserInfo({
  userNameSelector: ".title__name",
  userJobSelector: ".info__job",
  avatarSelector: ".profile__avatar",
});

const userImagePopup = new PopupWithForm({
  popupSelector: ".modal_type_edit-pic",
  handleFormSubmit: (data) => {
    api
      .editAvatar({ avatar: data.avatar })
      .then((res) => {
        userInfo.setUserAvatar({
          avatar: res.avatar,
        });
        userImagePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => userImagePopup.renderLoading(false));
  },
});
const userInfoPopup = new PopupWithForm({
  popupSelector: ".modal_type_edit",
  handleFormSubmit: (data) => {
    api
      .editProfile({ name: data.name, about: data.about })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
        });
        userInfoPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => userInfoPopup.renderLoading(false));
  },
});

userImagePopup.setEventListeners();
userInfoPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: ".modal_type_add",
  handleFormSubmit: (item) => {
    api
      .createCard(item)
      .then((res) => {
        renderCard({
          title: res.name,
          image: res.link,
          likes: res.likes.length,
          owner: res.owner._id,
          id: res._id,
          userLikes: res.likes,
        });
        addCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => addCardPopup.renderLoading(false));
  },
});

addCardPopup.setEventListeners();

const cardDeletePopup = new PopupWithConfirm(".modal_type_confirm");

cardDeletePopup.setEventListeners();

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

// add an eventlistener to the editprofileimage button, so that the profile__avatar image changes to whatever image is in the input
editProfileImage.addEventListener("click", () => userImagePopup.open());

// create a common renderer function to not duplicate code
function renderCard(item) {
  const cardEl = new Card(
    item,
    "#elementTemplate",
    (data) => {
      popupImage.open(data);
    },
    userInfo.getUserInfo()._id,
    (id) => {
      // if the card was already liked by the user, then unlike it
      if (
        item.userLikes.filter((user) => user._id === userInfo.getUserInfo()._id)
          .length > 0
      ) {
        api
          .dislikeCard(id)
          .then((res) => {
            cardEl.updateDislikes(res);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .likeCard(id)
          .then((res) => {
            cardEl.updateLikes(res);
          })
          .catch((err) => console.log(err));
      }
    },
    (id) => {
      cardDeletePopup.open(id);
      cardDeletePopup.handleConfirm = () => {
        api
          .deleteCard(id)
          .then(() => {
            cardEl.remove();
            cardDeletePopup.close();
          })
          .catch((err) => console.log(err))
          .finally(() => cardDeletePopup.renderLoading(false));
      };
    }
  );
  cardsList.addCard(cardEl.generateCard());

  // return cardEl;
}

// Event Listeners
addCard.addEventListener("click", () => addCardPopup.open()); //create an add popup class with userinfoform

// Actions

const addFormValidator = new FormValidator(formValidationConfig, addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(formValidationConfig, editForm);
editFormValidator.enableValidation();

const editAvatarValidator = new FormValidator(
  formValidationConfig,
  editAvatarForm
);
editAvatarValidator.enableValidation();
