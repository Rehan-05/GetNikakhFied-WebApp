import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from "../constants/LoginConstants";

let initialState = {
  userData: {},
};
// used for post content
export const loginReducer = (state = { initialState }, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginInfo: null,
        loginLoading: true,
      };
    case LOGIN_SUCCESS:
      // console.log("Login Suucess ", payload);
      localStorage.setItem(
        "nikahfiedGroupsUserProfile",
        JSON.stringify(payload)
      );
      return {
        ...state,
        loginLoading: false,
        loginInfo: payload,
        loginError: "",
        userData: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginLoading: false,
        loginError: payload,
      };
    case LOGOUT_REQUEST:
      localStorage.removeItem("nikahfiedGroupsUserProfile");
      return {
        loginInfo: null,
        loginLoading: false,
        loginError: null,
        userData: null,
      };
    default:
      return state;
  }
};
