// Here lies the code that I need but clutters everything in index.js

// create the card using the api.createCard method
// function createCard({title, image}) {
// 	api.createCard({
// 		title: title,
// 		image: image,
// 	}).then((res) => {
// 		renderCard({
// 			title: res.name,
// 			image: res.link,
// 		});
// 	});
// }


// part 3. Edit profile
// api.editProfile(listTitle.value, listSubtitle.value).then((res) => {
// 	userInfo.setUserInfo({
// 		name: res.name,
// 		job: res.about,
// 	});
// 	userInfo.setUserAvatar({
// 		avatar: res.avatar,
// 	});
// });

// Part 7. Deleting a card

// DELETE a card from the server and the DOM when the user confirms the deletion of the card in the popup
// send a delete request to delete a card from the server: DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
// with the token: 807a4335-951b-4493-9e81-0010a6738faf
function deleteCard(id) {
	fetch(`https://around.nomoreparties.co/v1/group-11/cards/${id}`, {
		method: "DELETE",
		headers: {
			authorization: "807a4335-951b-4493-9e81-0010a6738faf",
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((res) => {
			if (res.ok) {
				const card = document.querySelector(`[data-id="${id}"]`);
				card.remove();
			}
		});
}

// Part 8. adding and removing likes
// Send a PUT request to like a card
// PUT https://around.nomoreparties.co/v1/group-11/cards/likes/cardId
// with the token: 807a4335-951b-4493-9e81-0010a6738faf
function likeCard(id) {
	fetch(`https://around.nomoreparties.co/v1/group-11/cards/likes/${id}`, {
		method: "PUT",
		headers: {
			authorization: "807a4335-951b-4493-9e81-0010a6738faf",
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((res) => {
			if (res.ok) {
				const card = document.querySelector(`[data-id="${id}"]`);
				const like = card.querySelector(".element__like");
				like.classList.toggle("element__like_active");
			}
		});
}

// Part 9. Updating the profile picture
// Send the following PATCH request to change the profile picture:
// PATCH https://around.nomoreparties.co/v1/group-11/users/me/avatar
// with the token: 807a4335-951b-4493-9e81-0010a6738faf
// pass the JSON with a single propert, avatar:

function updateProfileImage(url) {
	fetch(`https://around.nomoreparties.co/v1/group-11/users/me/avatar`, {
		method: "PATCH",
		headers: {
			authorization: "807a4335-951b-4493-9e81-0010a6738faf",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			avatar: url,
		}),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((res) => {
			if (res.ok) {
				profileImage.src = url;
			}
		});
}

// cardsList.renderItems();

// part 3: Editing the profile
// Once edited, profile data must be saved on the server. To do this, send a request using the PATCH method:
// PATCH https://around.nomoreparties.co/v1/group-11/users/me
// Add Content-Type to the request headers after the authorization token, and JSON with two properties, name and about, to the request body.
// The values of these properties should contain the modified profile data.
// If the update was successful, you'll receive modified profile data in the body of the server response:

// const createCard = (data) => {
// 	fetch(cardUrl, {
// 		method: "POST",
// 		headers: {
// 			authorization: "807a4335-951b-4493-9e81-0010a6738faf",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	})
// 		.then((res) => {
// 			if (res.ok) {
// 				return res.json();
// 			}
// 		})
// 		.then((res) => {
// 			if (res.ok) {
// 				renderCard({
// 					title: res.name,
// 					image: res.link,
// 				});
// 			}
// 		});
// };

// live coding session
// const createCard = (data) => {
// 	fetch(cardUrl, {
// 		method: "POST",
// 		headers: {
// 			authorization: "807a4335-951b-4493-9e81-0010a6738faf",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	}).then((res) => {
// 		console.log(res);
// 	}).catch((err) => {
// 		console.log(err);
// 	});
// };

// Adding a new Card
// Send a POST request to add a new card to the server:
// POST https://around.nomoreparties.co/v1/groupId/cards
// Add Content-Type to the request headers after the authorization token, and JSON containing two properties, name and link, to the request body.
// name should contain the name of the created card, and link should contain a link to the image. If the request is successful, the server will
// return a response with the object of the new card:

// const createCard = (data) => {
// 	return fetch(`https://around.nomoreparties.co/v1/group-11/cards`, {
// 		method: "POST",
// 		headers: {
// 			authorization: "807a4335-951b-4493-9e81-0010a6738faf",
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(data),
// 	})
// 		.then((res) => {
// 			if (res.ok) {
// 				return res.json();
// 			}
// 			console.log(res);
// 		})
// 		.then((res) => {
// 			// renderCard({
// 			// 	title: res.name,
// 			// 	image: res.link,
// 			// });
// 			console.log(res);
// 		});
// };

// First attempt: when the card is created, save it to the server (This does not work)
// function saveCard(item) {
// 	api.createCard(item).then((res) => {
// 		renderCard({
// 			title: res.name,
// 			image: res.link,
// 		});
// 	});
// }

// make and example test for the saveCard function (This also does not work)
// saveCard({
// 	title: "Alec",
// 	image: "https://images.unsplash.com/photo-1558987732-f9ca78462e61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// });

// second attempt: ??????????? Somehow the name and link I have below ended up in the server at the bottom
// I have no idea how or why this happened, but I have not been able to replicate it
// even after directly copying the code. (Does not work?)

// api.createCard = (data) => {
// 	return api.post(config.cardUrl, data);
// };

// addCard.addEventListener("click", () => {
// 	api.createCard({
// 		name: addTitle.value,
// 		link: addImage.value,
// 	});
// 	api.createCard({
// 		name: "Alec Drosu",
// 		link: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
// 	});
// });