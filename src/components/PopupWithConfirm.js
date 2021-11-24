import Popup from './Popup.js';


// class that will open a popup to confirm the deletion of the card
export default class PopupWithConfirm extends Popup {
    constructor({ handleConfirm, popupSelector }) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.querySelector(".modal_type_delete-card").addEventListener("click", () => {
            this._handleConfirm();
            this.close();
        });
    }
}