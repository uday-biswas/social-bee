//this file contains all the endpoints of the backend api

const BASE_URL = window.location.origin.includes(3000)
  ? window.location.origin.replace("3000", "4000/api/v1")
  : process.env.REACT_APP_BASE_URL;
// const BASE_URL = window.location.origin.replace(":3000", ":4000/api/v1");

// AUTH ENDPOINT
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/auth/updateDisplayPicture",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
};
