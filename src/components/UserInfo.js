export default class UserInfo {
	constructor({ userNameSelector, userJobSelector, avatarSelector }) {
		this._userName = document.querySelector(userNameSelector);
		this._userJob = document.querySelector(userJobSelector);
		// this._userAvatar = document.querySelector(avatarSelector);
	}

	getUserInfo() {
		return {
			name: this._userName.textContent,
			job: this._userJob.textContent,
		};
	}

	setUserInfo({ name, job, avatar }) {
		this._userName.textContent = name;
		this._userJob.textContent = job;
		// this._userAvatar.src = avatar;
	}
}

// This.username is the same as list-title
// This.userJob is the same as list-subtitle

// username selector needs to be the same is infoTitle
// userJob selector needs to be the same is infoSubtitle
