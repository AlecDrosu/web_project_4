// Token 807a4335-951b-4493-9e81-0010a6738faf
// Group ID
// group-11
export default class Api {
	constructor({ baseUrl, cardUrl, headers }) {
		// constructor body
		this._baseUrl = baseUrl;
		this._cardUrl = cardUrl;
		this._headers = headers;
	}

	getCards() {
		// fetch the url with the token: 807a4335-951b-4493-9e81-0010a6738faf
		return fetch(this._cardUrl, {
			headers: this._headers,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}

			return new Promise.reject(`Error: ${res.status}`);
		});
	}

	createCard(card) {
		return fetch(this._cardUrl, { 
			method: "POST",
			headers: this._headers,
			body: JSON.stringify(card),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}

			return Promise.reject(`Error: ${res.status}`);
		}).catch((err) => {
            console.log(err);
        });
        
	}

	deleteCard({ cardId }) {
		return fetch(`${this._cardUrl}/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}

			return Promise.reject(`Error: ${res.status}`);
		});
	}

	// Editing the profile. Once edited, profile data must be saved on the server. To do this, send a request using the PATCH method:
	editProfile({ name, about }) {
		return fetch(this._baseUrl, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ name, about }),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}

			return Promise.reject(`Error: ${res.status}`);
		});
	}
}
