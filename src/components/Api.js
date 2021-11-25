// Token 807a4335-951b-4493-9e81-0010a6738faf
// Group ID
// group-11

export default class Api {
	constructor(baseURL, headers, cardUrl) {
		// constructor body
        this._url = baseURL;
        this._headers = headers;
        this._cardUrl = cardUrl;

	}

    getCards() {
        // fetch the url with the token: 807a4335-951b-4493-9e81-0010a6738faf
        fetch(this._cardUrl, {
            headers: {
                authorization: "807a4335-951b-4493-9e81-0010a6738faf",
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
    
                return new Promise.reject(`Error: ${res.status}`);
            })
            .then((res) => {
                res.forEach((item) => {
                    renderCard({
                        title: item.name,
                        image: item.link,
                    });
                });
            });
    };

	// other methods for working with the API
}
