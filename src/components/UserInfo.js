export default class UserInfo {
	constructor({ userNameSelector, userJobSelector, avatarSelector }) {
		this._userName = document.querySelector(userNameSelector);
		this._userJob = document.querySelector(userJobSelector);
		this._userAvatar = document.querySelector(avatarSelector);
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

	setUserAvatar({ avatar }) {
		this._userAvatar.src = avatar;
	}
}

// This.username is the same as name
// This.userJob is the same as about

// username selector needs to be the same is infoTitle
// userJob selector needs to be the same is infoSubtitle
