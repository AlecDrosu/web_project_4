export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, avatarSelector, userId }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
    this._userId = userId;
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

  //   setUserId({ id }) {
  //     this._userID = id;
  //   }

  //   getUserId() {
  //     return this._userID;
  //   }
}

// This.username is the same as name
// This.userJob is the same as about

// username selector needs to be the same is infoTitle
// userJob selector needs to be the same is infoSubtitle
