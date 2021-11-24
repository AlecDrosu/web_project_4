// Token 807a4335-951b-4493-9e81-0010a6738faf
// Group ID
// group-11

export default class Api {
	constructor(options) {
		// constructor body
        this._options = options;


	}

	getInitialCards() {
		return fetch(`https://around.nomoreparties.co/v1/group-11/cards`, {
			headers: {
				authorization: "807a4335-951b-4493-9e81-0010a6738faf",
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Error: ${res.status}`);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// other methods for working with the API
}
