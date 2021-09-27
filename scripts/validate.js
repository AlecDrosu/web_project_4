const isValid = (inputEl) => {
	return inputEl.validity.valid;
};

const checkInputValidity = (formEl, inputEl, settings) => {
	const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
	if (!isValid(inputEl)) {
		// show error message and add error class
		inputEl.classList.add(settings.inputErrorClass);
		errorEl.innerText = inputEl.validationMessage;
		errorEl.classList.add(settings.errorClass);
	} else {
		// hide error message and remove it
		inputEl.classList.remove(settings.inputErrorClass);
		errorEl.innerText = "";
		errorEl.classList.remove(settings.errorClass);
	}
};

toggleButtonState = (inputList, buttonEl, { inactiveButtonClass }) => {
	const allValid = inputList.every((inputEl) => isValid(inputEl));
	if (allValid) {
		// lock
		buttonEl.classList.remove(inactiveButtonClass);
		buttonEl.disabled = false;
	} else {
		// unlock
		buttonEl.classList.add(inactiveButtonClass);
		buttonEl.disabled = true;
	}
};

const setupEventListeners = (
	formEl,
	{ inputSelector, submitButtonSelector, ...moreSettings }
) => {
	// get the form elements
	const inputList = Array.from(formEl.querySelectorAll(inputSelector));
	const buttonEl = formEl.querySelector(submitButtonSelector);
	// setup listeners for the form elements

	inputList.forEach((inputEl) => {
		inputEl.addEventListener("input", (evt) => {
			// check if input is valid
			checkInputValidity(formEl, inputEl, moreSettings);
			toggleButtonState(inputList, buttonEl, moreSettings);
		});
	});
};

// enabling validation by calling enableValidation()
// pass all the settings on call

const enableValidation = ({ formSelector, ...moreSettings }) => {
	// select all the forms
	const formList = Array.from(document.querySelectorAll(formSelector));
	// loop through forms and setup listeners
	formList.forEach((formEl) => {
		formEl.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		// setup event listeners for the form fields
		setupEventListeners(formEl, moreSettings);
	});
};

enableValidation({
	formSelector: ".form",
	inputSelector: ".form__input",
	submitButtonSelector: ".form__submit",
	inactiveButtonClass: "form__submit_inactive",
	inputErrorClass: "form__input_type_error",
	errorClass: "popup__error_visible",
});
