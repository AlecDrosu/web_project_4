class FormValidator {
	constructor(config, formEl) {
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;

		this._formEl = formEl;
	}

	_checkInputValidity(inputEl) {
		const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
		if (!_checkIfInputValid(inputEl)) {
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
	}

	_toggleButtonState(inputList, buttonEl) {
		const allValid = inputList.every((inputEl) => _checkIfInputValid(inputEl));
		if (!allValid) {
			// lock
			buttonEl.classList.add(inactiveButtonClass);
			buttonEl.disabled = true;
		} else {
			// unlock
			buttonEl.classList.remove(inactiveButtonClass);
			buttonEl.disabled = false;
		}
	}

	_checkIfInputValid(inputEl) {
		return inputEl.validity.valid;
	}

	_setupEventListeners() {
		toggleButtonState(inputList, buttonEl);

		inputEl.addEventListener("input", () => {
			// check if input is valid
			_checkInputValidity(inputEl);
			_toggleButtonState(inputList, buttonEl);
		});
	}

	enableValidation() {
		this._formEl.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		// setup event listeners for the form fields
		this._setupEventListeners();
	}
}

export default FormValidator;
