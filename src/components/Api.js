// Token 807a4335-951b-4493-9e81-0010a6738faf
// Group ID
// group-11
export default class Api {
  constructor({ baseUrl, cardUrl, headers, userID }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._cardUrl = cardUrl;
    this._headers = headers;
    // this._userID = userID;
  }

  // Since a low of the code is repeated, create _checkResponse method
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getCards() {
    // fetch the url with the token: 807a4335-951b-4493-9e81-0010a6738faf
    return fetch(this._cardUrl, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  createCard(card) {
    return fetch(this._cardUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card),
    }).then(this._checkResponse);
  }

  deleteCard({ cardId }) {
    return fetch(`${this._cardUrl}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard({ cardId }) {
    return fetch(`${this._cardUrl}/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard({ cardId }) {
    return fetch(`${this._cardUrl}/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Editing the profile. Once edited, profile data must be saved on the server. To do this, send a request using the PATCH method:
  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  editAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
