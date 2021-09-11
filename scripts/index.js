


// Query Selectors

const editProfileButton = document.querySelector('.title__button');
const infoTitle = document.querySelector('.title__name');
const infoSubtitle = document.querySelector('.info__job');

const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');
const editModalCloseBtn = editModal.querySelector('.modal__close-btn');
const elementTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');
const elements = document.querySelector('.elements');

const editForm = editModal.querySelector('.form');
const addForm = addModal.querySelector('.form');

const listTitle = document.querySelector('#list-title');
const listSubtitle = document.querySelector('#list-subtitle');
const addTitle = addForm.querySelector('.form__input_type_title');
const addImage = addForm.querySelector('.form__input_type_image-url');

const addCard = document.querySelector('.profile__button');
const addModalCloseBtn = addModal.querySelector('.modal__close-btn');

// Functions

function generateCards(card) {
    // use template
    const cardEl = elementTemplate.cloneNode(true);
    // set title
    cardEl.querySelector('.text__label').textContent = card.title;
    // set image
    cardEl.querySelector('.element__img').src = card.image;

    return cardEl;
}

function fillEditForm(editModal) {
        if (!editModal.classList.contains('modal_is-open')) {
        listTitle.value = infoTitle.textContent;
        listSubtitle.value = infoSubtitle.textContent;
    }
}

function toggleForm(editModal) {
    editModal.classList.toggle('modal_is-open');
}

function saveProfile(event) {
    event.preventDefault(editForm);
    infoTitle.textContent = listTitle.value;
    infoSubtitle.textContent = listSubtitle.value;

    toggleForm(editModal);
}

function createCard(event) {
    event.preventDefault(addForm);
    const card = {
        title: addTitle.value,
        image: addImage.value,
    };
    const cardEl = generateCards(card);
    elements.prepend(cardEl);
    toggleForm(addModal);
}

// Event Listeners

editForm.addEventListener('submit', saveProfile);
editProfileButton.addEventListener('click', () => {
    fillEditForm(editModal);
    toggleForm(editModal)
});
editModalCloseBtn.addEventListener('click', () => toggleForm(editModal));
addForm.addEventListener('submit', createCard);
addCard.addEventListener('click', () => toggleForm(addModal));
addModalCloseBtn.addEventListener('click', () => toggleForm(addModal));

// Actions

initialCards.forEach(card => {
    cardEl = generateCards(card);
    // append to list
    elements.append(cardEl);
})