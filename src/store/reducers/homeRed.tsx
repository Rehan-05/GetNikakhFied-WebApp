import {
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
} from "../constants/homePageConstants";
import { LOGOUT_REQUEST } from "../constants/LoginConstants";

let initialState = {
  isFaching: false,
  error: "",
  data: [],
};

// used for post content
export const homeRed = (state = { initialState }, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USER_REQUEST:
      return {
        ...state,
        error: "",
        isFaching: true,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isFaching: false,
        data: payload,
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        isFaching: false,
        error: payload,
      };

    case LOGOUT_REQUEST:
      return {
        loginInfo: null,
        loginLoading: false,
        loginError: null,
        data: null,
      };
    default:
      return state;
  }
};
