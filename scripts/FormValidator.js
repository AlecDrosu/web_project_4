class FormValidator {
	constructor(config, formEl) {
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;

		this._formEl = formEl;
	}

	_checkIfInputValid(inputEl) {
		return inputEl.validity.valid;
	}

	_checkInputValidity(inputEl) {
		const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
		if (!this._checkIfInputValid(inputEl)) {
			// show error message and add error class
			inputEl.classList.add(this._inputErrorClass);
			errorEl.innerText = inputEl.validationMessage;
			errorEl.classList.add(this._errorClass);
		} else {
			// hide error message and remove it
			inputEl.classList.remove(this._inputErrorClass);
			errorEl.innerText = "";
			errorEl.classList.remove(this._errorClass);
		}
	}

	_toggleButtonState(inputList, buttonEl) {
		const allValid = inputList.every((inputEl) => this._checkIfInputValid(inputEl));
		if (!allValid) {
			// lock
			buttonEl.classList.add(this._inactiveButtonClass);
			buttonEl.disabled = true;
		} else {
			// unlock
			buttonEl.classList.remove(this._inactiveButtonClass);
			buttonEl.disabled = false;
		}
	}



	// _setupEventListeners() {
	// 	toggleButtonState(inputList, buttonEl);

	// 	inputEl.addEventListener("input", () => {
	// 		// check if input is valid
	// 		_checkInputValidity(inputEl);
	// 		_toggleButtonState(inputList, buttonEl);
	// 	});

	// }

	_setupEventListeners() {
		const inputList = Array.from(
			this._formEl.querySelectorAll(this._inputSelector)
		);
		const buttonEl = this._formEl.querySelector(this._submitButtonSelector);
		// toggleButtonState(inputList, buttonEl);

		inputList.forEach((inputEl) => {
			this._checkInputValidity(inputEl);
		});

		this._toggleButtonState(inputList, buttonEl);

		inputList.forEach((inputEl) => {
			inputEl.addEventListener("input", () => {
				this._checkInputValidity(inputEl);
				this._toggleButtonState(inputList, buttonEl);
			});
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
