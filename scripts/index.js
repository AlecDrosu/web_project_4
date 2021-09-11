


// Query Selectors

const editProfileButton = document.querySelector('.title__button');
const infoTitle = document.querySelector('.title__name');
const infoSubtitle = document.querySelector('.info__job');

const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__close-btn');
const elementTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');
const elements = document.querySelector('.elements');

const form = document.querySelector('.form');
const listTitle = document.querySelector('#list-title');
const listSubtitle = document.querySelector('#list-subtitle');


// Functions

function toggleForm() {
    modal.classList.toggle('modal_is-open');

    if (modal.classList.contains('modal_is-open')) {
        listTitle.value = infoTitle.textContent;
        listSubtitle.value = infoSubtitle.textContent;
    }
}

function saveProfile(event) {
    event.preventDefault(form);
    infoTitle.textContent = listTitle.value;
    infoSubtitle.textContent = listSubtitle.value;

    toggleForm();
}

// Event Listeners

form.addEventListener('submit', saveProfile, false);
editProfileButton.addEventListener('click', toggleForm, false);
closeButton.addEventListener('click', toggleForm, false);

// Actions

initialCards.forEach(card => {
    // use template
    const cardEl = elementTemplate.cloneNode(true);
    // set title
    cardEl.querySelector('.text__label').textContent = card.title;
    // set image
    cardEl.querySelector('.element__img').src = card.image;
    // append to list
    elements.append(cardEl);
})