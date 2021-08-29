// Query Selectors

let editProfileButton = document.querySelector('.title__icon');
let infoTitle = document.querySelector('.title__name');
let infoSubtitle = document.querySelector('.info__job');

let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.modal__close-btn');

let form = document.querySelector('.form');
let listTitle = document.querySelector('#list-title');
let listSubtitle = document.querySelector('#list-subtitle');

listTitle.value = infoTitle.textContent;
listSubtitle.value = infoSubtitle.textContent;

// Functions

function toggleForm() {
    modal.classList.toggle('modal_is-open');
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
