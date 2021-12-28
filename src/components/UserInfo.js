export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  setUserInfo({ name, job, _id }) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    this._userId = _id;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      _id: this._userId,
    };
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}

// This.username is the same as name
// This.userJob is the same as about