// The UserInfo class is responsible for rendering information about the user on the page. This class should:
// Take an object with the selectors of two elements into the constructor: one containing the user's name, and another containing the user's job.
// Store a public method named getUserInfo(), which returns an object with information about the user. This method will be handy for cases when it's necessary to display the user data in the open form.
// Store a public method named setUserInfo(), which takes new user data and adds it on the page.

class UserInfo {
	constructor({ userNameSelector, userJobSelector }) {
		this._userName = document.querySelector(userNameSelector);
		this._userJob = document.querySelector(userJobSelector);
	}

	getUserInfo() {
		return {
			name: this._userName.textContent,
			job: this._userJob.textContent,
		};
	}

	setUserInfo({ name, job }) {
		this._userName.textContent = name;
		this._userJob.textContent = job;
	}
}
